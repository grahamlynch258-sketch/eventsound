import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-border/50 bg-card", className)}>
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-semibold tracking-tight">
              Stage<span className="text-primary">Spark</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Premium event production — AV, lighting, staging & crew. Delivered and supported across Ireland.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/av-production" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Get a Quote</Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">Ireland-wide service</p>
            <p className="text-sm text-muted-foreground mt-1">hello@stagespark.ie</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} StageSpark. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Premium event production across Ireland</p>
        </div>
      </div>
    </footer>
  );
}
