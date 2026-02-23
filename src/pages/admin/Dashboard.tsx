import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Image, 
  Search, 
  FileText, 
  MessageSquare, 
  Library, 
  Tag, 
  Images,
  Briefcase
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your EventSound website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gallery Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100"
          onClick={() => navigate("/admin/gallery")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Gallery</CardTitle>
            <Image className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage gallery images and categories
            </p>
          </CardContent>
        </Card>

        {/* Case Studies Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100"
          onClick={() => navigate("/admin/case-studies")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Case Studies</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage event production case studies
            </p>
          </CardContent>
        </Card>

        {/* SEO Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100"
          onClick={() => navigate("/admin/seo")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">SEO</CardTitle>
            <Search className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage page metadata and SEO settings
            </p>
          </CardContent>
        </Card>

        {/* Content Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-yellow-50 to-yellow-100"
          onClick={() => navigate("/admin/content")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Content</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage site content and pages
            </p>
          </CardContent>
        </Card>

        {/* Testimonials Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-pink-50 to-pink-100"
          onClick={() => navigate("/admin/testimonials")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage client testimonials and reviews
            </p>
          </CardContent>
        </Card>

        {/* Library Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-indigo-50 to-indigo-100"
          onClick={() => navigate("/admin/library")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Library</CardTitle>
            <Library className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage media library and assets
            </p>
          </CardContent>
        </Card>

        {/* Categories Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-orange-100"
          onClick={() => navigate("/admin/categories")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Categories</CardTitle>
            <Tag className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage content categories
            </p>
          </CardContent>
        </Card>

        {/* Images Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-teal-50 to-teal-100"
          onClick={() => navigate("/admin/images")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Images</CardTitle>
            <Images className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage site images
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;