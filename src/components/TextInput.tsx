import { useState, useId } from "react";
import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import { medInputStyles } from "@/theme/inputStyles";

// ─── Floating-label TextInput ────────────────────────────────────────────────
// Uses Mantine TextInput as the base (semantics, a11y, error/description slots).
// The floating label is injected via Mantine's `inputContainer` prop so it
// sits *inside* the input wrapper — unaffected by hint/error text below.
// React state drives the float so no CSS sibling-selector tricks are needed.

const INPUT_HEIGHT = 48; // px — keep in sync with medInputStyles.input.height
const LABEL_HEIGHT = 16; // approximate rendered height of the label text
const LABEL_RESTING_TOP = Math.round((INPUT_HEIGHT - LABEL_HEIGHT) / 2); // ~16px
const LABEL_FLOAT_TOP = 6;

export interface TextInputProps
  extends Omit<MantineTextInputProps, "label" | "size"> {
  label?: string;
  hint?: string;
}

export function TextInput({
  label,
  hint,
  error,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled,
  id: idProp,
  style,
  ...rest
}: TextInputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const currentValue = value !== undefined ? value : internalValue;
  const isFloating = isFocused || String(currentValue).length > 0;

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    left: "14px",
    top: isFloating ? `${LABEL_FLOAT_TOP}px` : `${LABEL_RESTING_TOP}px`,
    pointerEvents: "none",
    transformOrigin: "left top",
    transform: isFloating ? "scale(0.775)" : "scale(1)",
    fontSize: "0.9375rem",
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: isFocused ? 500 : 400,
    color: error
      ? "#B87333"
      : isFocused
        ? "#B87333"
        : isFloating
          ? "#7A6850"
          : "#A89880",
    transition:
      "top 180ms cubic-bezier(0.34, 1.56, 0.64, 1), " +
      "transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1), " +
      "color 160ms ease",
    userSelect: "none",
  };

  return (
    <MantineTextInput
      id={id}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      placeholder=" "
      // Suppress Mantine's own label — we render ours inside inputContainer
      label={undefined}
      description={hint}
      error={error}
      inputContainer={(inputEl) => (
        <div style={{ position: "relative" }}>
          {inputEl}
          {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
        </div>
      )}
      styles={{
        ...medInputStyles,
        input: {
          ...medInputStyles.input,
          paddingTop: "16px",
          paddingBottom: "4px",
          borderColor: error
            ? "rgba(184, 115, 51, 0.7)"
            : isFocused
              ? "#B87333"
              : "rgba(180, 155, 120, 0.35)",
          boxShadow:
            isFocused || error
              ? `inset 0 0 0 1px rgba(184, 115, 51, ${error ? "0.4" : "0.3"}), 0 0 0 3px rgba(184, 115, 51, 0.10)`
              : undefined,
          background: isFocused
            ? "rgba(255, 250, 244, 0.90)"
            : "rgba(255, 250, 244, 0.60)",
        },
      }}
      style={style}
      onChange={(e) => {
        if (value === undefined) setInternalValue(e.target.value);
        onChange?.(e);
      }}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      {...rest}
    />
  );
}
