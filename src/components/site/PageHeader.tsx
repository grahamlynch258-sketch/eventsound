import { ReactNode, useState, useEffect } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string | null;
  backgroundAlt?: string;
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, backgroundImage, backgroundAlt, children }: PageHeaderProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!backgroundImage) {
      setLoaded(false);
      return;
    }
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setLoaded(true);
  }, [backgroundImage]);

  // backgroundImage is undefined → pages with no hero (gradient fallback)
  // backgroundImage is null → hero is loading from Supabase (dark bg placeholder)
  // backgroundImage is string → hero URL ready
  if (backgroundImage !== undefined) {
    return (
      <section className="relative min-h-[82vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt={backgroundAlt || title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={600}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-background z-[1] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-accent/10 to-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
