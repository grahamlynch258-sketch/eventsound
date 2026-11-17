// Phone-, tablet- and desktop-sized versions of the site's photos.
//
// Photos live in Supabase storage at one size (up to 1920 px wide). Netlify
// Image CDN resizes them on request: /.netlify/images?url=<storage url>&w=<px>
// and picks WebP or AVIF from the browser's Accept header. netlify.toml
// ([images] remote_images) allows exactly the storage host below.
//
// cdnImage() returns the props for an <img>: spread it instead of `src`.
// Anything else (other local files, SVG, GIF, other hosts) is passed through
// untouched, as is everything on the Vite dev server, which has no
// /.netlify/images endpoint. The one local exception is public/Brand/: the
// footer logo there is a 365 KB PNG drawn 280 px wide.

export const STORAGE_PUBLIC_PREFIX =
  "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/";

/** Site files (public/) that are also worth resizing. */
export const LOCAL_RESIZABLE_PREFIX = "/Brand/";

export const IMAGE_CDN_PATH = "/.netlify/images";

type Preset = {
  /**
   * Candidate widths in px, ascending, at most 1920 (the largest original).
   * Asking for more than a photo has returns it at its own size (measured
   * 17 Nov 2026: an 800 px photo gave identical bytes at w=800 and w=1200).
   */
  widths: number[];
  /** How wide the image is drawn, for the browser to pick a candidate. */
  sizes: string;
  /** Width used for the plain `src` fallback. */
  fallback: number;
};

export const IMAGE_PRESETS = {
  // Full-bleed first-screen photo. It is cropped to cover a tall box, so on a
  // phone it is drawn far wider than the screen; no candidate below 1080 or
  // the photo goes soft.
  hero: { widths: [1080, 1440, 1920], sizes: "100vw", fallback: 1440 },
  // One photo across the content column (case-study lead image, blog images).
  wide: { widths: [480, 800, 1200, 1600], sizes: "(min-width: 1280px) 1200px, 100vw", fallback: 1200 },
  // Two-column layouts: half the page from tablet up.
  half: { widths: [400, 640, 800, 1200], sizes: "(min-width: 768px) 50vw, 100vw", fallback: 800 },
  // Card grids: one, two, then three columns.
  third: {
    widths: [400, 640, 800, 1200],
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
    fallback: 800,
  },
  // The brand logo, drawn at most 280 px wide (twice that for sharp screens).
  logo: { widths: [280, 560], sizes: "280px", fallback: 560 },
} satisfies Record<string, Preset>;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

export type CdnImageProps = { sizes?: string; srcSet?: string; src: string | undefined };

const UNSIZABLE = /\.(svg|gif)(\?|#|$)/i;

export function isResizable(url: string | null | undefined): url is string {
  if (typeof url !== "string" || UNSIZABLE.test(url)) return false;
  return url.startsWith(STORAGE_PUBLIC_PREFIX) || url.startsWith(LOCAL_RESIZABLE_PREFIX);
}

export function cdnUrl(url: string, width: number): string {
  return `${IMAGE_CDN_PATH}?url=${encodeURIComponent(url)}&w=${width}`;
}

const ENABLED_BY_DEFAULT = import.meta.env.PROD;

/**
 * Props for an <img>. Key order matters: React sets attributes in this order,
 * and `sizes`/`srcset` must be in place before `src` or some browsers fetch
 * the fallback as well.
 */
export function cdnImage(
  url: string | null | undefined,
  preset: ImagePreset,
  enabled: boolean = ENABLED_BY_DEFAULT,
): CdnImageProps {
  if (!enabled || !isResizable(url)) return { src: url || undefined };
  const { widths, sizes, fallback } = IMAGE_PRESETS[preset];
  return {
    sizes,
    srcSet: widths.map((w) => `${cdnUrl(url, w)} ${w}w`).join(", "),
    src: cdnUrl(url, fallback),
  };
}

/**
 * Starts downloading the same candidate the <img> will pick, and reports when
 * it is ready. Used by heroes that fade in once their photo has loaded.
 */
export function preloadCdnImage(props: CdnImageProps, onLoad: () => void): void {
  if (!props.src) return;
  const img = new Image();
  img.onload = onLoad;
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}
