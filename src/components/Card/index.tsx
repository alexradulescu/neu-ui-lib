import { styled } from "@alex.radulescu/styled-static";
import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "tinted";
  padding?: "none" | "sm" | "md" | "lg";
}

const StyledCard = styled.div`
  position: relative;
  border-radius: var(--neu-radius-xl);
  border: 1px solid var(--neu-glass-border);
  overflow: hidden;

  /* Default: standard Liquid Glass surface */
  background: var(--neu-color-surface);
  backdrop-filter: blur(var(--neu-glass-blur)) saturate(var(--neu-glass-saturate));
  -webkit-backdrop-filter: blur(var(--neu-glass-blur)) saturate(var(--neu-glass-saturate));
  box-shadow: var(--neu-glass-shadow), inset 0 1px 0 var(--neu-glass-highlight);

  /* Default padding: md */
  padding: var(--neu-space-xl);

  /* Elevated variant — higher opacity, stronger shadow */
  &[data-variant="elevated"] {
    background: var(--neu-color-surface-elevated);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 var(--neu-glass-highlight);
  }

  /* Tinted variant — accent-tinted glass */
  &[data-variant="tinted"] {
    background: rgba(0, 122, 255, 0.1);
    border-color: rgba(0, 122, 255, 0.25);
    box-shadow: var(--neu-glass-shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      0 0 40px rgba(0, 122, 255, 0.08);
  }

  /* Padding overrides */
  &[data-padding="none"] {
    padding: 0;
  }

  &[data-padding="sm"] {
    padding: var(--neu-space-md);
  }

  &[data-padding="lg"] {
    padding: var(--neu-space-2xl);
  }
`;

export function Card({
  variant = "default",
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <StyledCard data-variant={variant} data-padding={padding} {...props}>
      {children}
    </StyledCard>
  );
}
