import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

export function SiteFooter({ className }: { className?: string }) {
    return (
          <footer className={cn("border-t border-border/50 bg-card", className)}>
                  <div className="container py-12 md:py-16">
                          <div className="grid gap-8 md:grid-cols-4">
                                    <div>
                                                <p className="font-serif text-xl font-semibold tracking-tight">
                                                              Event<span className="text-primary"> Sound</span>span>
                                                </p>p>
                                                <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
                                                  {siteConfig.tagline}. Professional event production based in{" "}
                                                  {siteConfig.primaryLocation}, serving clients nationwide.
                                                </p>p>
                                    </div>div>
                          
                                    <div>
                                                <h4 className="section-kicker mb-4">Pages</h4>h4>
                                                <nav className="flex flex-col gap-2.5">
                                                              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>Link>
                                                              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>Link>
                                                              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>Link>
                                                              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link>Link>
                                                              <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link>Link>
                                                </nav>nav>
                                    </div>div>
                          
                                    <div>
                                                <h4 className="section-kicker mb-4">Support</h4>h4>
                                                <nav className="flex flex-col gap-2.5">
                                                              <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>Link>
                                                              <Link to="/reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">Reviews</Link>Link>
                                                              <Link to="/health-and-safety" className="text-sm text-muted-foreground hover:text-primary transition-colors">Health & Safety</Link>Link>
                                                              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Get a Quote</Link>Link>
                                                </nav>nav>
                                    </div>div>
                          
                                    <div>
                                                <h4 className="section-kicker mb-4">Contact</h4>h4>
                                                <p className="text-sm text-muted-foreground">{siteConfig.primaryLocation}</p>p>
                                                <a
                                                                href={`mailto:${siteConfig.email}`}
                                                                className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1 block"
                                                              >
                                                  {siteConfig.email}
                                                </a>a>
                                                <a
                                                                href={`tel:${siteConfig.phone}`}
                                                                className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1 block"
                                                              >
                                                  {siteConfig.phoneDisplay}
                                                </a>a>
                                      {siteConfig.social.linkedin && (
                          <a
                                            href={siteConfig.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1 block"
                                          >
                                          LinkedIn
                          </a>a>
                                                )}
                                    </div>div>
                          </div>div>
                  
                          <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                    <p className="text-xs text-muted-foreground">
                                                &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
                                    </p>p>
                                    <p className="text-xs text-muted-foreground">
                                      {siteConfig.tagline} &mdash; {siteConfig.primaryLocation}
                                    </p>p>
                          </div>div>
                  </div>div>
          </footer>footer>
        );
}</div>
