// JSON-LD Schema builders for structured data

export interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  areaServed?: string[];
  image?: string;
  logo?: string;
}

export interface ArticleSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo?: string;
  };
  keywords?: string;
  articleSection?: string;
  articleBody?: string;
}

export interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function generateLocalBusinessSchema(data: LocalBusinessSchema): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": data.url,
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "telephone": data.telephone,
    "email": data.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    ...(data.geo && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": data.geo.latitude,
        "longitude": data.geo.longitude
      }
    }),
    ...(data.openingHours && { "openingHours": data.openingHours }),
    ...(data.areaServed && { "areaServed": data.areaServed }),
    ...(data.image && { "image": data.image }),
    ...(data.logo && { "logo": data.logo })
  };

  return JSON.stringify(schema);
}

export function generateArticleSchema(data: ArticleSchema): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": data.description,
    "image": data.image,
    "datePublished": data.datePublished,
    ...(data.dateModified && { "dateModified": data.dateModified }),
    "author": {
      "@type": data.author.url ? "Organization" : "Person",
      "name": data.author.name,
      ...(data.author.url && { "url": data.author.url })
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisher.name,
      ...(data.publisher.logo && {
        "logo": {
          "@type": "ImageObject",
          "url": data.publisher.logo
        }
      })
    },
    ...(data.keywords && { "keywords": data.keywords }),
    ...(data.articleSection && { "articleSection": data.articleSection }),
    ...(data.articleBody && { "articleBody": data.articleBody })
  };

  return JSON.stringify(schema);
}

export function generateFAQSchema(data: FAQSchema): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return JSON.stringify(schema);
}

export function injectSchema(schema: string, id: string) {
  // Remove existing schema with this ID if present
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  // Inject new schema
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = schema;
  document.head.appendChild(script);
}

export function removeSchema(id: string) {
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }
}