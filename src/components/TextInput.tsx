import { useState, useId, type InputHTMLAttributes } from "react";
import { styled } from "@alex.radulescu/styled-static";

// ─── Floating-label TextInput ────────────────────────────────────────────────
// The label starts centered inside the input (like a placeholder).
// On focus OR when the input has a value it translates up and scales down.
// Implemented with React state to avoid CSS sibling-selector limitations.

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  width: 100%;
  height: 52px;
  padding: 18px 16px 6px;
  background: rgba(255, 250, 244, 0.60);
  border: 1.5px solid rgba(180, 155, 120, 0.35);
  border-radius: 12px;
  color: #2A2118;
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;

  &::placeholder {
    color: transparent;
  }

  &:hover {
    border-color: rgba(184, 115, 51, 0.45);
    background: rgba(255, 250, 244, 0.80);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 16px;
  pointer-events: none;
  font-family: "DM Sans", sans-serif;
  transform-origin: left top;
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
              color 200ms ease,
              font-size 200ms ease;
`;

const HintText = styled.p`
  margin-top: 6px;
  padding-left: 4px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: #7A6850;
`;

const ErrorText = styled.p`
  margin-top: 6px;
  padding-left: 4px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: #B87333;
`;

// ─── Public API ───────────────────────────────────────────────────────────────

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
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
  ...rest
}: TextInputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  // For controlled inputs, use the value prop; otherwise track internally
  const currentValue = value !== undefined ? value : internalValue;
  const isFloating = isFocused || String(currentValue).length > 0;

  const labelStyle: React.CSSProperties = {
    top: isFloating ? "8px" : "50%",
    transform: isFloating ? "translateY(0) scale(0.775)" : "translateY(-50%)",
    fontSize: isFloating ? "0.6875rem" : "0.9375rem",
    color: error
      ? "#B87333"
      : isFocused
        ? "#B87333"
        : isFloating
          ? "#7A6850"
          : "#A89880",
    fontWeight: isFocused ? 500 : 400,
  };

  const inputStyle: React.CSSProperties = {
    borderColor: error
      ? "rgba(184, 115, 51, 0.7)"
      : isFocused
        ? "#B87333"
        : undefined,
    boxShadow: error
      ? "inset 0 0 0 1px rgba(184, 115, 51, 0.4), 0 0 0 3px rgba(184, 115, 51, 0.10)"
      : isFocused
        ? "inset 0 0 0 1px rgba(184, 115, 51, 0.3), 0 0 0 3px rgba(184, 115, 51, 0.10)"
        : undefined,
    background: isFocused
      ? "rgba(255, 250, 244, 0.90)"
      : undefined,
  };

  return (
    <Wrapper>
      <InputField
        id={id}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder=" "
        style={inputStyle}
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
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : error ? `${id}-error` : undefined}
        {...rest}
      />
      {label && (
        <FloatingLabel htmlFor={id} style={labelStyle}>
          {label}
        </FloatingLabel>
      )}
      {error && <ErrorText id={`${id}-error`} role="alert">{error}</ErrorText>}
      {hint && !error && <HintText id={`${id}-hint`}>{hint}</HintText>}
    </Wrapper>
  );
}
