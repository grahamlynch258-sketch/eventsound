import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

const FEATURABLE_WIDGET_ID = "b2ee5fe1-ce0a-4af5-8324-4558bd7d337e";

interface GoogleReviewsCarouselProps {
  maxItems?: number;
}

export function GoogleReviewsCarousel({ maxItems = 3 }: GoogleReviewsCarouselProps) {
  return (
    <ReactGoogleReviews
      layout="carousel"
      featurableId={FEATURABLE_WIDGET_ID}
      maxItems={maxItems}
      theme="dark"
      structuredData={true}
      brandName="EventSound AV Services"
      nameDisplay="firstAndLastInitials"
      dateDisplay="relative"
      reviewVariant="card"
      maxCharacters={200}
      carouselAutoplay={true}
      carouselSpeed={5000}
      logoVariant="icon"
    />
  );
}

export function GoogleReviewsBadge() {
  return (
    <ReactGoogleReviews
      layout="badge"
      featurableId={FEATURABLE_WIDGET_ID}
      theme="dark"
    />
  );
}
