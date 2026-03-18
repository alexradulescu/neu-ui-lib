import { styled } from "@alex.radulescu/styled-static";
import React, { useId, useState } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--neu-space-xs);
  width: 100%;
`;

const Label = styled.label`
  font-family: var(--neu-font-sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--neu-color-text-secondary);
  padding: 0 var(--neu-space-sm);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: var(--neu-radius-xl);
  border: 1px solid var(--neu-glass-border);
  background: var(--neu-glass-bg);
  backdrop-filter: blur(var(--neu-glass-blur)) saturate(var(--neu-glass-saturate));
  -webkit-backdrop-filter: blur(var(--neu-glass-blur)) saturate(var(--neu-glass-saturate));
  box-shadow: var(--neu-glass-shadow-sm), inset 0 1px 0 var(--neu-glass-highlight);
  transition: border-color 150ms ease, box-shadow 150ms ease;
  min-height: 44px;
  overflow: hidden;

  /* Size: sm */
  &[data-size="sm"] {
    min-height: 36px;
    border-radius: var(--neu-radius-lg);
  }

  /* Size: lg */
  &[data-size="lg"] {
    min-height: 54px;
  }

  /* Focused */
  &[data-focused="true"] {
    border-color: var(--neu-color-accent);
    box-shadow: var(--neu-glass-shadow-sm),
      inset 0 1px 0 var(--neu-glass-highlight),
      0 0 0 3px rgba(0, 122, 255, 0.15);
  }

  /* Error */
  &[data-error="true"] {
    border-color: var(--neu-color-destructive);
    box-shadow: var(--neu-glass-shadow-sm),
      inset 0 1px 0 var(--neu-glass-highlight),
      0 0 0 3px rgba(255, 59, 48, 0.15);
  }

  /* Disabled */
  &[data-disabled="true"] {
    opacity: 0.38;
    cursor: not-allowed;
  }
`;

const IconSlot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--neu-color-text-tertiary);
  padding: 0 var(--neu-space-sm);
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--neu-font-sans);
  font-size: 17px;
  font-weight: 400;
  color: var(--neu-color-text-primary);
  padding: var(--neu-space-sm) var(--neu-space-md);
  min-width: 0;
  cursor: inherit;

  &::placeholder {
    color: var(--neu-color-text-tertiary);
  }

  /* No padding when icon is present — icons provide their own padding */
  &[data-has-leading-icon="true"] {
    padding-left: 0;
  }

  &[data-has-trailing-icon="true"] {
    padding-right: 0;
  }
`;

const ErrorText = styled.span`
  font-family: var(--neu-font-sans);
  font-size: 12px;
  font-weight: 400;
  color: var(--neu-color-destructive);
  padding: 0 var(--neu-space-sm);
`;

export function Input({
  label,
  leadingIcon,
  trailingIcon,
  error,
  size = "md",
  disabled,
  id: providedId,
  ...props
}: InputProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const [focused, setFocused] = useState(false);

  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputWrapper
        data-size={size}
        data-focused={focused ? "true" : undefined}
        data-error={error ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
      >
        {leadingIcon && <IconSlot>{leadingIcon}</IconSlot>}
        <StyledInput
          id={id}
          disabled={disabled}
          data-has-leading-icon={leadingIcon ? "true" : undefined}
          data-has-trailing-icon={trailingIcon ? "true" : undefined}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {trailingIcon && <IconSlot>{trailingIcon}</IconSlot>}
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}
