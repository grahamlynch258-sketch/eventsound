import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cdnImage, cdnUrl, IMAGE_PRESETS, isResizable, STORAGE_PUBLIC_PREFIX } from "@/lib/imageCdn";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf-8");
const PHOTO = `${STORAGE_PUBLIC_PREFIX}site-images/1771953271892-v1mndebjda-optimized.webp`;

describe("image resizer URLs", () => {
  it("builds a Netlify Image CDN URL with the storage URL encoded", () => {
    expect(cdnUrl(PHOTO, 800)).toBe(
      "/.netlify/images?url=https%3A%2F%2Fblhxvtmhhvrorajkszhy.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-images%2F1771953271892-v1mndebjda-optimized.webp&w=800",
    );
  });

  it("returns sizes, then srcSet, then src, so browsers never fetch the fallback first", () => {
    const props = cdnImage(PHOTO, "third", true);
    expect(Object.keys(props)).toEqual(["sizes", "srcSet", "src"]);
    expect(props.srcSet?.split(", ")).toHaveLength(IMAGE_PRESETS.third.widths.length);
    expect(props.srcSet).toContain(`${cdnUrl(PHOTO, 400)} 400w`);
    expect(props.src).toBe(cdnUrl(PHOTO, IMAGE_PRESETS.third.fallback));
  });

  it("leaves everything that is not a storage photo untouched", () => {
    for (const url of ["/images/Ronan.webp", "/assets/hero-av-production-abc.jpg", "https://example.com/a.jpg",
      `${STORAGE_PUBLIC_PREFIX}site-images/logo.svg`, `${STORAGE_PUBLIC_PREFIX}site-images/loop.gif`]) {
      expect(isResizable(url)).toBe(false);
      expect(cdnImage(url, "hero", true)).toEqual({ src: url });
    }
    expect(cdnImage(null, "hero", true)).toEqual({ src: undefined });
    expect(cdnImage(undefined, "hero", true)).toEqual({ src: undefined });
  });

  it("resizes the local brand logo, which is a 365 KB file drawn 280 px wide", () => {
    const props = cdnImage("/Brand/logo_transparent.png", "logo", true);
    expect(props.sizes).toBe("280px");
    expect(props.srcSet).toBe(
      "/.netlify/images?url=%2FBrand%2Flogo_transparent.png&w=280 280w, /.netlify/images?url=%2FBrand%2Flogo_transparent.png&w=560 560w",
    );
    for (const page of ["LEDVideoWallsV2", "LEDScreenHireV2", "MusicalTheatreV2"]) {
      expect(read(`src/pages/v2/${page}.tsx`), page).not.toContain('src="/Brand/logo_transparent.png"');
    }
  });

  it("passes the original URL through when the resizer is off (Vite dev server)", () => {
    expect(cdnImage(PHOTO, "hero", false)).toEqual({ src: PHOTO });
  });

  it("never asks for more than the 1920 px originals and keeps widths ascending", () => {
    for (const [name, preset] of Object.entries(IMAGE_PRESETS)) {
      expect(Math.max(...preset.widths), name).toBeLessThanOrEqual(1920);
      expect([...preset.widths].sort((a, b) => a - b), name).toEqual(preset.widths);
      expect(preset.widths, name).toContain(preset.fallback);
    }
  });

  it("keeps hero candidates at 1080 px or wider (a cover-cropped hero is drawn wider than a phone screen)", () => {
    expect(Math.min(...IMAGE_PRESETS.hero.widths)).toBeGreaterThanOrEqual(1080);
  });
});

describe("image resizer wiring", () => {
  it("netlify.toml allows exactly the storage host the helper rewrites", () => {
    const allowed = read("netlify.toml").match(/remote_images\s*=\s*\['([^']+)'\]/)?.[1];
    expect(allowed).toBeTruthy();
    expect(new RegExp(`^${allowed}$`).test(PHOTO)).toBe(true);
    expect(allowed!.replace(/\\\./g, ".")).toBe(`${STORAGE_PUBLIC_PREFIX}.*`);
  });

  it("the build's page capture and the local dist server both answer /.netlify/images", () => {
    for (const script of ["scripts/capture-rendered.mjs", "scripts/serve-dist.mjs"]) {
      const source = read(script);
      expect(source, script).toContain("'/.netlify/images'");
      expect(source, script).toContain("res.writeHead(302, { Location: source })");
    }
  });

  it("the hero preload carries the same srcset and sizes as the hero image", () => {
    const capture = read("scripts/capture-rendered.mjs");
    expect(capture).toContain("heroSrcset = img.getAttribute('srcset')");
    expect(capture).toContain("img.getAttribute('src')");
    const prerender = read("scripts/prerender.mjs");
    expect(prerender).toContain("imagesrcset=");
    expect(prerender).toContain("imagesizes=");
  });

  it("public pages do not hand storage photos to <img> without the helper", () => {
    const files = [
      "src/components/site/HeroSlideshow.tsx", "src/components/site/PageHeader.tsx",
      "src/components/site/GalleryGrid.tsx", "src/components/site/CategoryCard.tsx",
      "src/components/site/ServiceSections.tsx", "src/components/blog/BlogContent.tsx",
      "src/pages/CaseStudies.tsx", "src/pages/CaseStudyDetail.tsx", "src/pages/Blog.tsx", "src/pages/BlogPost.tsx",
      "src/pages/v2/LEDVideoWallsV2.tsx", "src/pages/v2/LEDScreenHireV2.tsx", "src/pages/v2/MusicalTheatreV2.tsx",
      "src/pages/services/AVProduction.tsx", "src/pages/services/ConferenceAvHire.tsx",
      "src/pages/services/LightingDesign.tsx", "src/pages/services/StagingPipeDrape.tsx",
      "src/pages/services/AudioSystems.tsx",
    ];
    for (const file of files) {
      const source = read(file);
      expect(source, file).toContain("cdnImage(");
      expect(source, file).not.toMatch(/src=\{[^}]*(image_url|featured_image_url|storage_url)\}/);
    }
  });

  it("case-study uploads are saved with a one-year cache header", () => {
    expect(read("src/pages/admin/AdminCaseStudyEdit.tsx")).toMatch(/\.upload\(filePath, file, \{ cacheControl: "31536000" \}\)/);
  });
});
