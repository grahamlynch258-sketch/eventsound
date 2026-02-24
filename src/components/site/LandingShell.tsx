import { Link } from "react-router-dom";

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">EventSound</Link>
          <Link to="/contact" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Get a Quote
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EventSound — Professional Event Production & AV Hire Ireland</p>
          <p className="mt-1">Drogheda, Co. Louth | Serving Dublin, Leinster & Nationwide | <a href="mailto:info@eventsound.ie" className="underline">info@eventsound.ie</a></p>
        </div>
      </footer>
    </div>
  );
}
