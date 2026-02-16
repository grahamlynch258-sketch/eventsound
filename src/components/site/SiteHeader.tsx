import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium tracking-wide transition-colors hover:text-primary relative",
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive ? "text-primary after:scale-x-100" : "text-muted-foreground",
  );

export function SiteHeader({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/50 bg-background/95 backdrop-blur-lg shadow-md"
          : "border-transparent bg-background/60 backdrop-blur-sm",
        className,
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Event<span className="text-primary"> Sound</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden lg:inline-flex font-semibold shadow-gold">
            <Link to="/contact">Get a Quote</Link>
          </Button>
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/98 backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto">
          <nav className="container flex flex-col gap-1 py-6" aria-label="Mobile">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "py-3.5 px-4 rounded-lg text-base font-medium transition-colors",
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )
                }
                onClick={() => setMobileOpen(false)}
                end={l.end}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-4 px-4">
              <Button asChild className="w-full font-semibold" size="lg">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
