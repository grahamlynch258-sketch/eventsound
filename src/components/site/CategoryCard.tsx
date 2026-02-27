import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type CategoryCardProps = {
  title: string;
  imageSrc: string;
  to: string;
  className?: string;
};

export function CategoryCard({ title, imageSrc, to, className }: CategoryCardProps) {
  return (
    <Link to={to} className={cn("group block", className)}>
      <Card className="overflow-hidden rounded-xl border-border/50">
        <div className="relative aspect-[4/3]">
         <img
            src={imageSrc}
            alt={`${title} category`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
            <div>
              <p className="text-lg font-semibold tracking-tight">{title}</p>
              <p className="mt-1 text-sm text-accent font-medium">
                View options
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
