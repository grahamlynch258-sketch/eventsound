import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  title: string;
  imageSrc: string;
  to: string;
  className?: string;
};

export function CategoryCard({ title, imageSrc, to, className }: CategoryCardProps) {
  return (
    <Link to={to} className={cn("group block", className)}>
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3]">
          <img
            src={imageSrc}
            alt={`${title} category`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-lg font-semibold tracking-tight">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground underline underline-offset-4">
              View options
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
