/**
 * Shared Mediterranean input styles.
 * Used by TextInput, Select, and DatePickerInput.
 *
 * Uses CSS custom properties so styles auto-adapt to dark/light mode.
 */

export const medInputStyles = {
  label: {
    color: "var(--med-color-text-secondary)",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.8125rem",
    fontWeight: "500",
    marginBottom: "5px",
  },
  input: {
    height: "44px",
    paddingInline: "14px",
    borderRadius: "12px",
    borderColor: "var(--med-color-input-border)",
    background: "var(--med-color-input-bg)",
    color: "var(--med-color-text-primary)",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.9375rem",
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

/** Warm glass dropdown — shared by Select and DatePickerInput. */
export const medDropdownStyles = {
  dropdown: {
    background: "var(--med-color-dropdown-bg)",
    backdropFilter: "blur(20px) saturate(1.4)",
    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
    border: "1px solid var(--med-color-border)",
    boxShadow: "var(--med-shadow-lg)",
    borderRadius: "12px",
    padding: "4px",
  },
  option: {
    borderRadius: "8px",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.9375rem",
    color: "var(--med-color-text-primary)",
    padding: "8px 12px",
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
    padding: "6px 12px 2px",
  },
};

/**
 * Put description BELOW the input field.
 */
export const medInputWrapperOrder: ("label" | "input" | "description" | "error")[] = [
  "label",
  "input",
  "description",
  "error",
];
