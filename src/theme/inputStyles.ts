/**
 * Shared Mediterranean input styles object.
 * Used by TextInput, Select, and DatePickerInput.
 */
export const medInputStyles = {
  input: {
    height: "48px",
    paddingInline: "14px",
    borderRadius: "12px",
    borderColor: "rgba(180, 155, 120, 0.35)",
    background: "rgba(255, 250, 244, 0.60)",
    color: "#2A2118",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.9375rem",
    "&:hover": {
      borderColor: "rgba(184, 115, 51, 0.45)",
      background: "rgba(255, 250, 244, 0.80)",
    },
    "&:focus": {
      borderColor: "#B87333",
      boxShadow:
        "inset 0 0 0 1px rgba(184, 115, 51, 0.3), 0 0 0 3px rgba(184, 115, 51, 0.10)",
    },
  },
  label: {
    color: "#7A6850",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.8125rem",
    fontWeight: 500,
    marginBottom: "6px",
  },
  error: {
    color: "#B87333",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.75rem",
    marginTop: "4px",
  },
  description: {
    color: "#7A6850",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.75rem",
    marginTop: "4px",
  },
} as const;

/** Warm glass dropdown panel — shared by Select and DatePickerInput. */
export const medDropdownStyles = {
  dropdown: {
    background: "rgba(255, 250, 244, 0.94)",
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
    "&[data-combobox-selected]": {
      background: "rgba(184, 115, 51, 0.14)",
      color: "#B87333",
    },
    "&[data-combobox-active]": {
      background: "rgba(184, 115, 51, 0.14)",
      color: "#B87333",
    },
    "&:hover": {
      background: "rgba(180, 155, 120, 0.14)",
    },
  },
  empty: {
    color: "#A89880",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "0.875rem",
  },
} as const;
