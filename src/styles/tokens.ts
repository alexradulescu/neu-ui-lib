/**
 * Design tokens reference.
 *
 * styled-static does not support runtime interpolation in template literals,
 * so use the CSS custom property names directly in your styles:
 *
 *   const Box = styled.div`
 *     padding: var(--neu-space-md);
 *     color: var(--neu-color-text-primary);
 *   `;
 *
 * These constants are provided for use in non-CSS contexts (inline styles,
 * runtime logic, etc.) where you need to reference the variable names.
 */

export const tokens = {
  space: {
    xs: "--neu-space-xs",
    sm: "--neu-space-sm",
    md: "--neu-space-md",
    lg: "--neu-space-lg",
    xl: "--neu-space-xl",
    "2xl": "--neu-space-2xl",
  },
  radius: {
    sm: "--neu-radius-sm",
    md: "--neu-radius-md",
    lg: "--neu-radius-lg",
    xl: "--neu-radius-xl",
    full: "--neu-radius-full",
  },
  color: {
    bg: "--neu-color-bg",
    surface: "--neu-color-surface",
    surfaceElevated: "--neu-color-surface-elevated",
    textPrimary: "--neu-color-text-primary",
    textSecondary: "--neu-color-text-secondary",
    textTertiary: "--neu-color-text-tertiary",
    separator: "--neu-color-separator",
    accent: "--neu-color-accent",
    accentHover: "--neu-color-accent-hover",
    destructive: "--neu-color-destructive",
    success: "--neu-color-success",
    warning: "--neu-color-warning",
  },
  font: {
    sans: "--neu-font-sans",
    mono: "--neu-font-mono",
  },
} as const;
