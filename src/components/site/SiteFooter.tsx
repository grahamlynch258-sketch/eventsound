import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-border/50 bg-card", className)}>
      <div className="container py-12 md:py-16">
        <div className="mb-8">
          <img src="/Brand/logo_transparent.png" alt="Event Sound" className="h-10 w-auto" />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
            {siteConfig.tagline}. Professional event production based in {siteConfig.primaryLocation}, serving clients nationwide.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h4 className="section-kicker mb-4">Pages</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">Home</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">About</Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">Services</Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-accent transition-colors">Portfolio</Link>
              <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-accent transition-colors">Case Studies</Link>
            </nav>
          </div>

          <div>
            <h4 className="section-kicker mb-4">Services</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/services/led-video-walls" className="text-sm text-muted-foreground hover:text-accent transition-colors">LED Video Walls</Link>
              <Link to="/services/av-production" className="text-sm text-muted-foreground hover:text-accent transition-colors">AV Production</Link>
              <Link to="/services/lighting-design" className="text-sm text-muted-foreground hover:text-accent transition-colors">Lighting Design</Link>
              <Link to="/services/staging-pipe-drape" className="text-sm text-muted-foreground hover:text-accent transition-colors">Staging, Pipe & Drape</Link>
              <Link to="/services/event-production" className="text-sm text-muted-foreground hover:text-accent transition-colors">Event Production</Link>
              <Link to="/services/video-production" className="text-sm text-muted-foreground hover:text-accent transition-colors">Video Production</Link>
              <Link to="/services/virtual-events" className="text-sm text-muted-foreground hover:text-accent transition-colors">Virtual Events</Link>
            </nav>
          </div>

          <div>
            <h4 className="section-kicker mb-4">Support</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-accent transition-colors">FAQ</Link>
              <Link to="/reviews" className="text-sm text-muted-foreground hover:text-accent transition-colors">Reviews</Link>
              <Link to="/health-and-safety" className="text-sm text-muted-foreground hover:text-accent transition-colors">Health & Safety</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">Get a Quote</Link>
            </nav>
          </div>

          <div>
            <h4 className="section-kicker mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">{siteConfig.primaryLocation}</p>
            <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted-foreground hover:text-accent transition-colors mt-1 block">
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone}`} className="text-sm text-muted-foreground hover:text-accent transition-colors mt-1 block">
              {siteConfig.phoneDisplay}
            </a>
            {siteConfig.social.linkedin && (
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors mt-1 block">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">{siteConfig.tagline} — {siteConfig.primaryLocation}</p>
        </div>
      </div>
    </footer>
  );
}
