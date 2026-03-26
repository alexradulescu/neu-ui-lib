import { Button as MantineButton, type ButtonProps } from "@mantine/core";
import type { ReactNode, MouseEventHandler } from "react";

// ─── Mediterranean Button ──────────────────────────────────────────────────────
// Thin wrapper around Mantine Button that:
//   - Exposes Mediterranean variant names ("primary" | "outline" | "ghost")
//   - Exposes semantic color names ("copper" | "sage" | "sienna")
//   - Applies pill radius + press spring + warm focus ring via styles.root
//   - Adds copper gradient only for primary+copper (otherwise Mantine colour system handles it)
//   - Does NOT override height — Mantine's size prop works correctly

export type MedButtonVariant = "primary" | "outline" | "ghost";
export type MedButtonColor = "copper" | "sage" | "sienna";

export interface MedButtonProps extends Omit<ButtonProps, "variant" | "color"> {
  variant?: MedButtonVariant;
  color?: MedButtonColor;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const variantMap: Record<MedButtonVariant, ButtonProps["variant"]> = {
  primary: "filled",
  outline: "outline",
  ghost: "subtle",
};

const COPPER_FILL =
  "linear-gradient(135deg, #C68D4A 0%, #B87333 55%, #9A5E25 100%)";
const COPPER_FILL_HOVER =
  "linear-gradient(135deg, #D4A265 0%, #C68D4A 55%, #B87333 100%)";

// Per-color focus ring colour
const focusRing: Record<MedButtonColor, string> = {
  copper: "rgba(184, 115, 51, 0.35)",
  sage:   "rgba(74, 120, 40, 0.35)",
  sienna: "rgba(184, 45, 38, 0.35)",
};

export function Button({
  variant = "primary",
  color = "copper",
  children,
  ...props
}: MedButtonProps) {
  const isCopperFill = variant === "primary" && color === "copper";

  return (
    <MantineButton
      {...props}
      color={color}
      variant={variantMap[variant]}
      styles={{
        root: {
          borderRadius: "999px",
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: "500",
          letterSpacing: "0.01em",
          transition:
            "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), " +
            "box-shadow 200ms ease, background 150ms ease",

          // Warm focus ring — overrides Mantine's default blue outline
          "&:focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 3px ${focusRing[color]}`,
          },

          // Press scale
          "&:active:not([data-disabled])": {
            transform: "scale(0.97)",
          },

          // Copper gradient overrides Mantine's flat filled colour
          ...(isCopperFill && {
            background: COPPER_FILL,
            border: "none",
            boxShadow: "0 2px 8px rgba(120, 80, 40, 0.25)",
            "&:hover:not([data-disabled])": {
              background: COPPER_FILL_HOVER,
              transform: "translateY(-1px)",
              boxShadow: "0 4px 14px rgba(120, 80, 40, 0.32)",
            },
          }),
        },
      }}
    >
      {children}
    </MantineButton>
  );
}
