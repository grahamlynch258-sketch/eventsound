import React from "react";
import { useSiteContent } from "./useSiteContent";

/**
 * Hook to get a content value with alignment for a specific page/section/key.
 * Returns { text, align, className } for easy use in components.
 */
export function useDynamicText(page: string, section: string) {
  const { data, isLoading } = useSiteContent(page, section);

  function getText(key: string, fallback: string): string {
    if (data?.values && key in data.values) {
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

  function getFontWeight(key: string): string {
    return data?.fontWeights[key] || "normal";
  }

  function getFontFamily(key: string): string {
    return data?.fontFamilies[key] || "";
  }

  function getBgColor(key: string): string {
    return data?.bgColors[key] || "";
  }

  function getBgOpacity(key: string): number {
    return data?.bgOpacities[key] != null ? data.bgOpacities[key] : 1;
  }

  function getOffsetX(key: string): number {
    return data?.offsetsX[key] || 0;
  }

  function getOffsetY(key: string): number {
    return data?.offsetsY[key] || 0;
  }

  function getStyle(key: string): React.CSSProperties {
    const style: React.CSSProperties = {
      textAlign: getAlign(key) as any,
      fontSize: `${getFontSize(key)}px`,
      color: getFontColor(key),
      fontWeight: getFontWeight(key),
    };
    const family = getFontFamily(key);
    if (family) {
      style.fontFamily = family;
    }
    const x = getOffsetX(key);
    const y = getOffsetY(key);
    if (x || y) {
      style.transform = `translate(${x}px, ${y}px)`;
    }
    // Apply background color behind text
    const bgColor = getBgColor(key);
    if (bgColor) {
      const opacity = getBgOpacity(key);
      const r = parseInt(bgColor.slice(1, 3), 16);
      const g = parseInt(bgColor.slice(3, 5), 16);
      const b = parseInt(bgColor.slice(5, 7), 16);
      style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      style.padding = '0.25em 0.5em';
      style.borderRadius = '4px';
      style.display = 'inline-block';
    }
    return style;
  }

  function getBoxStyle(key: string): React.CSSProperties {
    const color = getBgColor(key);
    const opacity = getBgOpacity(key);
    if (!color) return {};
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return { backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})` };
  }

  return { getText, getAlign, getAlignClass, getFontSize, getFontColor, getFontWeight, getFontFamily, getBgColor, getBgOpacity, getOffsetX, getOffsetY, getStyle, getBoxStyle, isLoading };
}
