import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface GalleryItem {
  id: string;
  title: string;
  category: string | null;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

interface LibraryImage {
  id: string;
  image_url: string;
  title: string;
}

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [libraryImages, setLibraryImages] = useState<LibraryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image_url: "",
    alt_text: "",
    sort_order: 0,
    is_published: true
  });

  useEffect(() => {
    fetchItems();
    fetchLibraryImages();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch gallery items: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLibraryImages = async () => {
    try {
      const { data, error } = await supabase
        .from("library_images")
        .select("id, image_url, title")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLibraryImages(data || []);
    } catch (error: any) {
      console.error("Failed to fetch library images:", error.message);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      category: "",
      image_url: "",
      alt_text: "",
      sort_order: 0,
      is_published: true
    });
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category || "",
      image_url: item.image_url,
      alt_text: item.alt_text || "",
      sort_order: item.sort_order,
      is_published: item.is_published
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      title: "",
      category: "",
      image_url: "",
      alt_text: "",
      sort_order: 0,
      is_published: true
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.image_url.trim()) {
      toast.error("Image URL is required");
      return;
    }
    if (!formData.alt_text.trim()) {
      toast.error("Alt text is required for accessibility");
      return;
    }

    try {
      if (isCreating) {
        const { error } = await supabase
          .from("gallery_items")
          .insert([formData]);

        if (error) throw error;
        toast.success("Gallery item created successfully");
      } else if (editingId) {
        const { error } = await supabase
          .from("gallery_items")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Gallery item updated successfully");
      }

      handleCancel();
      fetchItems();
    } catch (error: any) {
      toast.error("Failed to save: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Gallery item deleted");
      fetchItems();
    } catch (error: any) {
      toast.error("Failed to delete: " + error.message);
    }
  };

  const selectLibraryImage = (imageUrl: string, imageTitle: string) => {
    setFormData({ 
      ...formData, 
      image_url: imageUrl,
      alt_text: formData.alt_text || imageTitle
    });
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <Button onClick={handleCreate} disabled={isCreating || editingId !== null}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {(isCreating || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New" : "Edit"} Gallery Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Image title"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Optional category"
              />
            </div>

            <div>
              <Label>Select from Library</Label>
              <div className="grid grid-cols-4 gap-2 mt-2 max-h-48 overflow-y-auto border p-2 rounded">
                {libraryImages.map((img) => (
                  <img
                    key={img.id}
                    src={img.image_url}
                    alt={img.title}
                    className={`cursor-pointer border-2 rounded hover:opacity-75 ${
                      formData.image_url === img.image_url ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => selectLibraryImage(img.image_url, img.title)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="image_url">Image URL *</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="Or paste image URL"
              />
            </div>

            <div>
              <Label htmlFor="alt_text">Alt Text * (Required for accessibility)</Label>
              <Input
                id="alt_text"
                value={formData.alt_text}
                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                placeholder="Describe the image for screen readers"
              />
            </div>

            <div>
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label htmlFor="is_published">Published</Label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-3">
              <img src={item.image_url} alt={item.alt_text} className="w-full h-48 object-cover rounded" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                {item.category && <p className="text-sm text-muted-foreground">{item.category}</p>}
                <p className="text-xs text-muted-foreground mt-1">Order: {item.sort_order}</p>
                <p className="text-xs text-muted-foreground">
                  {item.is_published ? "✓ Published" : "✗ Unpublished"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}