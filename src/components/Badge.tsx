import { Badge as MantineBadge, type BadgeProps as MantineBadgeProps, useMantineColorScheme } from "@mantine/core";
import type { ReactNode } from "react";

// ─── Mediterranean Badge ──────────────────────────────────────────────────────

export type MedBadgeVariant = "terracotta" | "copper" | "sky" | "sand" | "sage" | "sienna";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeVars { bg: string; color: string; bd: string }
type ThemeVariants = { light: BadgeVars; dark: BadgeVars };

const variantThemes: Record<MedBadgeVariant, ThemeVariants> = {
  terracotta: {
    light: { bg: "rgba(212,168,130,0.22)", color: "#9A5E25",  bd: "rgba(212,168,130,0.50)" },
    dark:  { bg: "rgba(200,130,70,0.25)",  color: "#D4A265",  bd: "rgba(200,130,70,0.45)"  },
  },
  copper: {
    light: { bg: "rgba(184,115,51,0.14)",  color: "#B87333",  bd: "rgba(184,115,51,0.32)"  },
    dark:  { bg: "rgba(184,115,51,0.22)",  color: "#C68D4A",  bd: "rgba(184,115,51,0.42)"  },
  },
  sky: {
    light: { bg: "rgba(168,196,212,0.22)", color: "#537A96",  bd: "rgba(168,196,212,0.48)" },
    dark:  { bg: "rgba(130,185,215,0.22)", color: "#7AADC8",  bd: "rgba(130,185,215,0.40)" },
  },
  sand: {
    light: { bg: "rgba(180,155,120,0.16)", color: "#7A6850",  bd: "rgba(180,155,120,0.32)" },
    dark:  { bg: "rgba(160,140,100,0.22)", color: "#C4A87A",  bd: "rgba(160,140,100,0.40)" },
  },
  sage: {
    light: { bg: "rgba(74,120,40,0.12)",   color: "#4A7828",  bd: "rgba(74,120,40,0.30)"   },
    dark:  { bg: "rgba(74,120,40,0.24)",   color: "#6CA44A",  bd: "rgba(74,120,40,0.42)"   },
  },
  sienna: {
    light: { bg: "rgba(184,45,38,0.10)",   color: "#B82D26",  bd: "rgba(184,45,38,0.28)"   },
    dark:  { bg: "rgba(184,45,38,0.22)",   color: "#DB5B52",  bd: "rgba(184,45,38,0.42)"   },
  },
};

const sizeMap: Record<BadgeSize, MantineBadgeProps["size"]> = {
  sm: "sm", md: "md", lg: "lg",
};

export interface BadgeProps extends Omit<MantineBadgeProps, "color" | "variant" | "size"> {
  children: ReactNode;
  variant?: MedBadgeVariant;
  size?: BadgeSize;
}

export function Badge({ children, variant = "terracotta", size = "md", style, ...props }: BadgeProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { bg, color, bd } = variantThemes[variant][isDark ? "dark" : "light"];

  return (
    <MantineBadge
      {...props}
      variant="outline"
      size={sizeMap[size]}
      radius="xl"
      style={{
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
