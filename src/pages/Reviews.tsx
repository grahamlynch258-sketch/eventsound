import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { GoogleReviewsCarousel, GoogleReviewsBadge } from "@/components/GoogleReviews";
import { useSeo } from "@/hooks/useSeo";
import { useServiceImages } from "@/hooks/useServiceImages";

const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJy0JQslYLZ0gRQOACHmQptmI";

const Reviews = () => {
  const { hero } = useServiceImages("hero-reviews");
  useSeo({
    title: "Client Reviews | EventSound Event Production Ireland",
    description: "What our clients say about EventSound. Read reviews from corporate clients, agencies & event organisers across Ireland. Trusted AV hire & event production.",
    canonical: "https://eventsound.ie/reviews",
    ogTitle: "Client Reviews | EventSound Ireland",
    ogDescription: "Read what our clients say about EventSound's event production services across Ireland."
  });

  return (
    <PageShell>
      <PageHeader
        title="Client Reviews"
        subtitle="Real feedback from event managers, agencies, and corporate clients who trust EventSound as their production partner across Ireland."
        backgroundImage={hero}
        backgroundAlt="Professional event production setup at a live event in Ireland"
      />

      {/* Google Reviews Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Google Reviews</h2>
              <GoogleReviewsBadge />
            </div>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-semibold hover:bg-accent/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Write a review
            </a>
          </div>
          <GoogleReviewsCarousel maxItems={3} />
        </div>
      </section>

      {/* Existing client testimonials */}
      <TestimonialsSection />
    </PageShell>
  );
};

export default Reviews;
