import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium tracking-wide transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-muted-foreground",
  );

export function SiteHeader({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md", className)}>
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Stage<span className="text-primary">Spark</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/av-production" className={navLinkClass}>
            Services
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass}>
            Gallery
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex font-semibold">
            <Link to="/contact">Get a Quote</Link>
          </Button>
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
          <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
            <NavLink to="/" className={({ isActive }) => cn("py-3 px-3 rounded-md text-sm font-medium transition-colors", isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={() => setMobileOpen(false)} end>
              Home
            </NavLink>
            <NavLink to="/av-production" className={({ isActive }) => cn("py-3 px-3 rounded-md text-sm font-medium transition-colors", isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={() => setMobileOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => cn("py-3 px-3 rounded-md text-sm font-medium transition-colors", isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={() => setMobileOpen(false)}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => cn("py-3 px-3 rounded-md text-sm font-medium transition-colors", isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50")} onClick={() => setMobileOpen(false)}>
              Contact
            </NavLink>
            <div className="pt-3 px-3">
              <Button asChild className="w-full font-semibold">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
