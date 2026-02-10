import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent, useUpdateContent } from "@/hooks/useSiteContent";
import { ArrowLeft, Save, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

type ContentField = {
  key: string;
  label: string;
  type: "input" | "textarea";
  placeholder?: string;
};

const pageContent: Record<string, { title: string; sections: Record<string, ContentField[]> }> = {
  home: {
    title: "Homepage",
    sections: {
      hero: [
        { key: "headline", label: "Headline", type: "textarea", placeholder: "Main headline" },
        { key: "subheadline", label: "Subheadline", type: "textarea", placeholder: "Supporting text" },
        { key: "cta_primary", label: "Primary CTA", type: "input", placeholder: "Button text" },
        { key: "cta_secondary", label: "Secondary CTA", type: "input", placeholder: "Button text" },
      ],
      features: [
        { key: "section_title", label: "Section Title", type: "input" },
        { key: "section_description", label: "Section Description", type: "textarea" },
        { key: "feature_1_title", label: "Feature 1 Title", type: "input" },
        { key: "feature_1_description", label: "Feature 1 Description", type: "textarea" },
        { key: "feature_2_title", label: "Feature 2 Title", type: "input" },
        { key: "feature_2_description", label: "Feature 2 Description", type: "textarea" },
        { key: "feature_3_title", label: "Feature 3 Title", type: "input" },
        { key: "feature_3_description", label: "Feature 3 Description", type: "textarea" },
      ],
    },
  },
  "av-production": {
    title: "AV & Production",
    sections: {
      hero: [
        { key: "headline", label: "Headline", type: "textarea" },
        { key: "subheadline", label: "Subheadline", type: "textarea" },
      ],
      categories: [
        { key: "section_title", label: "Section Title", type: "input" },
        { key: "section_description", label: "Section Description", type: "textarea" },
      ],
    },
  },
  contact: {
    title: "Contact Page",
    sections: {
      main: [
        { key: "headline", label: "Page Headline", type: "input" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  },
};

export default function AdminContent() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const updateContent = useUpdateContent();

  const [currentPage, setCurrentPage] = useState("home");
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const [alignData, setAlignData] = useState<Record<string, Record<string, string>>>({});

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
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  }

  function handleAlignChange(section: string, key: string, alignment: string) {
    setAlignData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: alignment },
    }));
  }

  async function handleSave(section: string) {
    const sectionValues = formData[section];
    const sectionAligns = alignData[section];
    if (!sectionValues && !sectionAligns) return;

    const allKeys = new Set([
      ...Object.keys(sectionValues || {}),
      ...Object.keys(sectionAligns || {}),
    ]);

    try {
      for (const key of allKeys) {
        const value = sectionValues?.[key];
        const alignment = sectionAligns?.[key];
        if (value === undefined && alignment === undefined) continue;
        // Only send value if it was actually edited (not undefined)
        const mutationData: { page: string; section: string; key: string; value: string; alignment?: string } = {
          page: currentPage,
          section,
          key,
          value: value !== undefined ? value : formData[section]?.[key] ?? "",
          alignment,
        };
        await updateContent.mutateAsync(mutationData);
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
              <TabsTrigger key={key} value={key}>
                {value.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(pageContent).map(([pageKey, page]) => (
            <TabsContent key={pageKey} value={pageKey}>
              <div className="grid gap-6">
                {Object.entries(page.sections).map(([sectionKey, fields]) => (
                  <SectionEditor
                    key={sectionKey}
                    pageKey={pageKey}
                    sectionKey={sectionKey}
                    fields={fields}
                    formData={formData}
                    alignData={alignData}
                    onChange={handleChange}
                    onAlignChange={handleAlignChange}
                    onSave={handleSave}
                    isSaving={updateContent.isPending}
                  />
                ))}
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
  onChange,
  onAlignChange,
  onSave,
  isSaving,
}: {
  pageKey: string;
  sectionKey: string;
  fields: ContentField[];
  formData: Record<string, Record<string, string>>;
  alignData: Record<string, Record<string, string>>;
  onChange: (section: string, key: string, value: string) => void;
  onAlignChange: (section: string, key: string, alignment: string) => void;
  onSave: (section: string) => void;
  isSaving: boolean;
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
  }, [content]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{sectionKey.replace(/_/g, " ")}</CardTitle>
        <CardDescription>Edit content and alignment for this section</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {fields.map((field) => {
          const currentAlign = alignData[sectionKey]?.[field.key] || content?.alignments[field.key] || "left";
          const currentValue = formData[sectionKey]?.[field.key] ?? content?.values[field.key] ?? "";

          return (
            <div key={field.key} className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>{field.label}</Label>
                <ToggleGroup
                  type="single"
                  value={currentAlign}
                  onValueChange={(val) => {
                    if (val) onAlignChange(sectionKey, field.key, val);
                  }}
                  size="sm"
                >
                  <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              {field.type === "textarea" ? (
                <Textarea
                  value={currentValue}
                  onChange={(e) => onChange(sectionKey, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  style={{ textAlign: currentAlign as any }}
                />
              ) : (
                <Input
                  value={currentValue}
                  onChange={(e) => onChange(sectionKey, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{ textAlign: currentAlign as any }}
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
