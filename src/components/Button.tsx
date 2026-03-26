import { Button as MantineButton, type ButtonProps } from "@mantine/core";
import type { ReactNode, MouseEventHandler } from "react";

// ─── Variant Map ────────────────────────────────────────────────────────────
// "primary"  → warm copper gradient fill  (maps to Mantine "filled")
// "ghost"    → transparent, copper border (maps to Mantine "outline")
// "subtle"   → no border, faint hover bg  (maps to Mantine "subtle")

export type MedButtonVariant = "primary" | "ghost" | "subtle";

interface MedButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: MedButtonVariant;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const variantStyles: Record<MedButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #C68D4A 0%, #B87333 55%, #9A5E25 100%)",
    color: "#FAF8F5",
    border: "none",
    boxShadow: "0 4px 16px rgba(120, 80, 40, 0.28), inset 0 1px 0 rgba(255, 235, 200, 0.25)",
  },
  ghost: {
    background: "transparent",
    color: "#B87333",
    border: "1.5px solid rgba(184, 115, 51, 0.4)",
    boxShadow: "none",
  },
  subtle: {
    background: "transparent",
    color: "#7A6850",
    border: "none",
    boxShadow: "none",
  },
};

const mantineVariantMap: Record<MedButtonVariant, ButtonProps["variant"]> = {
  primary: "filled",
  ghost: "outline",
  subtle: "subtle",
};

export function Button({
  variant = "primary",
  children,
  style,
  ...props
}: MedButtonProps) {
  const vs = variantStyles[variant];

  return (
    <MantineButton
      {...props}
      variant={mantineVariantMap[variant]}
      style={{
        // Shape & layout
        minHeight: "44px",
        borderRadius: "16px",
        paddingInline: "24px",
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 500,
        fontSize: "0.9375rem",
        letterSpacing: "0.01em",

        // Variant-specific colours
        ...vs,

        // Transition: spring entrance, clean exit
        transition:
          "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), " +
          "box-shadow 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), " +
          "background 200ms ease, opacity 200ms ease",

        // Caller overrides last
        ...style,
      }}
      styles={{
        root: {
          // Active press scale
          "&:active": {
            transform: "scale(0.97)",
          },
          // Warm copper focus glow — no blue ring
          "&:focus-visible": {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(184, 115, 51, 0.35)",
          },
          // Hover lift for primary
          ...(variant === "primary" && {
            "&:hover:not(:disabled)": {
              background:
                "linear-gradient(135deg, #D4A265 0%, #C68D4A 55%, #B87333 100%)",
              transform: "translateY(-1px)",
              boxShadow:
                "0 6px 24px rgba(120, 80, 40, 0.35), inset 0 1px 0 rgba(255, 235, 200, 0.25)",
            },
          }),
          // Hover tint for ghost
          ...(variant === "ghost" && {
            "&:hover:not(:disabled)": {
              background: "rgba(184, 115, 51, 0.06)",
              borderColor: "#B87333",
            },
          }),
          // Hover tint for subtle
          ...(variant === "subtle" && {
            "&:hover:not(:disabled)": {
              background: "rgba(180, 155, 120, 0.12)",
              color: "#2A2118",
            },
          }),
        },
      }}
    >
      {children}
    </MantineButton>
  );
}
