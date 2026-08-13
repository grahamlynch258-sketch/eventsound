import { Fragment, type ReactNode } from "react";
import type { BlogImage } from "@/types/blog";
import { safeContentUrl } from "@/lib/blog";

interface BlogContentProps {
  content: string;
  images?: BlogImage[];
}

const INLINE_TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_TOKEN).filter(Boolean).map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = safeContentUrl(link[2]);
      if (!href) return <Fragment key={index}>{link[1]}</Fragment>;
      const external = href.startsWith("https://") && !href.startsWith("https://eventsound.ie/");
      return (
        <a
          key={index}
          href={href}
          className="text-accent underline underline-offset-4 hover:text-accent/80"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {link[1]}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function BlogContent({ content, images = [] }: BlogContentProps) {
  const imageMap = new Map(images.map((image) => [image.id, image]));
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    const marker = line.match(/^\{\{image:([0-9a-f-]+)\}\}$/i);
    if (marker) {
      const image = imageMap.get(marker[1]);
      if (image) {
        blocks.push(
          <figure key={`image-${index}`} className="my-10">
            <img
              src={image.storage_url}
              alt={image.alt_text}
              loading="lazy"
              className="w-full rounded-xl border border-border/60"
            />
            {image.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{image.caption}</figcaption>}
          </figure>,
        );
      }
      continue;
    }

    const markdownImage = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (markdownImage) {
      const src = safeContentUrl(markdownImage[2], "image");
      if (src) {
        blocks.push(
          <figure key={`markdown-image-${index}`} className="my-10">
            <img src={src} alt={markdownImage[1]} loading="lazy" className="w-full rounded-xl border border-border/60" />
          </figure>,
        );
      }
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const className = "font-bold text-foreground mt-10 mb-4 scroll-mt-24";
      if (level === 2) blocks.push(<h2 key={index} className={`text-3xl ${className}`}>{renderInline(heading[2])}</h2>);
      if (level === 3) blocks.push(<h3 key={index} className={`text-2xl ${className}`}>{renderInline(heading[2])}</h3>);
      if (level === 4) blocks.push(<h4 key={index} className={`text-xl ${className}`}>{renderInline(heading[2])}</h4>);
      continue;
    }

    // GitHub-style table: header row, separator row, data rows
    if (line.includes("|") && index + 1 < lines.length && /^\|?[\s:|-]+\|[\s:|-]*$/.test(lines[index + 1].trim())) {
      const parseRow = (row: string) =>
        row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
      const header = parseRow(line);
      const rows: string[][] = [];
      let cursor = index + 2;
      while (cursor < lines.length && lines[cursor].includes("|") && lines[cursor].trim()) {
        rows.push(parseRow(lines[cursor]));
        cursor += 1;
      }
      index = cursor - 1;
      blocks.push(
        <div key={`table-${index}`} className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm md:text-base">
            <thead>
              <tr className="border-b-2 border-border">
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex} className="px-3 py-2 font-semibold">{renderInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border/50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2 align-top">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, "").trim());
        index += 1;
      }
      index -= 1;
      blocks.push(<ul key={`list-${index}`} className="my-5 list-disc space-y-2 pl-6">{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, "").trim());
        index += 1;
      }
      index -= 1;
      blocks.push(<ol key={`ordered-${index}`} className="my-5 list-decimal space-y-2 pl-6">{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ol>);
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push(<blockquote key={index} className="my-6 border-l-4 border-accent pl-5 italic text-muted-foreground">{renderInline(line.slice(2))}</blockquote>);
      continue;
    }

    blocks.push(<p key={index} className="my-5 leading-8 text-foreground/90">{renderInline(line)}</p>);
  }

  return <div className="text-base md:text-lg">{blocks}</div>;
}

