import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, HelpCircle, Star, Mail, Images, BookOpen } from "lucide-react";

const mainLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
];

const portfolioLinks = [
  { to: "/gallery", label: "Gallery", icon: Images, description: "Photos from our events" },
  { to: "/case-studies", label: "Case Studies", icon: BookOpen, description: "In-depth project breakdowns" },
];

const connectLinks = [
  { to: "/faq", label: "FAQ", icon: HelpCircle, description: "Common questions answered" },
  { to: "/reviews", label: "Reviews", icon: Star, description: "What our clients say" },
  { to: "/contact", label: "Contact", icon: Mail, description: "Get a quote or get in touch" },
];

const PORTFOLIO_PATHS = portfolioLinks.map((l) => l.to);
const CONNECT_PATHS = connectLinks.map((l) => l.to);

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium tracking-wide transition-colors hover:text-primary relative",
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive ? "text-primary after:scale-x-100" : "text-muted-foreground",
  );

export function SiteHeader({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [portfolioMobileOpen, setPortfolioMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const portfolioActive = PORTFOLIO_PATHS.some((p) => location.pathname.startsWith(p));
  const connectActive = CONNECT_PATHS.some((p) => location.pathname.startsWith(p));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (portfolioRef.current && !portfolioRef.current.contains(e.target as Node)) {
        setPortfolioOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdowns on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPortfolioOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setPortfolioOpen(false);
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {mainLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass} end={l.end}>
              {l.label}
            </NavLink>
          ))}

          {/* Portfolio dropdown */}
          <div className="relative" ref={portfolioRef}>
            <button
              onClick={() => setPortfolioOpen((o) => !o)}
              className={cn(
                "flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-primary relative",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                portfolioActive ? "text-primary after:scale-x-100" : "text-muted-foreground",
              )}
              aria-haspopup="true"
              aria-expanded={portfolioOpen}
            >
              Portfolio
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-200", portfolioOpen && "rotate-180")}
              />
            </button>

            {portfolioOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl border border-border/60 bg-background/98 backdrop-blur-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {portfolioLinks.map(({ to, label, icon: Icon, description }) => (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 transition-colors hover:bg-primary/10 group",
                      location.pathname === to && "bg-primary/10",
                    )}
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className={cn("text-sm font-medium", location.pathname === to ? "text-primary" : "text-foreground")}>
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Connect dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className={cn(
                "flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-primary relative",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                connectActive ? "text-primary after:scale-x-100" : "text-muted-foreground",
              )}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Contact
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl border border-border/60 bg-background/98 backdrop-blur-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {connectLinks.map(({ to, label, icon: Icon, description }) => (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 transition-colors hover:bg-primary/10 group",
                      location.pathname === to && "bg-primary/10",
                    )}
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className={cn("text-sm font-medium", location.pathname === to ? "text-primary" : "text-foreground")}>
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto">
          <nav className="container flex flex-col gap-1 py-6" aria-label="Mobile">
            {mainLinks.map((l) => (
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

            {/* Portfolio group in mobile */}
            <div className="mt-2 mb-1 px-4">
              <button
                onClick={() => setPortfolioMobileOpen((o) => !o)}
                className={cn(
                  "flex w-full items-center justify-between text-xs font-semibold uppercase tracking-widest transition-colors",
                  portfolioActive ? "text-primary" : "text-muted-foreground/60 hover:text-muted-foreground",
                )}
              >
                Portfolio
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform duration-200", portfolioMobileOpen && "rotate-180")}
                />
              </button>
            </div>
            {portfolioMobileOpen && portfolioLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 py-3 px-6 rounded-lg text-base font-medium transition-colors",
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            ))}

            {/* Connect group in mobile */}
            <div className="mt-2 mb-1 px-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Contact</p>
            </div>
            {connectLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 py-3.5 px-4 rounded-lg text-base font-medium transition-colors",
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
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
