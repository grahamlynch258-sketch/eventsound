import { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
