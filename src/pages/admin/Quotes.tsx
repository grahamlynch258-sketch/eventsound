import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-blue-500/10 text-blue-400",
  quoted: "bg-amber-500/10 text-amber-400",
  confirmed: "bg-green-500/10 text-green-400",
  archived: "bg-muted text-muted-foreground",
};

export default function AdminQuotes() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, loading, navigate]);

  const { data: quotes, isLoading } = useQuery({
    queryKey: ["admin-quotes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("quote_submissions").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quotes"] });
      toast({ title: "Status updated" });
    },
  });

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="sm" asChild><Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link></Button>
          <h1 className="text-2xl font-semibold">Quote Submissions</h1>
          <span className="text-sm text-muted-foreground">({quotes?.length || 0} total)</span>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : quotes && quotes.length > 0 ? (
          <div className="space-y-4">
            {quotes.map((q) => (
              <div key={q.id} className="rounded-lg border border-border/50 bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{q.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[q.status] || statusColors.new}`}>
                        {q.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Submitted {format(new Date(q.created_at), "dd MMM yyyy, HH:mm")}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {["new", "contacted", "quoted", "confirmed", "archived"].map((s) => (
                      <Button
                        key={s}
                        variant={q.status === s ? "default" : "outline"}
                        size="sm"
                        className="text-xs capitalize"
                        onClick={() => updateStatus.mutate({ id: q.id, status: s })}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" /> {q.email}
                  </div>
                  {q.phone && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4 shrink-0" /> {q.phone}</div>}
                  {q.event_date && <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 shrink-0" /> {q.event_date}</div>}
                  {q.venue && <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" /> {q.venue}</div>}
                  {q.audience_size && <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4 shrink-0" /> {q.audience_size} attendees</div>}
                  {q.budget_range && <div className="flex items-center gap-2 text-muted-foreground"><DollarSign className="h-4 w-4 shrink-0" /> {q.budget_range}</div>}
                  {q.event_type && <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 shrink-0" /> {q.event_type}</div>}
                  {q.company && <div className="flex items-center gap-2 text-muted-foreground">Company: {q.company}</div>}
                </div>

                {q.services && q.services.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {q.services.map((s: string) => (
                      <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                )}

                {q.message && (
                  <div className="bg-secondary/30 rounded p-3 text-sm text-muted-foreground">
                    {q.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">No quote submissions yet.</div>
        )}
      </div>
    </div>
  );
}
