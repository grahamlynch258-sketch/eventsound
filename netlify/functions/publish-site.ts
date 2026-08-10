import type { Handler } from "@netlify/functions";

type SupabaseUser = { id?: string };
type UserRole = { role?: string };

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const authorization = event.headers.authorization;
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return json(401, { error: "Authentication required" });

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const buildHook = process.env.NETLIFY_BUILD_HOOK;
  if (!supabaseUrl || !supabaseKey) return json(503, { error: "Supabase authentication is not configured" });
  if (!buildHook) return json(503, { error: "The Netlify build hook is not configured" });

  const authHeaders = {
    apikey: supabaseKey,
    Authorization: `Bearer ${token}`,
  };

  try {
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: authHeaders });
    if (!userResponse.ok) return json(401, { error: "Your session has expired" });
    const user = (await userResponse.json()) as SupabaseUser;
    if (!user.id) return json(401, { error: "Invalid session" });

    const roleUrl = new URL("/rest/v1/user_roles", supabaseUrl);
    roleUrl.searchParams.set("select", "role");
    roleUrl.searchParams.set("user_id", `eq.${user.id}`);
    roleUrl.searchParams.set("role", "eq.admin");
    roleUrl.searchParams.set("limit", "1");
    const roleResponse = await fetch(roleUrl, { headers: authHeaders });
    if (!roleResponse.ok) return json(403, { error: "Administrator access required" });
    const roles = (await roleResponse.json()) as UserRole[];
    if (!roles.some((entry) => entry.role === "admin")) {
      return json(403, { error: "Administrator access required" });
    }

    const hookResponse = await fetch(buildHook, { method: "POST" });
    if (!hookResponse.ok) return json(502, { error: "Netlify rejected the build request" });
    return json(200, { success: true });
  } catch (error) {
    console.error("Publish-site function error", error);
    return json(500, { error: "The build could not be started" });
  }
};
