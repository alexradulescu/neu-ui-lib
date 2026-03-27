import { createTheme, MantineColorsTuple } from "@mantine/core";

// Mediterranean Copper — #B87333 at index 6
const copper: MantineColorsTuple = [
  "#FCF5EC",
  "#F5E3CC",
  "#EDCFA8",
  "#E3B880",
  "#D4A265",
  "#C68D4A",
  "#B87333",
  "#9A5E25",
  "#7D4A1A",
  "#5F3610",
];

// Mediterranean Sand — warm stone scale
const sand: MantineColorsTuple = [
  "#FAF8F5",
  "#F5F0EA",
  "#EDE5D8",
  "#E3D5C0",
  "#D4C4A8",
  "#C4B090",
  "#B49B78",
  "#8A7558",
  "#6A5840",
  "#4A3C28",
];

// Mediterranean Sage — olive grove green, positive actions (#4A7828 at index 6)
const sage: MantineColorsTuple = [
  "#EEF5E8",
  "#D2E8BF",
  "#B3D594",
  "#8FBD6A",
  "#6CA44A",
  "#538D35",
  "#4A7828",
  "#3A601C",
  "#2B4912",
  "#1C3209",
];

// Mediterranean Sienna — Pompeii warm red, destructive actions (#B82D26 at index 6)
const sienna: MantineColorsTuple = [
  "#FDEEED",
  "#F9D0CC",
  "#F2ACA3",
  "#E8837A",
  "#DB5B52",
  "#CC3D35",
  "#B82D26",
  "#952320",
  "#721A17",
  "#50110F",
];

// Coastal Sky — used sparingly
const sky: MantineColorsTuple = [
  "#F0F6FA",
  "#DDEDF5",
  "#C4DEEC",
  "#AACDE2",
  "#93BDD8",
  "#7DACCC",
  "#A8C4D4",
  "#6B96B5",
  "#537A96",
  "#3C5E78",
];

export const mediterraneanTheme = createTheme({
  // ── Palette ──────────────────────────────────────────────────────────────
  primaryColor: "copper",
  primaryShade: 6,

  // Warm parchment white / dark espresso black — used by Mantine's contrast logic
  white: "#FAF8F5",
  black: "#2A2118",

  colors: { copper, sand, sky, sage, sienna },

  // ── Typography ───────────────────────────────────────────────────────────
  fontFamily:
    '"DM Sans", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  fontFamilyMonospace:
    '"JetBrains Mono", "SF Mono", SFMono-Regular, ui-monospace, monospace',

  headings: {
    fontFamily: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
    fontWeight: "600",
    sizes: {
      h1: { fontSize: "3rem",    lineHeight: "1.15", fontWeight: "600" },
      h2: { fontSize: "2.25rem", lineHeight: "1.2",  fontWeight: "600" },
      h3: { fontSize: "1.75rem", lineHeight: "1.25", fontWeight: "600" },
      h4: { fontSize: "1.375rem",lineHeight: "1.35", fontWeight: "600" },
      h5: { fontSize: "1.125rem",lineHeight: "1.4",  fontWeight: "600" },
      h6: { fontSize: "1rem",    lineHeight: "1.5",  fontWeight: "600" },
    },
  },

  fontSizes: {
    xs: "0.6875rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },

  lineHeights: {
    xs: "1.4",
    sm: "1.55",
    md: "1.7",
    lg: "1.75",
    xl: "1.8",
  },

  // ── Shape ────────────────────────────────────────────────────────────────
  defaultRadius: "md",

  radius: {
    xs: "6px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },

  // ── Spacing (8px base grid) ───────────────────────────────────────────────
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  // ── Shadows (warm-tinted, not cool grey) ─────────────────────────────────
  shadows: {
    xs: "0 2px 8px rgba(120, 80, 40, 0.06)",
    sm: "0 4px 16px rgba(120, 80, 40, 0.08)",
    md: "0 4px 32px rgba(120, 80, 40, 0.10)",
    lg: "0 8px 48px rgba(120, 80, 40, 0.14)",
    xl: "0 16px 64px rgba(120, 80, 40, 0.18)",
  },

  // ── Design tokens exposed via theme.other ─────────────────────────────────
  other: {
    // Raw color values for use in inline styles / components
    colors: {
      background: "#F5F0EA",
      surfaceGlass: "rgba(255, 250, 244, 0.72)",
      surfaceDeep: "#EDE5D8",
      borderWarm: "rgba(180, 155, 120, 0.25)",
      textPrimary: "#2A2118",
      textSecondary: "#7A6850",
      accent: "#B87333",
      accentSoft: "#D4A882",
      sky: "#A8C4D4",
    },
    // Motion
    easing: {
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },

  // ── Component defaults ────────────────────────────────────────────────────
  components: {
    Button: {
      defaultProps: {
        radius: "lg",
        size: "md",
      },
    },
    Badge: {
      defaultProps: {
        radius: "xl",
        variant: "light",
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "md",
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
        overlayProps: {
          backgroundOpacity: 0.25,
          blur: 4,
        },
        transitionProps: {
          transition: "slide-up",
          duration: 320,
        },
        centered: true,
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
    },
  },
});
