import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminTestimonials() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, loading, navigate]);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ client_name: "", client_role: "", company: "", quote: "", rating: 5, is_featured: false, sort_order: 0 });

  const resetForm = () => {
    setForm({ client_name: "", client_role: "", company: "", quote: "", rating: 5, is_featured: false, sort_order: 0 });
    setEditingId(null);
  };

  const upsertMutation = useMutation({
    mutationFn: async (data: typeof form & { id?: string }) => {
      if (data.id) {
        const { error } = await supabase.from("testimonials").update(data).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: editingId ? "Testimonial updated" : "Testimonial added" });
      resetForm();
    },
    onError: () => toast({ title: "Error saving testimonial", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Testimonial deleted" });
    },
  });

  const startEdit = (t: any) => {
    setEditingId(t.id);
    setForm({ client_name: t.client_name, client_role: t.client_role || "", company: t.company || "", quote: t.quote, rating: t.rating, is_featured: t.is_featured, sort_order: t.sort_order });
  };

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="sm" asChild><Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link></Button>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-border/50 bg-card p-6 mb-8">
          <h2 className="font-semibold mb-4">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2"><Label>Client Name *</Label><Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Role</Label><Input value={form.client_role} onChange={(e) => setForm({ ...form, client_role: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
            </div>
            <div className="grid gap-2"><Label>Quote *</Label><Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} /></div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2"><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} /></div>
              <div className="grid gap-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
              <div className="flex items-center gap-2 pt-6"><Switch checked={form.is_featured} onCheckedChange={(c) => setForm({ ...form, is_featured: c })} /><Label>Featured</Label></div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => upsertMutation.mutate(editingId ? { ...form, id: editingId } : form)} disabled={!form.client_name.trim() || !form.quote.trim()}>
                {editingId ? "Update" : "Add"} Testimonial
              </Button>
              {editingId && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {isLoading ? <p className="text-muted-foreground">Loading...</p> :
            testimonials?.map((t) => (
              <div key={t.id} className="rounded-lg border border-border/50 bg-card p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{t.client_name}</p>
                    {t.is_featured && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Featured</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{t.client_role}{t.company ? `, ${t.company}` : ""}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">"{t.quote}"</p>
                  <div className="flex gap-0.5 mt-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(t)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
