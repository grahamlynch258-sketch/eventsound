import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, backgroundImage, children }: PageHeaderProps) {
  if (backgroundImage) {
    return (
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
