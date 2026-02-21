import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Search, Eye, EyeOff } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

const AdminCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCaseStudies();
  }, [filterStatus]);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (filterStatus === "published") {
        query = query.eq("is_published", true);
      } else if (filterStatus === "draft") {
        query = query.eq("is_published", false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      toast({
        title: "Error",
        description: "Failed to load case studies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("case_studies")
        .update({
          is_published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Case study ${!currentStatus ? "published" : "unpublished"}`,
      });

      fetchCaseStudies();
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast({
        title: "Error",
        description: "Failed to update case study",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("case_studies")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Case study deleted",
      });

      fetchCaseStudies();
    } catch (error) {
      console.error("Error deleting case study:", error);
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const filteredCaseStudies = caseStudies.filter((cs) =>
    cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Case Studies</h1>
          <p className="text-gray-600 mt-1">
            Manage your event production case studies
          </p>
        </div>
        <Link to="/admin/case-studies/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Case Study
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "published" ? "default" : "outline"}
            onClick={() => setFilterStatus("published")}
          >
            Published
          </Button>
          <Button
            variant={filterStatus === "draft" ? "default" : "outline"}
            onClick={() => setFilterStatus("draft")}
          >
            Draft
          </Button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredCaseStudies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No case studies found</p>
          <Link to="/admin/case-studies/new">
            <Button>Create your first case study</Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCaseStudies.map((caseStudy) => (
                <TableRow key={caseStudy.id}>
                  <TableCell className="font-medium">
                    {caseStudy.title}
                  </TableCell>
                  <TableCell>
                    {caseStudy.category && (
                      <Badge variant="outline">{caseStudy.category}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{caseStudy.location || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={caseStudy.is_published ? "default" : "secondary"}>
                      {caseStudy.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {caseStudy.published_at
                      ? new Date(caseStudy.published_at).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => togglePublishStatus(caseStudy.id, caseStudy.is_published)}
                        title={caseStudy.is_published ? "Unpublish" : "Publish"}
                      >
                        {caseStudy.is_published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Link to={`/admin/case-studies/${caseStudy.id}`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteId(caseStudy.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the case study.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCaseStudies;