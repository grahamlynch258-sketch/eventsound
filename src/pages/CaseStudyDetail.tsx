import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/site/PageShell";
import { useSeo } from "@/hooks/useSeo";
import { supabase } from "@/integrations/supabase/client";
import { generateArticleSchema } from "@/lib/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowLeft, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
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
  published_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image_url: string;
  noindex: boolean;
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudyData[]>([]);

  useEffect(() => {
    if (slug) {
      fetchCaseStudy();
    }
  }, [slug]);

  const fetchCaseStudy = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;

      if (!data) {
        navigate("/404");
        return;
      }

      setCaseStudy(data);

      // Fetch related case studies (same category, different slug)
      if (data.category) {
        const { data: related } = await supabase
          .from("case_studies")
          .select("*")
          .eq("category", data.category)
          .eq("is_published", true)
          .eq("noindex", false)
          .neq("slug", slug)
          .limit(3);

        setRelatedCaseStudies(related || []);
      }
    } catch (error) {
      console.error("Error fetching case study:", error);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  // Generate Article schema — only when data is available
  const articleSchema = caseStudy ? generateArticleSchema({
    headline: caseStudy.title,
    description: caseStudy.excerpt || caseStudy.meta_description || "",
    image: caseStudy.og_image_url || caseStudy.featured_image_url,
    datePublished: caseStudy.published_at,
    dateModified: caseStudy.updated_at,
    author: {
      name: "EventSound",
      url: "https://eventsound.ie"
    },
    publisher: {
      name: "EventSound",
      logo: "https://eventsound.ie/logo.png"
    },
    keywords: caseStudy.tags?.join(", "),
    articleSection: caseStudy.category,
    articleBody: caseStudy.body_content
  }) : undefined;

  // useSeo called unconditionally — all hooks must be above any early returns
  useSeo({
    title: caseStudy?.meta_title || (caseStudy?.title ? `${caseStudy.title} | EventSound Case Studies` : "Case Study | EventSound"),
    description: caseStudy?.meta_description || caseStudy?.excerpt || "EventSound event production case study",
    canonical: caseStudy?.canonical_url || (caseStudy?.slug ? `https://eventsound.ie/case-studies/${caseStudy.slug}` : undefined),
    ogTitle: caseStudy?.meta_title || caseStudy?.title,
    ogDescription: caseStudy?.meta_description || caseStudy?.excerpt || "",
    ogImage: caseStudy?.og_image_url || caseStudy?.featured_image_url,
    ogType: "article",
    noindex: caseStudy?.noindex || false,
    schema: articleSchema,
    schemaId: "case-study-schema"
  });

  if (loading) {
    return (
      <PageShell>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading case study...</div>
        </div>
      </PageShell>
    );
  }

  if (!caseStudy) {
    return null;
  }

  return (
    <PageShell>
      {/* Breadcrumb */}
      <div className="bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link to="/case-studies" className="hover:text-accent transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-foreground">{caseStudy.title}</span>
          </nav>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/case-studies">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Button>
        </Link>

        {/* Hero Image */}
        {caseStudy.featured_image_url && (
          <div className="aspect-video w-full max-w-4xl mx-auto mb-8 rounded-lg overflow-hidden">
            <img
              src={caseStudy.featured_image_url}
              alt={caseStudy.featured_image_alt || caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title and Category */}
        <div className="max-w-4xl mx-auto mb-8">
          {caseStudy.category && (
            <Badge className="mb-4">{caseStudy.category}</Badge>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {caseStudy.title}
          </h1>
        </div>

        {/* Metadata Row */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-6 text-muted-foreground">
          {caseStudy.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{caseStudy.location}</span>
            </div>
          )}
          {caseStudy.event_date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(caseStudy.event_date).toLocaleDateString('en-IE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          {caseStudy.services_used && caseStudy.services_used.length > 0 && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>{caseStudy.services_used.join(", ")}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Excerpt */}
        {caseStudy.excerpt && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
              <p className="text-lg text-foreground/90 leading-relaxed">{caseStudy.excerpt}</p>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-6 md:p-8">
            <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed text-base md:text-lg">
              {caseStudy.body_content}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-xl border border-accent/30 bg-card/40 backdrop-blur-sm p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Need Similar Services?</h3>
            <p className="text-muted-foreground mb-6">
              Get in touch to discuss your event production needs.
            </p>
            <Link to="/contact"><Button size="lg">Get a Quote</Button></Link>
          </div>
        </div>

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Related Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCaseStudies.map((related) => (
                <Link
                  key={related.id}
                  to={`/case-studies/${related.slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    {related.featured_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.featured_image_url}
                          alt={related.featured_image_alt || related.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  );
};

export default CaseStudyDetail;