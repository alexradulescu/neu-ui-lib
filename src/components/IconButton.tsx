import { ActionIcon, type ActionIconProps } from "@mantine/core";
import type { ReactNode, MouseEventHandler } from "react";
import type { MedButtonColor, MedButtonVariant } from "./Button";

// ─── Mediterranean IconButton ─────────────────────────────────────────────────
// Square-with-rounded-corners icon-only button using Mantine ActionIcon.
// Shares the same variant/color vocabulary as Button.

export interface IconButtonProps
  extends Omit<ActionIconProps, "variant" | "color"> {
  variant?: MedButtonVariant;
  color?: MedButtonColor;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Border-radius override. Defaults to "10px" (rounded square). */
  radius?: string | number;
}

const variantMap: Record<MedButtonVariant, ActionIconProps["variant"]> = {
  primary: "filled",
  outline: "outline",
  ghost:   "subtle",
};

const COPPER_FILL =
  "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)";
const COPPER_FILL_HOVER =
  "linear-gradient(135deg, #D4A265 0%, #C68D4A 100%)";

const focusRing: Record<MedButtonColor, string> = {
  copper: "rgba(184, 115, 51, 0.35)",
  sage:   "rgba(74, 120, 40, 0.35)",
  sienna: "rgba(184, 45, 38, 0.35)",
};

export function IconButton({
  variant = "outline",
  color = "copper",
  radius = "999px",
  children,
  ...props
}: IconButtonProps) {
  const isCopperFill = variant === "primary" && color === "copper";

  return (
    <ActionIcon
      {...props}
      color={color}
      variant={variantMap[variant]}
      styles={{
        root: {
          borderRadius: typeof radius === "number" ? `${radius}px` : radius,
          transition:
            "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), " +
            "box-shadow 200ms ease",

          "&:focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 3px ${focusRing[color]}`,
          },

          "&:active:not([data-disabled])": {
            transform: "scale(0.94)",
          },

          ...(isCopperFill && {
            background: COPPER_FILL,
            border: "none",
            boxShadow: "0 2px 6px rgba(120, 80, 40, 0.25)",
            "&:hover:not([data-disabled])": {
              background: COPPER_FILL_HOVER,
              boxShadow: "0 3px 10px rgba(120, 80, 40, 0.30)",
            },
          }),
        },
      }}
    >
      {children}
    </ActionIcon>
  );
}
