import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";


interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image_url: string;
  featured_image_alt: string;
  category: string;
  tags: string[];
  location: string;
  published_at: string;
}

const CaseStudies = () => {
  const { hero } = useServiceImages("hero-case-studies");
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useSeo({
    title: "Case Studies | EventSound Event Production Ireland",
    description: "Explore our case studies showcasing successful event production projects across Ireland. LED walls, sound systems, lighting, and staging for corporate events and live shows.",
    canonical: "https://eventsound.ie/case-studies",
    ogTitle: "Case Studies | EventSound Ireland",
    ogDescription: "Explore our event production case studies from corporate conferences, galas, and live shows across Ireland."
  });

  useEffect(() => {
    fetchCaseStudies();
  }, [selectedCategory]);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .eq("noindex", false)
        .order("published_at", { ascending: false });

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(caseStudies.map(cs => cs.category).filter(Boolean)));

  if (loading) {
    return (
      <PageShell>
        <PageHeader
          title="Case Studies"
          subtitle="Real-world event production success stories"
          backgroundImage={hero}
          backgroundAlt="EventSound event production success stories"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading case studies...</div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        title="Case Studies"
        subtitle="Real-world event production success stories from across Ireland"
        backgroundImage={hero}
        backgroundAlt="EventSound event production success stories"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Case Studies Grid */}
        {caseStudies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No case studies available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id}
                to={`/case-studies/${caseStudy.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  {caseStudy.featured_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={caseStudy.featured_image_url}
                        alt={caseStudy.featured_image_alt || caseStudy.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    {caseStudy.category && (
                      <Badge className="mb-2 w-fit">{caseStudy.category}</Badge>
                    )}
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {caseStudy.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {caseStudy.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {caseStudy.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{caseStudy.location}</span>
                        </div>
                      )}
                      {caseStudy.published_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(caseStudy.published_at).toLocaleDateString('en-IE', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                    {caseStudy.tags && caseStudy.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {caseStudy.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default CaseStudies;