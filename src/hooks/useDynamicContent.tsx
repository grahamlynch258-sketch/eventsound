import React from "react";
import { useSiteContent } from "./useSiteContent";

/**
 * Returns relative luminance of an RGB color (0 = darkest, 1 = lightest).
 */
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

/**
 * Given a background color hex + opacity, return a text color that ensures readability.
 * If the user's chosen text color already has good contrast, use it.
 * Otherwise, pick white or black for best contrast.
 */
function ensureReadableColor(textColor: string, bgColor: string, bgOpacity: number): string {
  if (!bgColor || bgOpacity < 0.3) return textColor; // bg too transparent to matter
  const [br, bg, bb] = hexToRgb(bgColor);
  const bgLum = luminance(br, bg, bb);
  const [tr, tg, tb] = hexToRgb(textColor);
  const textLum = luminance(tr, tg, tb);

  // WCAG contrast ratio
  const lighter = Math.max(bgLum, textLum);
  const darker = Math.min(bgLum, textLum);
  const contrast = (lighter + 0.05) / (darker + 0.05);

  if (contrast >= 3) return textColor; // acceptable contrast
  // Pick white or black based on bg luminance
  return bgLum > 0.5 ? "#000000" : "#ffffff";
}

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
    return data?.fontColors[key] || "";
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
      fontWeight: getFontWeight(key),
      position: 'relative',
      zIndex: 1,
    };

    const textColor = getFontColor(key);
    const bgColor = getBgColor(key);
    const bgOpacity = getBgOpacity(key);

    // Only set color if the user explicitly chose one
    if (textColor) {
      if (bgColor) {
        style.color = ensureReadableColor(textColor, bgColor, bgOpacity);
      } else {
        style.color = textColor;
      }
    }

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
    if (bgColor) {
      const [r, g, b] = hexToRgb(bgColor);
      style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${bgOpacity})`;
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
    const [r, g, b] = hexToRgb(color);
    return { backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})` };
  }

  return { getText, getAlign, getAlignClass, getFontSize, getFontColor, getFontWeight, getFontFamily, getBgColor, getBgOpacity, getOffsetX, getOffsetY, getStyle, getBoxStyle, isLoading };
}
