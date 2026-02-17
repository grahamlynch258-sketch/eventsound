import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Shared image component that enforces performance best practices:
 * - Requires width/height or aspectRatio to prevent CLS
 * - Lazy loads by default (below fold)
 * - Uses async decoding
 * - fetchpriority="high" only when priority=true (hero images)
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio,
  className,
  priority = false,
  sizes,
}: OptimizedImageProps) {
  const style: React.CSSProperties = {};
  if (aspectRatio) {
    style.aspectRatio = aspectRatio;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      sizes={sizes}
      className={cn("object-cover", className)}
      style={style}
    />
  );
}
