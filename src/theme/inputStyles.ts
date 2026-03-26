/**
 * Shared Mediterranean input styles.
 * Used by TextInput, Select, and DatePickerInput.
 *
 * Note: no `as const` — keeps types wide enough for Mantine's StylesApiProps.
 */

export const medInputStyles = {
  label: {
    color: "#7A6850",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.8125rem",
    fontWeight: "500",
    marginBottom: "5px",
  },
  input: {
    height: "44px",
    paddingInline: "14px",
    borderRadius: "12px",
    // Warm sand border — overridden by Mantine's data attributes below
    borderColor: "rgba(180, 155, 120, 0.40)",
    background: "rgba(255, 250, 244, 0.65)",
    color: "#2A2118",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.9375rem",
    // Hover
    "&:hover:not(:focus):not([data-invalid])": {
      borderColor: "rgba(184, 115, 51, 0.45)",
      background: "rgba(255, 250, 244, 0.85)",
    },
    // Focus — warm copper inset glow, no blue outline ring
    "&:focus": {
      borderColor: "#B87333",
      boxShadow: "0 0 0 3px rgba(184, 115, 51, 0.14)",
      background: "rgba(255, 250, 244, 0.95)",
      outline: "none",
    },
    // Error state — Mantine sets data-invalid on the input element
    "&[data-invalid]": {
      borderColor: "rgba(184, 115, 51, 0.65)",
      boxShadow: "0 0 0 3px rgba(184, 115, 51, 0.10)",
      background: "rgba(255, 250, 244, 0.85)",
    },
    // Disabled
    "&:disabled, &[data-disabled]": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  description: {
    color: "#A89880",
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
    background: "rgba(255, 250, 244, 0.96)",
    backdropFilter: "blur(20px) saturate(1.4)",
    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
    border: "1px solid rgba(180, 155, 120, 0.30)",
    boxShadow: "0 8px 32px rgba(120, 80, 40, 0.12)",
    borderRadius: "12px",
    padding: "4px",
  },
  option: {
    borderRadius: "8px",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.9375rem",
    color: "#2A2118",
    padding: "8px 12px",
    // Mantine uses data-combobox-selected for the currently selected value
    "&[data-combobox-selected]": {
      background: "rgba(184, 115, 51, 0.14)",
      color: "#B87333",
    },
    // data-combobox-active is the keyboard-highlighted option
    "&[data-combobox-active]": {
      background: "rgba(184, 115, 51, 0.10)",
      color: "#9A5E25",
    },
    "&:hover:not([data-combobox-selected])": {
      background: "rgba(180, 155, 120, 0.13)",
    },
  },
  empty: {
    color: "#A89880",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.875rem",
    padding: "12px",
  },
  group: {
    fontFamily: '"DM Sans", sans-serif',
  },
  groupLabel: {
    color: "#A89880",
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
 * Mantine's default order is ['label', 'description', 'input', 'error']
 * which renders description above the input.
 */
export const medInputWrapperOrder: ("label" | "input" | "description" | "error")[] = [
  "label",
  "input",
  "description",
  "error",
];
