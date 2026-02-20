import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Plus, Save, X, Edit } from "lucide-react";

interface PageSeo {
  path: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  noindex: boolean;
}

const ROUTE_PRESETS = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact" },
  { path: "/about", label: "About" }
];

export default function AdminSeo() {
  const [pages, setPages] = useState<PageSeo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<PageSeo>({
    path: "",
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    og_title: "",
    og_description: "",
    og_image_url: "",
    noindex: false
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await (supabase
        .from("page_seo") as any)
        .select("*")
        .order("path");

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch SEO data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePreset = (path: string) => {
    setIsCreating(true);
    setFormData({
      path,
      meta_title: "",
      meta_description: "",
      canonical_url: `https://eventsound.ie${path}`,
      og_title: "",
      og_description: "",
      og_image_url: "",
      noindex: false
    });
  };

  const handleEdit = (page: PageSeo) => {
    setEditingPath(page.path);
    setFormData(page);
  };

  const handleCancel = () => {
    setEditingPath(null);
    setIsCreating(false);
    setFormData({
      path: "",
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      og_title: "",
      og_description: "",
      og_image_url: "",
      noindex: false
    });
  };

  const handleSave = async () => {
    if (!formData.path.trim()) {
      toast.error("Path is required");
      return;
    }

    try {
      const { error } = await (supabase
        .from("page_seo") as any)
        .upsert(formData, { onConflict: "path" });

      if (error) throw error;
      toast.success("SEO data saved successfully");
      handleCancel();
      fetchPages();
    } catch (error: any) {
      toast.error("Failed to save: " + error.message);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">SEO Management</h1>
        <p className="text-muted-foreground">Manage page metadata for search engines and social media</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Page Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ROUTE_PRESETS.map((preset) => {
              const exists = pages.find((p) => p.path === preset.path);
              return (
                <Button
                  key={preset.path}
                  onClick={() => exists ? handleEdit(exists) : handleCreatePreset(preset.path)}
                  variant={exists ? "outline" : "default"}
                  size="sm"
                >
                  {exists ? <Edit className="mr-2 h-3 w-3" /> : <Plus className="mr-2 h-3 w-3" />}
                  {preset.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {(isCreating || editingPath) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create" : "Edit"} SEO for: {formData.path}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="path">Path</Label>
              <Input
                id="path"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                placeholder="/about"
                disabled={!isCreating}
              />
            </div>

            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={formData.meta_title || ""}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Page Title | EventSound"
              />
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description || ""}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Brief description for search results"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input
                id="canonical_url"
                value={formData.canonical_url || ""}
                onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                placeholder="https://eventsound.ie/page"
              />
            </div>

            <div>
              <Label htmlFor="og_title">Open Graph Title</Label>
              <Input
                id="og_title"
                value={formData.og_title || ""}
                onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                placeholder="Title for social media"
              />
            </div>

            <div>
              <Label htmlFor="og_description">Open Graph Description</Label>
              <Textarea
                id="og_description"
                value={formData.og_description || ""}
                onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                placeholder="Description for social media"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="og_image_url">Open Graph Image URL</Label>
              <Input
                id="og_image_url"
                value={formData.og_image_url || ""}
                onChange={(e) => setFormData({ ...formData, og_image_url: e.target.value })}
                placeholder="https://eventsound.ie/og-image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="noindex"
                checked={formData.noindex}
                onCheckedChange={(checked) => setFormData({ ...formData, noindex: checked })}
              />
              <Label htmlFor="noindex">No Index (Hide from search engines)</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Existing Pages</h2>
        {pages.length === 0 ? (
          <p className="text-muted-foreground">No SEO data configured yet. Use presets above to get started.</p>
        ) : (
          pages.map((page) => (
            <Card key={page.path}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{page.path}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {page.meta_title || "No title set"}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(page)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}