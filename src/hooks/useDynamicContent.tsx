import React from "react";
import { useSiteContent } from "./useSiteContent";

/**
 * Hook to get a content value with alignment for a specific page/section/key.
 * Returns { text, align, className } for easy use in components.
 */
export function useDynamicText(page: string, section: string) {
  const { data, isLoading } = useSiteContent(page, section);

  function getText(key: string, fallback: string): string {
    if (data?.values && key in data.values && data.values[key] !== "") {
      return data.values[key];
    }
    return fallback;
  }

  function getAlign(key: string): string {
    return data?.alignments[key] || "left";
  }

  function getAlignClass(key: string): string {
    const a = getAlign(key);
    if (a === "center") return "text-center mx-auto";
    if (a === "right") return "text-right ml-auto";
    return "text-left";
  }

  function getFontSize(key: string): number {
    return data?.fontSizes[key] || 16;
  }

  function getFontColor(key: string): string {
    return data?.fontColors[key] || "#000000";
  }

  function getStyle(key: string): React.CSSProperties {
    return {
      textAlign: getAlign(key) as any,
      fontSize: `${getFontSize(key)}px`,
      color: getFontColor(key),
    };
  }

  return { getText, getAlign, getAlignClass, getFontSize, getFontColor, getStyle, isLoading };
}
