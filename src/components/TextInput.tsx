import { useState, useId, type InputHTMLAttributes } from "react";
import { styled } from "@alex.radulescu/styled-static";

// ─── Floating-label TextInput ────────────────────────────────────────────────
// The label starts vertically centred inside the input (like a placeholder).
// On focus OR when the input has a value it translates to the top-left and
// shrinks to a small caption above the typed text.
//
// Key fix: FloatingLabel is absolutely positioned inside InputContainer,
// which wraps *only* the input element — so top/height calculations are
// never polluted by hint / error text that lives outside.

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// The label is positioned relative to this container only
const InputContainer = styled.div`
  position: relative;
`;

const INPUT_HEIGHT = 48; // px — keep in sync with CSS below

const InputField = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px 14px 4px;
  background: rgba(255, 250, 244, 0.60);
  border: 1.5px solid rgba(180, 155, 120, 0.35);
  border-radius: 12px;
  color: #2A2118;
  font-family: "DM Sans", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.4;
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

// Resting: vertically centred inside the input
// Floating: pinned near the top, scaled down to caption size
const FloatingLabel = styled.label`
  position: absolute;
  left: 14px;
  pointer-events: none;
  font-family: "DM Sans", sans-serif;
  transform-origin: left top;
  transition: top 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
              color 160ms ease,
              font-size 160ms ease;
`;

const HintText = styled.p`
  padding-left: 4px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  line-height: 1.4;
  color: #7A6850;
`;

const ErrorText = styled.p`
  padding-left: 4px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
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

const LABEL_HEIGHT = 16; // approximate px height of label text
const LABEL_RESTING_TOP = (INPUT_HEIGHT - LABEL_HEIGHT) / 2; // ~16px, centred
const LABEL_FLOAT_TOP = 6; // px from top when floating

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

  const currentValue = value !== undefined ? value : internalValue;
  const isFloating = isFocused || String(currentValue).length > 0;

  const labelStyle: React.CSSProperties = {
    top: isFloating ? `${LABEL_FLOAT_TOP}px` : `${LABEL_RESTING_TOP}px`,
    transform: isFloating ? "scale(0.75)" : "scale(1)",
    fontSize: "0.9375rem",
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
    background: isFocused ? "rgba(255, 250, 244, 0.90)" : undefined,
  };

  return (
    <Wrapper>
      <InputContainer>
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
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...rest}
        />
        {label && (
          <FloatingLabel htmlFor={id} style={labelStyle}>
            {label}
          </FloatingLabel>
        )}
      </InputContainer>
      {error && (
        <ErrorText id={`${id}-error`} role="alert">
          {error}
        </ErrorText>
      )}
      {hint && !error && <HintText id={`${id}-hint`}>{hint}</HintText>}
    </Wrapper>
  );
}
