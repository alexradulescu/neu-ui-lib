import { Badge as MantineBadge, type BadgeProps as MantineBadgeProps } from "@mantine/core";
import type { ReactNode } from "react";

// ─── Mediterranean Badge ──────────────────────────────────────────────────────
// Wraps Mantine Badge, overriding CSS variables for Mediterranean colours.
// Uses Mantine's own rendering, accessibility, and size system.

export type MedBadgeVariant = "terracotta" | "copper" | "sky" | "sand";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeVars {
  bg: string;
  color: string;
  bd: string;
}

const variantVars: Record<MedBadgeVariant, BadgeVars> = {
  terracotta: {
    bg: "rgba(212, 168, 130, 0.22)",
    color: "#9A5E25",
    bd: "rgba(212, 168, 130, 0.50)",
  },
  copper: {
    bg: "rgba(184, 115, 51, 0.14)",
    color: "#B87333",
    bd: "rgba(184, 115, 51, 0.32)",
  },
  sky: {
    bg: "rgba(168, 196, 212, 0.22)",
    color: "#537A96",
    bd: "rgba(168, 196, 212, 0.48)",
  },
  sand: {
    bg: "rgba(180, 155, 120, 0.16)",
    color: "#7A6850",
    bd: "rgba(180, 155, 120, 0.32)",
  },
};

// Map our named sizes to Mantine sizes
const sizeMap: Record<BadgeSize, MantineBadgeProps["size"]> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export interface BadgeProps extends Omit<MantineBadgeProps, "color" | "variant" | "size"> {
  children: ReactNode;
  variant?: MedBadgeVariant;
  size?: BadgeSize;
}

export function Badge({
  children,
  variant = "terracotta",
  size = "md",
  style,
  ...props
}: BadgeProps) {
  const { bg, color, bd } = variantVars[variant];

  return (
    <MantineBadge
      {...props}
      variant="outline"
      size={sizeMap[size]}
      radius="xl"
      style={{
        // Override Mantine's CSS variables for this instance
        "--badge-bg": bg,
        "--badge-color": color,
        "--badge-bd": bd,
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 500,
        letterSpacing: "0.025em",
        ...style,
      } as unknown as React.CSSProperties}
    >
      {children}
    </MantineBadge>
  );
}
