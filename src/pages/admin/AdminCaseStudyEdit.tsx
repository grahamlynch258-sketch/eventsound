import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CaseStudyForm {
  title: string;
  slug: string;
  excerpt: string;
  body_content: string;
  featured_image_url: string;
  featured_image_alt: string;
  category: string;
  tags: string[];
  location: string;
  services_used: string[];
  client_name: string;
  event_date: string;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image_url: string;
  noindex: boolean;
}

const CATEGORIES = [
  "Corporate Events",
  "Conferences",
  "Live Shows",
  "Galas & Awards",
  "Product Launches",
  "Festivals",
  "Other"
];

const SERVICES = [
  "LED Video Walls",
  "Sound Systems",
  "Lighting Design",
  "Event Staging",
  "Event Production",
  "Technical Support"
];

const AdminCaseStudyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<CaseStudyForm>({
    title: "",
    slug: "",
    excerpt: "",
    body_content: "",
    featured_image_url: "",
    featured_image_alt: "",
    category: "",
    tags: [],
    location: "",
    services_used: [],
    client_name: "",
    event_date: "",
    is_published: false,
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    og_image_url: "",
    noindex: false,
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchCaseStudy();
    }
  }, [id, isNew]);

  const fetchCaseStudy = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          ...data,
          tags: data.tags || [],
          services_used: data.services_used || [],
        });
      }
    } catch (error) {
      console.error("Error fetching case study:", error);
      toast({
        title: "Error",
        description: "Failed to load case study",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("case-study-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("case-study-images")
        .getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        featured_image_url: publicUrl,
      }));

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.slug || !formData.featured_image_url || !formData.featured_image_alt) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const dataToSave = {
        ...formData,
        published_at: formData.is_published ? (formData.is_published ? new Date().toISOString() : null) : null,
      };

      if (isNew) {
        const { error } = await supabase
          .from("case_studies")
          .insert([dataToSave]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("case_studies")
          .update(dataToSave)
          .eq("id", id);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Case study ${isNew ? "created" : "updated"} successfully`,
      });

      navigate("/admin/case-studies");
    } catch (error: any) {
      console.error("Error saving case study:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save case study",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Link to="/admin/case-studies">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {isNew ? "Create Case Study" : "Edit Case Study"}
          </h1>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="url-friendly-slug"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL: /case-studies/{formData.slug}
                </p>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  placeholder="Brief summary (150-200 characters)"
                />
              </div>

              <div>
                <Label htmlFor="body_content">Body Content</Label>
                <Textarea
                  id="body_content"
                  value={formData.body_content}
                  onChange={(e) => setFormData({ ...formData, body_content: e.target.value })}
                  rows={12}
                  placeholder="Full case study content..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image-upload">
                  Upload Image <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </div>
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                {formData.featured_image_url && (
                  <div className="mt-4">
                    <img
                      src={formData.featured_image_url}
                      alt="Preview"
                      className="max-w-xs rounded border"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="featured_image_alt">
                  Image Alt Text <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="featured_image_alt"
                  value={formData.featured_image_alt}
                  onChange={(e) => setFormData({ ...formData, featured_image_alt: e.target.value })}
                  required
                  placeholder="Descriptive alt text for accessibility and SEO"
                />
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card>
            <CardHeader>
              <CardTitle>Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="LED Wall, Corporate, Dublin"
                />
              </div>

              <div>
                <Label>Services Used</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SERVICES.map((service) => (
                    <label key={service} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.services_used.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              services_used: [...formData.services_used, service],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              services_used: formData.services_used.filter((s) => s !== service),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Dublin Convention Centre"
                />
              </div>

              <div>
                <Label htmlFor="event_date">Event Date</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="client_name">Client Name (optional)</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Company or client name"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="Leave empty to use title"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.meta_title.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={3}
                  placeholder="Leave empty to use excerpt"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.meta_description.length}/160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  value={formData.canonical_url}
                  onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                  placeholder="Leave empty for default"
                />
              </div>

              <div>
                <Label htmlFor="og_image_url">OG Image URL</Label>
                <Input
                  id="og_image_url"
                  value={formData.og_image_url}
                  onChange={(e) => setFormData({ ...formData, og_image_url: e.target.value })}
                  placeholder="Leave empty to use featured image"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="noindex">No Index (hide from search engines)</Label>
                <Switch
                  id="noindex"
                  checked={formData.noindex}
                  onCheckedChange={(checked) => setFormData({ ...formData, noindex: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Publishing */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="is_published">Published</Label>
                  <p className="text-sm text-gray-500">Make this case study visible on the site</p>
                </div>
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default AdminCaseStudyEdit;