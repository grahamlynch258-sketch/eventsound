import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm tracking-wide transition-colors hover:text-foreground",
    isActive ? "text-foreground" : "text-muted-foreground",
  );

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn("sticky top-0 z-50 border-b bg-background/80 backdrop-blur", className)}>
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link to="/" className="font-semibold tracking-tight">
          StageSpark
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <NavLink to="/av-production" className={navLinkClass}>
            AV & Production
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/contact">Get a quote</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="md:hidden">
            <Link to="/contact">Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
