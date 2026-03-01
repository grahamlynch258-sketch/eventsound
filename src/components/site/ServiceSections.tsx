import type { ServiceSection } from "@/hooks/useServiceSections";

interface ServiceSectionsProps {
  sections: ServiceSection[];
}

export function ServiceSections({ sections }: ServiceSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <div className="space-y-16 my-12">
      {sections.map((section, index) => {
        const imageLeft = index % 2 === 0;

        return (
          <div
            key={section.id}
            className={`flex flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
          >
            <div className="w-full md:w-1/2">
              <figure>
                <img
                  src={section.image_url}
                  alt={section.alt_text}
                  title={section.title_attr || undefined}
                  className="w-full rounded-lg object-cover aspect-video"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
                {section.caption && (
                  <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                    {section.caption}
                  </figcaption>
                )}
              </figure>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              {section.section_heading && (
                <h2 className="text-2xl font-semibold transition-transform duration-300 hover:scale-[1.05] cursor-default">
                  {section.section_heading}
                </h2>
              )}
              {section.section_description && (
                <p className="text-muted-foreground leading-relaxed transition-transform duration-300 hover:scale-[1.04] cursor-default">
                  {section.section_description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
