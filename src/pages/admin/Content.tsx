import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent, useUpdateContent } from "@/hooks/useSiteContent";
import { ArrowLeft, Save, AlignLeft, AlignCenter, AlignRight, Bold, Palette } from "lucide-react";

type ContentField = {
  key: string;
  label: string;
  type: "input" | "textarea";
  placeholder?: string;
};

const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Merriweather", value: "Merriweather, serif" },
  { label: "Oswald", value: "Oswald, sans-serif" },
  { label: "Raleway", value: "Raleway, sans-serif" },
];

const pageContent: Record<string, { title: string; sections: Record<string, ContentField[]> }> = {
  home: {
    title: "Homepage",
    sections: {
      hero: [
        { key: "headline", label: "Headline", type: "textarea", placeholder: "Premium event production—without the chaos." },
        { key: "subheadline", label: "Subheadline", type: "textarea", placeholder: "AV, vision, lighting and staging packages for modern events. Delivered, installed and supported by calm, capable technicians." },
        { key: "cta_primary", label: "Primary CTA", type: "input", placeholder: "Request a quote" },
        { key: "cta_secondary", label: "Secondary CTA", type: "input", placeholder: "Explore AV & Production" },
      ],
      features: [
        { key: "section_title", label: "Section Title", type: "input", placeholder: "Built for producers and venues" },
        { key: "section_description", label: "Section Description", type: "textarea", placeholder: "We combine premium equipment with practical delivery, setup and operator support—so your event looks sharp and runs on schedule." },
        { key: "feature_1_title", label: "Feature 1 Title", type: "input", placeholder: "Fast, tidy builds" },
        { key: "feature_1_description", label: "Feature 1 Description", type: "textarea", placeholder: "Clean cabling, sensible patching, and a plan for bump-in/bump-out." },
        { key: "feature_2_title", label: "Feature 2 Title", type: "input", placeholder: "Show-ready systems" },
        { key: "feature_2_description", label: "Feature 2 Description", type: "textarea", placeholder: "Audio clarity, punchy lighting, reliable vision—tested before doors." },
        { key: "feature_3_title", label: "Feature 3 Title", type: "input", placeholder: "People you can trust" },
        { key: "feature_3_description", label: "Feature 3 Description", type: "textarea", placeholder: "Techs who communicate, adapt, and keep the room calm." },
      ],
      cta2: [
        { key: "headline", label: "CTA Headline", type: "input", placeholder: "Tell us the brief. We'll build the package." },
        { key: "description", label: "CTA Description", type: "textarea", placeholder: "Send your date, venue, audience size, and any must-haves. We'll come back with a clear recommendation and a quote." },
        { key: "button_text", label: "CTA Button Text", type: "input", placeholder: "Get a quote" },
      ],
    },
  },
  "av-production": {
    title: "AV & Production",
    sections: {
      hero: [
        { key: "headline", label: "Headline", type: "textarea", placeholder: "AV & Production" },
        { key: "subheadline", label: "Subheadline", type: "textarea", placeholder: "Want to make the moment feel bigger? We supply premium gear and calm, capable crew—so your event runs smooth and looks incredible." },
      ],
      categories: [
        { key: "section_title", label: "Section Title", type: "input", placeholder: "Create vibrant atmospheres" },
        { key: "section_description", label: "Section Description", type: "textarea", placeholder: "From intimate launches to high-capacity conferences, we bring together audio, vision, lighting and staging into one clean, reliable production package." },
      ],
    },
  },
  contact: {
    title: "Contact Page",
    sections: {
      main: [
        { key: "headline", label: "Page Headline", type: "input", placeholder: "Request a quote" },
        { key: "description", label: "Description", type: "textarea", placeholder: "Tell us what you're building—date, venue, audience size, and any must-haves. We'll recommend a clean package and confirm availability." },
      ],
    },
  },
};

export default function AdminContent() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const updateContent = useUpdateContent();
  // Load content for linked sections so the master box color picker shows saved values
  const { data: featuresContent } = useSiteContent("home", "features");
  const { data: cta2Content } = useSiteContent("home", "cta2");

  const [currentPage, setCurrentPage] = useState("home");
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const [alignData, setAlignData] = useState<Record<string, Record<string, string>>>({});
  const [sizeData, setSizeData] = useState<Record<string, Record<string, number>>>({});
  const [colorData, setColorData] = useState<Record<string, Record<string, string>>>({});
  const [weightData, setWeightData] = useState<Record<string, Record<string, string>>>({});
  const [familyData, setFamilyData] = useState<Record<string, Record<string, string>>>({});
  const [bgColorData, setBgColorData] = useState<Record<string, Record<string, string>>>({});
  const [bgOpacityData, setBgOpacityData] = useState<Record<string, Record<string, number>>>({});
  const [offsetXData, setOffsetXData] = useState<Record<string, Record<string, number>>>({});
  const [offsetYData, setOffsetYData] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  function handleChange(section: string, key: string, value: string) {
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  }
  function handleAlignChange(section: string, key: string, alignment: string) {
    setAlignData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: alignment } }));
  }
  function handleSizeChange(section: string, key: string, size: number) {
    setSizeData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: size } }));
  }
  function handleColorChange(section: string, key: string, color: string) {
    setColorData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: color } }));
  }
  function handleWeightChange(section: string, key: string, weight: string) {
    setWeightData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: weight } }));
  }
  function handleFamilyChange(section: string, key: string, family: string) {
    const normalized = family === "default" ? "" : family;
    setFamilyData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: normalized } }));
  }
  function handleBgColorChange(section: string, key: string, color: string) {
    setBgColorData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: color } }));
  }
  function handleBgOpacityChange(section: string, key: string, opacity: number) {
    setBgOpacityData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: opacity } }));
  }
  function handleOffsetXChange(section: string, key: string, val: number) {
    setOffsetXData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: val } }));
  }
  function handleOffsetYChange(section: string, key: string, val: number) {
    setOffsetYData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: val } }));
  }

  async function handleSave(section: string) {
    const sectionValues = formData[section];
    const sectionAligns = alignData[section];
    const sectionSizes = sizeData[section];
    const sectionColors = colorData[section];
    const sectionWeights = weightData[section];
    const sectionFamilies = familyData[section];
    const sectionBgColors = bgColorData[section];
    const sectionBgOpacities = bgOpacityData[section];
    const sectionOffsetsX = offsetXData[section];
    const sectionOffsetsY = offsetYData[section];
    if (!sectionValues && !sectionAligns && !sectionSizes && !sectionColors && !sectionWeights && !sectionFamilies && !sectionBgColors && !sectionBgOpacities && !sectionOffsetsX && !sectionOffsetsY) return;

    const allKeys = new Set([
      ...Object.keys(sectionValues || {}),
      ...Object.keys(sectionAligns || {}),
      ...Object.keys(sectionSizes || {}),
      ...Object.keys(sectionColors || {}),
      ...Object.keys(sectionWeights || {}),
      ...Object.keys(sectionFamilies || {}),
      ...Object.keys(sectionBgColors || {}),
      ...Object.keys(sectionBgOpacities || {}),
      ...Object.keys(sectionOffsetsX || {}),
      ...Object.keys(sectionOffsetsY || {}),
    ]);

    try {
      for (const key of allKeys) {
        const value = sectionValues?.[key];
        const alignment = sectionAligns?.[key];
        const font_size = sectionSizes?.[key];
        const font_color = sectionColors?.[key];
        const font_weight = sectionWeights?.[key];
        const font_family = sectionFamilies?.[key];
        const bg_color = sectionBgColors?.[key];
        const bg_opacity = sectionBgOpacities?.[key];
        const offset_x = sectionOffsetsX?.[key];
        const offset_y = sectionOffsetsY?.[key];
        if (value === undefined && alignment === undefined && font_size === undefined && font_color === undefined && font_weight === undefined && font_family === undefined && bg_color === undefined && bg_opacity === undefined && offset_x === undefined && offset_y === undefined) continue;
        await updateContent.mutateAsync({
          page: currentPage,
          section,
          key,
          value: value !== undefined ? value : formData[section]?.[key] ?? "",
          alignment,
          font_size,
          font_color,
          font_weight,
          font_family,
          bg_color,
          bg_opacity,
          offset_x,
          offset_y,
        });
      }
      toast({ title: "Content saved" });
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Edit Page Content</h1>
        </div>
      </header>

      <main className="container py-8">
        <Tabs value={currentPage} onValueChange={setCurrentPage}>
          <TabsList className="mb-6">
            {Object.entries(pageContent).map(([key, value]) => (
              <TabsTrigger key={key} value={key}>{value.title}</TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(pageContent).map(([pageKey, page]) => (
            <TabsContent key={pageKey} value={pageKey}>
              <div className="grid gap-6">
                {pageKey === "home" && (() => {
                  // Master box color picker for all sections below the hero
                  const linkedSections = ["features", "cta2"];
                  const linkedContentMap: Record<string, typeof featuresContent> = { features: featuresContent, cta2: cta2Content };
                  const allLinkedFields = linkedSections.flatMap(s => (page.sections[s] || []).map(f => ({ section: s, key: f.key })));
                  const firstLinked = allLinkedFields[0];
                  const masterBgColor = firstLinked
                    ? (bgColorData[firstLinked.section]?.[firstLinked.key] ?? linkedContentMap[firstLinked.section]?.bgColors[firstLinked.key] ?? "")
                    : "";
                  const masterBgOpacity = firstLinked
                    ? (bgOpacityData[firstLinked.section]?.[firstLinked.key] ?? linkedContentMap[firstLinked.section]?.bgOpacities[firstLinked.key] ?? 1)
                    : 1;

                  return (
                    <Card className="border-2 border-primary/30 bg-primary/5">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Palette className="h-5 w-5 text-primary" />
                          <CardTitle className="text-base">Shared Box Color — All Sections Below Hero</CardTitle>
                        </div>
                        <CardDescription>This single colour picker controls the background of all feature cards and the CTA section at the bottom.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Label className="text-xs text-muted-foreground">Color</Label>
                            <input
                              type="color"
                              value={masterBgColor || "#ffffff"}
                              onChange={(e) => {
                                allLinkedFields.forEach(({ section, key }) => handleBgColorChange(section, key, e.target.value));
                              }}
                              className="h-9 w-9 cursor-pointer rounded border border-input p-0"
                            />
                            {masterBgColor && (
                              <button
                                type="button"
                                className="text-xs text-muted-foreground underline"
                                onClick={() => allLinkedFields.forEach(({ section, key }) => handleBgColorChange(section, key, ""))}
                              >
                                Clear
                              </button>
                            )}
                          </div>
                          {masterBgColor && (
                            <div className="flex items-center gap-2 min-w-[200px]">
                              <Label className="text-xs text-muted-foreground whitespace-nowrap">Opacity: {Math.round(masterBgOpacity * 100)}%</Label>
                              <Slider
                                value={[masterBgOpacity * 100]}
                                onValueChange={([val]) => allLinkedFields.forEach(({ section, key }) => handleBgOpacityChange(section, key, val / 100))}
                                min={0}
                                max={100}
                                step={5}
                                className="w-32"
                              />
                            </div>
                          )}
                        </div>
                        {masterBgColor && (
                          <p className="text-xs text-muted-foreground mt-3">Remember to save both the <strong>Features</strong> and <strong>CTA2</strong> sections below for changes to take effect.</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })()}
                {Object.entries(page.sections).map(([sectionKey, fields]) => {
                  const individualBoxKeys = pageKey === "home" && sectionKey === "hero"
                    ? ["cta_primary", "cta_secondary"]
                    : undefined;
                  // Hide per-field box pickers for linked sections
                  const linkedBoxColor = pageKey === "home" && (sectionKey === "features" || sectionKey === "cta2");
                  return (
                    <SectionEditor
                      key={sectionKey}
                      pageKey={pageKey}
                      sectionKey={sectionKey}
                      fields={fields}
                      formData={formData}
                      alignData={alignData}
                      sizeData={sizeData}
                      colorData={colorData}
                      weightData={weightData}
                      familyData={familyData}
                      bgColorData={bgColorData}
                      bgOpacityData={bgOpacityData}
                      onChange={handleChange}
                      onAlignChange={handleAlignChange}
                      onSizeChange={handleSizeChange}
                      onColorChange={handleColorChange}
                      onWeightChange={handleWeightChange}
                      onFamilyChange={handleFamilyChange}
                      onBgColorChange={handleBgColorChange}
                      onBgOpacityChange={handleBgOpacityChange}
                      onOffsetXChange={handleOffsetXChange}
                      onOffsetYChange={handleOffsetYChange}
                      offsetXData={offsetXData}
                      offsetYData={offsetYData}
                      onSave={handleSave}
                      isSaving={updateContent.isPending}
                      linkedBoxColor={linkedBoxColor}
                      individualBoxKeys={individualBoxKeys}
                    />
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

function SectionEditor({
  pageKey,
  sectionKey,
  fields,
  formData,
  alignData,
  sizeData,
  colorData,
  weightData,
  familyData,
  bgColorData,
  bgOpacityData,
  offsetXData,
  offsetYData,
  onChange,
  onAlignChange,
  onSizeChange,
  onColorChange,
  onWeightChange,
  onFamilyChange,
  onBgColorChange,
  onBgOpacityChange,
  onOffsetXChange,
  onOffsetYChange,
  onSave,
  isSaving,
  linkedBoxColor = false,
  individualBoxKeys,
}: {
  pageKey: string;
  sectionKey: string;
  fields: ContentField[];
  formData: Record<string, Record<string, string>>;
  alignData: Record<string, Record<string, string>>;
  sizeData: Record<string, Record<string, number>>;
  colorData: Record<string, Record<string, string>>;
  weightData: Record<string, Record<string, string>>;
  familyData: Record<string, Record<string, string>>;
  bgColorData: Record<string, Record<string, string>>;
  bgOpacityData: Record<string, Record<string, number>>;
  offsetXData: Record<string, Record<string, number>>;
  offsetYData: Record<string, Record<string, number>>;
  onChange: (section: string, key: string, value: string) => void;
  onAlignChange: (section: string, key: string, alignment: string) => void;
  onSizeChange: (section: string, key: string, size: number) => void;
  onColorChange: (section: string, key: string, color: string) => void;
  onWeightChange: (section: string, key: string, weight: string) => void;
  onFamilyChange: (section: string, key: string, family: string) => void;
  onBgColorChange: (section: string, key: string, color: string) => void;
  onBgOpacityChange: (section: string, key: string, opacity: number) => void;
  onOffsetXChange: (section: string, key: string, val: number) => void;
  onOffsetYChange: (section: string, key: string, val: number) => void;
  onSave: (section: string) => void;
  isSaving: boolean;
  linkedBoxColor?: boolean;
  individualBoxKeys?: string[];
}) {
  const { data: content, isLoading } = useSiteContent(pageKey, sectionKey);

  useEffect(() => {
    if (content && !formData[sectionKey]) {
      fields.forEach((field) => {
        onChange(sectionKey, field.key, content.values[field.key] || "");
      });
    }
    if (content && !alignData[sectionKey]) {
      fields.forEach((field) => {
        onAlignChange(sectionKey, field.key, content.alignments[field.key] || "left");
      });
    }
    if (content && !sizeData[sectionKey]) {
      fields.forEach((field) => {
        onSizeChange(sectionKey, field.key, content.fontSizes[field.key] || 16);
      });
    }
    if (content && !colorData[sectionKey]) {
      fields.forEach((field) => {
        onColorChange(sectionKey, field.key, content.fontColors[field.key] || "#000000");
      });
    }
    if (content && !weightData[sectionKey]) {
      fields.forEach((field) => {
        onWeightChange(sectionKey, field.key, content.fontWeights[field.key] || "normal");
      });
    }
    if (content && !familyData[sectionKey]) {
      fields.forEach((field) => {
        onFamilyChange(sectionKey, field.key, content.fontFamilies[field.key] || "");
      });
    }
    if (content && !bgColorData[sectionKey]) {
      fields.forEach((field) => {
        onBgColorChange(sectionKey, field.key, content.bgColors[field.key] || "");
      });
    }
    if (content && !bgOpacityData[sectionKey]) {
      fields.forEach((field) => {
        onBgOpacityChange(sectionKey, field.key, content.bgOpacities[field.key] != null ? content.bgOpacities[field.key] : 1);
      });
    }
    if (content && !offsetXData[sectionKey]) {
      fields.forEach((field) => {
        onOffsetXChange(sectionKey, field.key, content.offsetsX[field.key] || 0);
      });
    }
    if (content && !offsetYData[sectionKey]) {
      fields.forEach((field) => {
        onOffsetYChange(sectionKey, field.key, content.offsetsY[field.key] || 0);
      });
    }
  }, [content]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">Loading...</CardContent>
      </Card>
    );
  }

  const gradientColor = bgColorData[sectionKey]?.["_gradient_color"] ?? content?.bgColors["_gradient_color"] ?? "";
  const gradientOpacity = bgOpacityData[sectionKey]?.["_gradient_color"] ?? content?.bgOpacities["_gradient_color"] ?? 0.6;

  const showGradientControls = pageKey === "home" && sectionKey === "hero";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{sectionKey.replace(/_/g, " ")}</CardTitle>
        <CardDescription>Edit content, style, alignment, size and color for this section</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {showGradientControls && (
          <div className="rounded-md border p-4 mb-2 grid gap-3">
            <Label className="text-sm font-semibold">Hero Gradient Overlay</Label>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Gradient Color</Label>
                <input
                  type="color"
                  value={gradientColor || "#edf2f7"}
                  onChange={(e) => onBgColorChange(sectionKey, "_gradient_color", e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border border-input p-0"
                />
                {gradientColor && (
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline"
                    onClick={() => onBgColorChange(sectionKey, "_gradient_color", "")}
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 min-w-[220px]">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">Fade speed: {Math.round(gradientOpacity * 100)}%</Label>
                <Slider
                  value={[gradientOpacity * 100]}
                  onValueChange={([val]) => onBgOpacityChange(sectionKey, "_gradient_color", val / 100)}
                  min={0}
                  max={100}
                  step={5}
                  className="w-32"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Controls the skin colour at the bottom of the hero image and how quickly it fades in. Higher = more visible sooner.</p>
          </div>
        )}
        {fields.map((field) => {
          const currentAlign = alignData[sectionKey]?.[field.key] || content?.alignments[field.key] || "left";
          const currentValue = formData[sectionKey]?.[field.key] ?? content?.values[field.key] ?? "";
          const currentSize = sizeData[sectionKey]?.[field.key] ?? content?.fontSizes[field.key] ?? 16;
          const currentColor = colorData[sectionKey]?.[field.key] ?? content?.fontColors[field.key] ?? "#000000";
          const currentWeight = weightData[sectionKey]?.[field.key] ?? content?.fontWeights[field.key] ?? "normal";
          const currentFamily = familyData[sectionKey]?.[field.key] ?? content?.fontFamilies[field.key] ?? "";
          const currentBgColor = bgColorData[sectionKey]?.[field.key] ?? content?.bgColors[field.key] ?? "";
          const currentBgOpacity = bgOpacityData[sectionKey]?.[field.key] ?? content?.bgOpacities[field.key] ?? 1;
          const currentOffsetX = offsetXData[sectionKey]?.[field.key] ?? content?.offsetsX[field.key] ?? 0;
          const currentOffsetY = offsetYData[sectionKey]?.[field.key] ?? content?.offsetsY[field.key] ?? 0;

          return (
            <div key={field.key} className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>{field.label}</Label>
                <div className="flex items-center gap-2">
                  <Toggle
                    pressed={currentWeight === "bold"}
                    onPressedChange={(pressed) => onWeightChange(sectionKey, field.key, pressed ? "bold" : "normal")}
                    size="sm"
                    aria-label="Toggle bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Toggle>
                  <ToggleGroup
                    type="single"
                    value={currentAlign}
                    onValueChange={(val) => { if (val) onAlignChange(sectionKey, field.key, val); }}
                    size="sm"
                  >
                    <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Align right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 min-w-[180px]">
                  <Label className="text-xs text-muted-foreground whitespace-nowrap">Size: {currentSize}px</Label>
                  <Slider
                    value={[currentSize]}
                    onValueChange={([val]) => onSizeChange(sectionKey, field.key, val)}
                    min={10}
                    max={72}
                    step={1}
                    className="w-24"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground">Color</Label>
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => onColorChange(sectionKey, field.key, e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-input p-0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground">Font</Label>
                  <Select value={currentFamily} onValueChange={(val) => onFamilyChange(sectionKey, field.key, val)}>
                    <SelectTrigger className="w-[160px] h-8 text-xs">
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_FAMILIES.map((f) => (
                        <SelectItem key={f.value} value={f.value || "default"} style={{ fontFamily: f.value || undefined }}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {(!linkedBoxColor && (!individualBoxKeys || individualBoxKeys.includes(field.key))) && (
                  <>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">Box</Label>
                      <input
                        type="color"
                        value={currentBgColor || "#ffffff"}
                        onChange={(e) => onBgColorChange(sectionKey, field.key, e.target.value)}
                        className="h-8 w-8 cursor-pointer rounded border border-input p-0"
                      />
                      {currentBgColor && (
                        <button
                          type="button"
                          className="text-xs text-muted-foreground underline"
                          onClick={() => onBgColorChange(sectionKey, field.key, "")}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {currentBgColor && (
                      <div className="flex items-center gap-2 min-w-[180px]">
                        <Label className="text-xs text-muted-foreground whitespace-nowrap">Opacity: {Math.round(currentBgOpacity * 100)}%</Label>
                        <Slider
                          value={[currentBgOpacity * 100]}
                          onValueChange={([val]) => onBgOpacityChange(sectionKey, field.key, val / 100)}
                          min={0}
                          max={100}
                          step={5}
                          className="w-24"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 min-w-[200px]">
                  <Label className="text-xs text-muted-foreground whitespace-nowrap">X offset: {currentOffsetX}px</Label>
                  <Slider
                    value={[currentOffsetX]}
                    onValueChange={([val]) => onOffsetXChange(sectionKey, field.key, val)}
                    min={-800}
                    max={800}
                    step={1}
                    className="w-28"
                  />
                </div>
                <div className="flex items-center gap-2 min-w-[200px]">
                  <Label className="text-xs text-muted-foreground whitespace-nowrap">Y offset: {currentOffsetY}px</Label>
                  <Slider
                    value={[currentOffsetY]}
                    onValueChange={([val]) => onOffsetYChange(sectionKey, field.key, val)}
                    min={-800}
                    max={800}
                    step={1}
                    className="w-28"
                  />
                </div>
                {(currentOffsetX !== 0 || currentOffsetY !== 0) && (
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline"
                    onClick={() => {
                      onOffsetXChange(sectionKey, field.key, 0);
                      onOffsetYChange(sectionKey, field.key, 0);
                    }}
                  >
                    Reset position
                  </button>
                )}
              </div>
              {field.type === "textarea" ? (
                <Textarea
                  value={currentValue}
                  onChange={(e) => onChange(sectionKey, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  style={{
                    textAlign: currentAlign as any,
                    fontSize: `${currentSize}px`,
                    color: currentColor,
                    fontWeight: currentWeight,
                    fontFamily: currentFamily || undefined,
                  }}
                />
              ) : (
                <Input
                  value={currentValue}
                  onChange={(e) => onChange(sectionKey, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    textAlign: currentAlign as any,
                    fontSize: `${currentSize}px`,
                    color: currentColor,
                    fontWeight: currentWeight,
                    fontFamily: currentFamily || undefined,
                  }}
                />
              )}
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button onClick={() => onSave(sectionKey)} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Section"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
