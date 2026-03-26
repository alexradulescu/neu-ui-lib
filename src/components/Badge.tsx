import type { ReactNode, CSSProperties } from "react";

// ─── Mediterranean Badge / Chip ───────────────────────────────────────────────
// Variants:
//   "terracotta" – warm blush fill  (default)
//   "copper"     – oxidised copper tint
//   "sky"        – coastal haze blue
//   "sand"       – neutral stone fill

export type BadgeVariant = "terracotta" | "copper" | "sky" | "sand";
export type BadgeSize = "sm" | "md" | "lg";

const variantMap: Record<BadgeVariant, CSSProperties> = {
  terracotta: {
    background: "rgba(212, 168, 130, 0.22)",
    color: "#9A5E25",
    border: "1px solid rgba(212, 168, 130, 0.45)",
  },
  copper: {
    background: "rgba(184, 115, 51, 0.14)",
    color: "#B87333",
    border: "1px solid rgba(184, 115, 51, 0.30)",
  },
  sky: {
    background: "rgba(168, 196, 212, 0.22)",
    color: "#537A96",
    border: "1px solid rgba(168, 196, 212, 0.45)",
  },
  sand: {
    background: "rgba(180, 155, 120, 0.16)",
    color: "#7A6850",
    border: "1px solid rgba(180, 155, 120, 0.30)",
  },
};

const sizeMap: Record<BadgeSize, CSSProperties> = {
  sm: { fontSize: "0.6875rem", padding: "2px 10px", height: "22px" },
  md: { fontSize: "0.75rem",   padding: "4px 12px", height: "26px" },
  lg: { fontSize: "0.8125rem", padding: "6px 16px", height: "30px" },
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: CSSProperties;
  className?: string;
}

export function Badge({
  children,
  variant = "terracotta",
  size = "md",
  style,
  className,
}: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "9999px",
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 500,
        letterSpacing: "0.025em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        userSelect: "none",
        verticalAlign: "middle",
        // variant colours
        ...variantMap[variant],
        // size
        ...sizeMap[size],
        // caller overrides
        ...style,
      }}
    >
      {children}
    </span>
  );
}
