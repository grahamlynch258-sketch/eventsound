import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  useCategories,
  useUpdateCategory,
  useCreateCategory,
  useDeleteCategory,
  useUploadImage,
  Category,
} from "@/hooks/useSiteContent";
import { ArrowLeft, Plus, Trash2, Upload, GripVertical } from "lucide-react";
import ImageLibraryPicker from "@/components/admin/ImageLibraryPicker";

export default function AdminCategories() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const updateCategory = useUpdateCategory();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const uploadImage = useUploadImage();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState({
    title: "",
    image_url: "",
    link: "/contact",
    sort_order: 0,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || categoriesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    isNew: boolean
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage.mutateAsync(file);
      if (isNew) {
        setNewCategory((prev) => ({ ...prev, image_url: url }));
      } else {
        setEditForm((prev) => ({ ...prev, image_url: url }));
      }
      toast({ title: "Image uploaded" });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  async function handleUpdate(id: string) {
    try {
      await updateCategory.mutateAsync({ id, ...editForm });
      setEditingId(null);
      setEditForm({});
      toast({ title: "Category updated" });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  async function handleCreate() {
    if (!newCategory.title || !newCategory.image_url) {
      toast({
        title: "Missing fields",
        description: "Title and image are required",
        variant: "destructive",
      });
      return;
    }

    try {
      await createCategory.mutateAsync({
        ...newCategory,
        sort_order: (categories?.length || 0) + 1,
      });
      setIsCreating(false);
      setNewCategory({ title: "", image_url: "", link: "/contact", sort_order: 0 });
      toast({ title: "Category created" });
    } catch (error) {
      toast({
        title: "Create failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory.mutateAsync(id);
      toast({ title: "Category deleted" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setEditForm({
      title: category.title,
      image_url: category.image_url,
      link: category.link,
      is_active: category.is_active,
      sort_order: category.sort_order,
    });
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
          <h1 className="text-lg font-semibold">Manage Categories</h1>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage the category cards shown on the AV & Production page.
          </p>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {isCreating && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>New Category</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Title</Label>
                  <Input
                    value={newCategory.title}
                    onChange={(e) =>
                      setNewCategory((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="e.g. Audio"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Link</Label>
                  <Input
                    value={newCategory.link}
                    onChange={(e) =>
                      setNewCategory((prev) => ({ ...prev, link: e.target.value }))
                    }
                    placeholder="/contact"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Image</Label>
                <div className="flex items-center gap-4">
                  {newCategory.image_url && (
                    <img
                      src={newCategory.image_url}
                      alt="Preview"
                      className="h-20 w-28 rounded object-cover"
                    />
                  )}
                  <label className="flex cursor-pointer items-center gap-2 rounded border border-dashed px-4 py-2 text-sm hover:bg-muted">
                    <Upload className="h-4 w-4" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </label>
                  <ImageLibraryPicker
                    onSelect={(url) => setNewCategory((prev) => ({ ...prev, image_url: url }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreate} disabled={createCategory.isPending}>
                  {createCategory.isPending ? "Creating..." : "Create Category"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setNewCategory({ title: "", image_url: "", link: "/contact", sort_order: 0 });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {categories?.map((category) => (
            <Card key={category.id}>
              <CardContent className="py-4">
                {editingId === category.id ? (
                  <div className="flex flex-col gap-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={editForm.image_url || category.image_url}
                        alt={category.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed px-4 py-3 text-sm hover:bg-muted">
                      <Upload className="h-4 w-4" />
                      Upload New Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, false)}
                      />
                    </label>
                    <ImageLibraryPicker
                      onSelect={(url) => setEditForm((prev) => ({ ...prev, image_url: url }))}
                    />
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="grid gap-1">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={editForm.title || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, title: e.target.value }))
                          }
                        />
                      </div>
                      <div className="grid gap-1">
                        <Label className="text-xs">Link</Label>
                        <Input
                          value={editForm.link || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, link: e.target.value }))
                          }
                        />
                      </div>
                      <div className="grid gap-1">
                        <Label className="text-xs">Order</Label>
                        <Input
                          type="number"
                          value={editForm.sort_order || 0}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              sort_order: parseInt(e.target.value) || 0,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={editForm.is_active}
                          onCheckedChange={(checked) =>
                            setEditForm((prev) => ({ ...prev, is_active: checked }))
                          }
                        />
                        <Label className="text-sm">Active</Label>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleUpdate(category.id)}
                        disabled={updateCategory.isPending}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setEditForm({});
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={category.image_url}
                        alt={category.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{category.title}</p>
                        <p className="text-sm text-muted-foreground">{category.link}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-xs ${
                            category.is_active
                              ? "bg-green-500/10 text-green-600"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {category.is_active ? "Active" : "Hidden"}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => startEdit(category)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {(!categories || categories.length === 0) && !isCreating && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No categories yet. Click "Add Category" to create one.
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
