import { styled } from "@alex.radulescu/styled-static";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--neu-space-sm);
  border-radius: var(--neu-radius-full);
  border: 1px solid var(--neu-glass-border);
  font-family: var(--neu-font-sans);
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  /* Liquid Glass base material */
  background: var(--neu-glass-bg);
  backdrop-filter: blur(var(--neu-glass-blur)) saturate(var(--neu-glass-saturate));
  -webkit-backdrop-filter: blur(var(--neu-glass-blur)) saturate(var(--neu-glass-saturate));
  box-shadow: var(--neu-glass-shadow-sm), inset 0 1px 0 var(--neu-glass-highlight);
  color: var(--neu-color-text-primary);

  /* Spring-like transition */
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 150ms ease,
    box-shadow 150ms ease;

  /* Size: md (default) */
  padding: 10px 24px;
  font-size: 17px;
  min-height: 44px;

  /* Primary variant */
  &[data-variant="primary"] {
    background: rgba(0, 122, 255, 0.2);
    border-color: rgba(0, 122, 255, 0.35);
    color: var(--neu-color-accent);
    box-shadow: var(--neu-glass-shadow-sm),
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      0 0 0 0 rgba(0, 122, 255, 0);
  }

  /* Destructive variant */
  &[data-variant="destructive"] {
    background: rgba(255, 59, 48, 0.15);
    border-color: rgba(255, 59, 48, 0.3);
    color: var(--neu-color-destructive);
    box-shadow: var(--neu-glass-shadow-sm),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  /* Size: sm */
  &[data-size="sm"] {
    padding: 6px 16px;
    font-size: 14px;
    min-height: 32px;
  }

  /* Size: lg */
  &[data-size="lg"] {
    padding: 14px 32px;
    font-size: 20px;
    min-height: 54px;
  }

  /* Full width */
  &[data-full-width="true"] {
    width: 100%;
  }

  /* Hover */
  &:hover:not(:disabled) {
    box-shadow: var(--neu-glass-shadow), inset 0 1px 0 var(--neu-glass-highlight);
  }

  &[data-variant="primary"]:hover:not(:disabled) {
    background: rgba(0, 122, 255, 0.28);
    box-shadow: var(--neu-glass-shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 20px rgba(0, 122, 255, 0.15);
  }

  &[data-variant="destructive"]:hover:not(:disabled) {
    background: rgba(255, 59, 48, 0.22);
    box-shadow: var(--neu-glass-shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 20px rgba(255, 59, 48, 0.12);
  }

  /* Active / press — iOS spring scale */
  &:active:not(:disabled) {
    transform: scale(0.96);
    opacity: 0.85;
    box-shadow: var(--neu-glass-shadow-sm), inset 0 1px 0 var(--neu-glass-highlight);
    transition: transform 80ms ease, opacity 80ms ease;
  }

  /* Disabled */
  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }

  /* Focus visible — accessibility */
  &:focus-visible {
    outline: 2px solid var(--neu-color-accent);
    outline-offset: 2px;
  }
`;

export function Button({
  variant = "secondary",
  size = "md",
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth ? "true" : undefined}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
