import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf-8");
const html = read("index.html");
const faces = [...html.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
const facesOf = (family: string) => faces.filter((f) => f.includes(`font-family: '${family}'`));

// Until Inter and Playfair Display arrive, text is drawn in a font already on
// the device. If that font is a different width, lines re-wrap when the real
// font loads and the page jumps. These stand-ins are resized to match.
describe("size-matched stand-in fonts", () => {
  const standIns = [
    { family: "Inter Fallback Arial", local: "Arial", weights: 4 },
    { family: "Inter Fallback Roboto", local: "Roboto", weights: 4 },
    { family: "Playfair Fallback Georgia", local: "Georgia", weights: 3 },
    { family: "Playfair Fallback Noto", local: "Noto Serif", weights: 3 },
  ];

  it.each(standIns)("$family uses a device font and overrides its size and line metrics", ({ family, local, weights }) => {
    const declared = facesOf(family);
    expect(declared).toHaveLength(weights);
    for (const face of declared) {
      expect(face).toContain(`local('${local}`);
      expect(face).not.toContain("url(");
      expect(face).toMatch(/size-adjust: [\d.]+%/);
      expect(face).toMatch(/ascent-override: [\d.]+%/);
      expect(face).toMatch(/descent-override: [\d.]+%/);
      expect(face).toMatch(/font-weight: \d{3}/);
    }
  });

  it("bold weights use the device's real bold font, not a thickened regular", () => {
    for (const { family } of standIns) {
      const bold = facesOf(family).filter((f) => /font-weight: (600|700)/.test(f));
      expect(bold.length, family).toBe(2);
      for (const face of bold) expect(face, family).toMatch(/local\('[^']*Bold'\)/);
    }
  });

  it("the stand-ins come straight after the web font in both font stacks", () => {
    const css = read("src/index.css");
    expect(css).toMatch(/--font-sans: 'Inter', 'Inter Fallback Arial', 'Inter Fallback Roboto',/);
    expect(css).toMatch(/--font-serif: 'Playfair Display', 'Playfair Fallback Georgia', 'Playfair Fallback Noto',/);
    const tailwind = read("tailwind.config.ts").replace(/\s+/g, " ");
    expect(tailwind).toContain("'Inter', 'Inter Fallback Arial', 'Inter Fallback Roboto',");
    expect(tailwind).toContain("'Playfair Display', 'Playfair Fallback Georgia', 'Playfair Fallback Noto',");
  });

  it("the web fonts are still preloaded and still swap in when they arrive", () => {
    expect(html).toContain('<link rel="preload" href="/fonts/inter-latin.woff2" as="font"');
    expect(html).toContain('<link rel="preload" href="/fonts/playfair-display-latin.woff2" as="font"');
    for (const family of ["Inter", "Playfair Display"]) {
      const real = facesOf(family);
      expect(real, family).toHaveLength(1);
      expect(real[0], family).toContain("font-display: swap");
    }
  });
});
