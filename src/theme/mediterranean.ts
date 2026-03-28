import { createTheme, MantineColorsTuple } from "@mantine/core";

// ── Color Palettes ──────────────────────────────────────────────────────────────

const copper: MantineColorsTuple = [
  "#FCF5EC", "#F5E3CC", "#EDCFA8", "#E3B880", "#D4A265",
  "#C68D4A", "#B87333", "#9A5E25", "#7D4A1A", "#5F3610",
];

const sand: MantineColorsTuple = [
  "#FAF8F5", "#F5F0EA", "#EDE5D8", "#E3D5C0", "#D4C4A8",
  "#C4B090", "#B49B78", "#8A7558", "#6A5840", "#4A3C28",
];

const sage: MantineColorsTuple = [
  "#EEF5E8", "#D2E8BF", "#B3D594", "#8FBD6A", "#6CA44A",
  "#538D35", "#4A7828", "#3A601C", "#2B4912", "#1C3209",
];

const sienna: MantineColorsTuple = [
  "#FDEEED", "#F9D0CC", "#F2ACA3", "#E8837A", "#DB5B52",
  "#CC3D35", "#B82D26", "#952320", "#721A17", "#50110F",
];

const sky: MantineColorsTuple = [
  "#F0F6FA", "#DDEDF5", "#C4DEEC", "#AACDE2", "#93BDD8",
  "#7DACCC", "#A8C4D4", "#6B96B5", "#537A96", "#3C5E78",
];

// ── Shared Constants ────────────────────────────────────────────────────────────

const COPPER_GRADIENT = "linear-gradient(135deg, #C68D4A 0%, #B87333 55%, #9A5E25 100%)";
const COPPER_GRADIENT_HOVER = "linear-gradient(135deg, #D4A265 0%, #C68D4A 55%, #B87333 100%)";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const GLASS = {
  backdropFilter: "blur(20px) saturate(1.4)",
  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
};

// ── Input Base (shared by TextInput, Select, DatePickerInput) ────────────────

const INPUT_BASE = {
  paddingInline: "16px",
  borderRadius: "999px",
  borderColor: "var(--med-color-input-border)",
  background: "var(--med-color-input-bg)",
  color: "var(--med-color-text-primary)",
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "1rem",
  "&:hover:not(:focus):not([data-invalid])": {
    borderColor: "rgba(184, 115, 51, 0.45)",
    background: "var(--med-color-input-bg-hover)",
  },
  "&:focus": {
    borderColor: "#B87333",
    boxShadow: "0 0 0 3px rgba(184, 115, 51, 0.14)",
    background: "var(--med-color-input-bg-focus)",
    outline: "none",
  },
  "&[data-invalid]": {
    borderColor: "rgba(184, 115, 51, 0.65)",
    boxShadow: "0 0 0 3px rgba(184, 115, 51, 0.10)",
    background: "var(--med-color-input-bg-hover)",
  },
  "&:disabled, &[data-disabled]": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

const INPUT_LABEL = {
  color: "var(--med-color-text-secondary)",
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "0.8125rem",
  fontWeight: "500",
  marginBottom: "5px",
};

const INPUT_DESCRIPTION = {
  color: "var(--med-color-text-muted)",
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "0.75rem",
  lineHeight: "1.4",
  marginTop: "5px",
};

const INPUT_ERROR = {
  color: "#B87333",
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "0.75rem",
  lineHeight: "1.4",
  marginTop: "5px",
};

const INPUT_STYLES = {
  label: INPUT_LABEL,
  input: { ...INPUT_BASE, height: "44px" },
  description: INPUT_DESCRIPTION,
  error: INPUT_ERROR,
};

const DROPDOWN_STYLES = {
  dropdown: {
    background: "var(--med-color-dropdown-bg)",
    ...GLASS,
    border: "1px solid var(--med-color-border)",
    boxShadow: "var(--med-shadow-lg)",
    borderRadius: "20px",
    padding: "4px",
  },
  option: {
    borderRadius: "12px",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "1rem",
    color: "var(--med-color-text-primary)",
    padding: "8px 14px",
    "&[data-combobox-selected]": {
      background: "var(--med-color-row-hover)",
    },
    "&[data-combobox-active]": {
      background: "rgba(184, 115, 51, 0.13)",
      color: "#B87333",
      fontWeight: "500",
    },
    "&:hover:not([data-combobox-active])": {
      background: "var(--med-color-row-hover)",
    },
    "& .mantine-Combobox-optionCheckIcon": {
      color: "#B87333",
      width: "14px",
      height: "14px",
    },
  },
  empty: {
    color: "var(--med-color-text-muted)",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.875rem",
    padding: "12px",
  },
  group: { fontFamily: '"DM Sans", sans-serif' },
  groupLabel: {
    color: "var(--med-color-text-muted)",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.6875rem",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    padding: "6px 14px 2px",
  },
};

// ── Theme ───────────────────────────────────────────────────────────────────────

export const mediterraneanTheme = createTheme({
  // ── Palette ──────────────────────────────────────────────────────────────
  primaryColor: "copper",
  primaryShade: 6,
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
      h1: { fontSize: "3rem",     lineHeight: "1.15", fontWeight: "600" },
      h2: { fontSize: "2.25rem",  lineHeight: "1.2",  fontWeight: "600" },
      h3: { fontSize: "1.75rem",  lineHeight: "1.25", fontWeight: "600" },
      h4: { fontSize: "1.375rem", lineHeight: "1.35", fontWeight: "600" },
      h5: { fontSize: "1.125rem", lineHeight: "1.4",  fontWeight: "600" },
      h6: { fontSize: "1rem",     lineHeight: "1.5",  fontWeight: "600" },
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

  // ── Design tokens via theme.other ─────────────────────────────────────────
  other: {
    easing: {
      spring: SPRING,
      ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },

  // ── Component Defaults & Styles ───────────────────────────────────────────
  components: {
    Button: {
      defaultProps: { radius: "xl", size: "md" },
      styles: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: "500",
          letterSpacing: "0.01em",
          transition:
            `transform 200ms ${SPRING}, box-shadow 200ms ease, background 150ms ease`,
          "&:focus-visible": {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(184, 115, 51, 0.35)",
          },
          "&:active:not([data-disabled])": {
            transform: "scale(0.97)",
          },
          /* Copper filled variant — the default primary look */
          "&[data-variant='filled'][data-color='copper']": {
            background: COPPER_GRADIENT,
            border: "none",
            boxShadow: "0 2px 8px rgba(120, 80, 40, 0.25)",
          },
          "&[data-variant='filled'][data-color='copper']:hover:not([data-disabled])": {
            background: COPPER_GRADIENT_HOVER,
            transform: "translateY(-1px)",
            boxShadow: "0 4px 14px rgba(120, 80, 40, 0.32)",
          },
        },
        inner: { overflow: "hidden", minWidth: 0 },
        label: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
      },
    },

    ActionIcon: {
      defaultProps: { radius: "xl", variant: "outline", color: "copper" },
      styles: {
        root: {
          transition: `transform 200ms ${SPRING}, box-shadow 200ms ease`,
          "&:focus-visible": {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(184, 115, 51, 0.35)",
          },
          "&:active:not([data-disabled])": {
            transform: "scale(0.94)",
          },
          "&[data-variant='filled'][data-color='copper']": {
            background: COPPER_GRADIENT,
            border: "none",
            boxShadow: "0 2px 6px rgba(120, 80, 40, 0.25)",
          },
          "&[data-variant='filled'][data-color='copper']:hover:not([data-disabled])": {
            background: COPPER_GRADIENT_HOVER,
            boxShadow: "0 3px 10px rgba(120, 80, 40, 0.30)",
          },
        },
      },
    },

    Badge: {
      defaultProps: { radius: "xl", variant: "light" },
      styles: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          letterSpacing: "0.025em",
        },
      },
    },

    Card: {
      defaultProps: { radius: "lg", shadow: "md" },
      styles: {
        root: {
          background: "var(--med-color-surface)",
          ...GLASS,
          border: "1px solid var(--med-color-border)",
          boxShadow: "var(--med-shadow-md), inset 0 1px 0 var(--med-color-card-shimmer)",
          overflow: "hidden",
        },
      },
    },

    TextInput: {
      defaultProps: {
        radius: "xl",
        size: "md",
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
      styles: INPUT_STYLES,
    },

    Select: {
      defaultProps: {
        radius: "xl",
        size: "md",
        checkIconPosition: "right",
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
      styles: {
        ...INPUT_STYLES,
        ...DROPDOWN_STYLES,
        input: {
          ...INPUT_BASE,
          height: "44px",
          paddingRight: "36px",
          cursor: "default",
        },
        section: { color: "#A89880" },
      },
    },

    DatePickerInput: {
      defaultProps: {
        radius: "xl",
        size: "md",
        valueFormat: "D MMM YYYY",
        inputWrapperOrder: ["label", "input", "description", "error"],
      },
      styles: {
        ...INPUT_STYLES,
        ...DROPDOWN_STYLES,
        input: {
          ...INPUT_BASE,
          height: "44px",
          paddingRight: "36px",
          cursor: "default",
        },
        section: { color: "#A89880" },
        calendarHeader: { marginBottom: "8px" },
        calendarHeaderControl: {
          borderRadius: "8px",
          color: "#7A6850",
          "&:hover": { background: "rgba(180, 155, 120, 0.16)", color: "#2A2118" },
        },
        calendarHeaderLevel: {
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "1rem",
          fontWeight: "400",
          color: "#2A2118",
          borderRadius: "8px",
          "&:hover": { background: "rgba(180, 155, 120, 0.12)" },
        },
        weekday: {
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.6875rem",
          fontWeight: "600",
          letterSpacing: "0.06em",
          color: "#A89880",
          textTransform: "uppercase" as const,
        },
        day: {
          borderRadius: "8px",
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.875rem",
          color: "#2A2118",
          "&[data-selected]": {
            background: "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
            color: "#FAF8F5",
            fontWeight: "600",
          },
          "&[data-today]:not([data-selected])": {
            border: "1.5px solid rgba(184, 115, 51, 0.6)",
            color: "#B87333",
            fontWeight: "600",
          },
          "&[data-in-range]": { background: "rgba(184, 115, 51, 0.09)", borderRadius: "0" },
          "&[data-first-in-range]": { borderRadius: "8px 0 0 8px" },
          "&[data-last-in-range]": { borderRadius: "0 8px 8px 0" },
          "&:hover:not([data-selected]):not([data-disabled])": {
            background: "rgba(180, 155, 120, 0.15)",
          },
          "&[data-disabled]": { opacity: "0.35" },
        },
        monthsListControl: {
          borderRadius: "8px",
          fontFamily: '"DM Sans", sans-serif',
          color: "#2A2118",
          "&[data-selected]": {
            background: "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
            color: "#FAF8F5",
          },
          "&:hover:not([data-selected])": { background: "rgba(180, 155, 120, 0.15)" },
        },
        yearsListControl: {
          borderRadius: "8px",
          fontFamily: '"DM Sans", sans-serif',
          color: "#2A2118",
          "&[data-selected]": {
            background: "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
            color: "#FAF8F5",
          },
          "&:hover:not([data-selected])": { background: "rgba(180, 155, 120, 0.15)" },
        },
      },
    },

    Modal: {
      defaultProps: {
        radius: "lg",
        centered: true,
        overlayProps: { backgroundOpacity: 0.28, blur: 6, color: "#2A2118" },
        transitionProps: {
          transition: "slide-up",
          duration: 300,
          timingFunction: SPRING,
          exitDuration: 160,
        },
        classNames: { inner: "med-modal-inner", content: "med-modal-content" },
      },
      styles: {
        content: {
          background: "rgba(255, 250, 244, 0.90)",
          backdropFilter: "blur(24px) saturate(1.5)",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          border: "1px solid rgba(180, 155, 120, 0.30)",
          boxShadow:
            "0 8px 48px rgba(120, 80, 40, 0.18), " +
            "0 2px 8px rgba(120, 80, 40, 0.10), " +
            "inset 0 1px 0 rgba(255, 245, 230, 0.60)",
          borderRadius: "20px",
        },
        header: { background: "transparent", paddingBottom: "2px" },
        title: {
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "1.25rem",
          fontWeight: "400",
          lineHeight: "1.1",
          color: "#2A2118",
          letterSpacing: "0.01em",
        },
        close: {
          color: "#7A6850",
          borderRadius: "50%",
          "&:hover": {
            background: "rgba(180, 155, 120, 0.16)",
            color: "#2A2118",
          },
        },
        body: { paddingTop: "4px" },
        inner: { padding: "16px" },
      },
    },

    SegmentedControl: {
      styles: {
        root: {
          background: "var(--med-color-surface-deep)",
          border: "1px solid var(--med-color-border)",
          borderRadius: "999px",
          padding: "3px",
          gap: "1px",
        },
        indicator: {
          background: COPPER_GRADIENT,
          borderRadius: "999px",
          boxShadow: "0 2px 8px rgba(120, 80, 40, 0.28), inset 0 1px 0 rgba(255, 230, 180, 0.22)",
          border: "none",
        },
        label: {
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "var(--med-color-text-secondary)",
          padding: "5px 16px",
          borderRadius: "999px",
          transition: "color 200ms ease",
          "&[data-active]": { color: "#FFFFFF" },
        },
        input: { display: "none" },
      },
    },
  },
});
