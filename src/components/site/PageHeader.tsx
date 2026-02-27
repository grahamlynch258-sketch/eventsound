import { ReactNode, useState, useEffect } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string | null;
  backgroundAlt?: string;
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, backgroundImage, backgroundAlt, children }: PageHeaderProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [backgroundImage]);

  // backgroundImage is undefined → pages with no hero (gradient fallback)
  // backgroundImage is null → hero is loading from Supabase (dark bg placeholder)
  // backgroundImage is string → hero URL ready (render img, fade in on load)
  if (backgroundImage !== undefined) {
    return (
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0">
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt={backgroundAlt || ""}
              className="w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchPriority="high"
            />
          )}
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-background z-[1] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-accent/10 to-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
