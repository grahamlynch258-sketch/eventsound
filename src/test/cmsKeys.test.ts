import { describe, it, expect } from "vitest";
import { CMS_PAGES, CMS_SECTIONS } from "@/lib/cmsKeys";

describe("CMS keys", () => {
  it("has all expected page keys", () => {
    expect(CMS_PAGES.home).toBe("home");
    expect(CMS_PAGES.services).toBe("services");
    expect(CMS_PAGES.contact).toBe("contact");
  });

  it("has correct section keys for home", () => {
    expect(CMS_SECTIONS.home.hero).toBe("hero");
    expect(CMS_SECTIONS.home.features).toBe("features");
    expect(CMS_SECTIONS.home.cta2).toBe("cta2");
  });

  it("has correct section keys for services", () => {
    expect(CMS_SECTIONS.services.hero).toBe("hero");
    expect(CMS_SECTIONS.services.items).toBe("items");
  });
});
