/**
 * Shared Mediterranean input styles.
 * Used by TextInput, Select, and DatePickerInput.
 *
 * - borderRadius: fully pill-shaped (999px)
 * - fontSize: always 1rem (16px) — prevents iOS Safari zoom-on-focus
 * - All colors use CSS custom properties for automatic dark/light mode
 */

const BASE_INPUT = {
  paddingInline: "16px",
  borderRadius: "999px",
  borderColor: "var(--med-color-input-border)",
  background: "var(--med-color-input-bg)",
  color: "var(--med-color-text-primary)",
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "1rem",          // 16px — iOS won't zoom if >= 16px
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

export const medInputStyles = {
  label: {
    color: "var(--med-color-text-secondary)",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.8125rem",
    fontWeight: "500",
    marginBottom: "5px",
  },
  input: {
    ...BASE_INPUT,
    height: "44px",
  },
  description: {
    color: "var(--med-color-text-muted)",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.75rem",
    lineHeight: "1.4",
    marginTop: "5px",
  },
  error: {
    color: "#B87333",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.75rem",
    lineHeight: "1.4",
    marginTop: "5px",
  },
};

/** Compact variant — smaller height, same 16px font (no iOS zoom). */
export const medCompactInputStyles = {
  ...medInputStyles,
  input: {
    ...BASE_INPUT,
    height: "36px",
    paddingInline: "14px",
  },
};

/** Warm glass dropdown — shared by Select and DatePickerInput. */
export const medDropdownStyles = {
  dropdown: {
    background: "var(--med-color-dropdown-bg)",
    backdropFilter: "blur(20px) saturate(1.4)",
    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
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
      background: "rgba(184, 115, 51, 0.14)",
      color: "#B87333",
    },
    "&[data-combobox-active]": {
      background: "rgba(184, 115, 51, 0.10)",
      color: "#9A5E25",
    },
    "&:hover:not([data-combobox-selected])": {
      background: "var(--med-color-row-hover)",
    },
  },
  empty: {
    color: "var(--med-color-text-muted)",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.875rem",
    padding: "12px",
  },
  group: {
    fontFamily: '"DM Sans", sans-serif',
  },
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

export const medInputWrapperOrder: ("label" | "input" | "description" | "error")[] = [
  "label",
  "input",
  "description",
  "error",
];
