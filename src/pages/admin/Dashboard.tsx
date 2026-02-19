import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Image, Users, BookOpen, Tag, Search } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const adminSections = [
    {
      title: "Gallery",
      description: "Manage gallery images and portfolio items",
      icon: Image,
      path: "/admin/gallery",
      color: "text-blue-600"
    },
    {
      title: "SEO",
      description: "Manage page metadata and search optimization",
      icon: Search,
      path: "/admin/seo",
      color: "text-green-600"
    },
    {
      title: "Content",
      description: "Manage page content and sections",
      icon: FileText,
      path: "/admin/content",
      color: "text-purple-600"
    },
    {
      title: "Testimonials",
      description: "Manage client reviews and testimonials",
      icon: Users,
      path: "/admin/testimonials",
      color: "text-orange-600"
    },
    {
      title: "Library",
      description: "Manage image library and assets",
      icon: BookOpen,
      path: "/admin/library",
      color: "text-pink-600"
    },
    {
      title: "Categories",
      description: "Manage service and content categories",
      icon: Tag,
      path: "/admin/categories",
      color: "text-indigo-600"
    },
    {
      title: "Images",
      description: "Upload and manage images",
      icon: Image,
      path: "/admin/images",
      color: "text-teal-600"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your EventSound website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.path} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className={`h-8 w-8 ${section.color}`} />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate(section.path)}
                  className="w-full"
                  variant="outline"
                >
                  Manage {section.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}