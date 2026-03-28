import type { ReactNode } from "react";
import css from "./mediterranean.module.css";

export type TrendDirection = "up" | "down" | "neutral";

export interface StatCardTrend {
  label: string;
  direction: TrendDirection;
}

export interface StatCardProps {
  label: string;
  value: string;
  trend?: StatCardTrend;
  icon?: ReactNode;
  accent?: boolean;
}

const TREND_COLORS: Record<TrendDirection, { dot: string; text: string }> = {
  up:      { dot: "#4A7828", text: "#4A7828" },
  down:    { dot: "#B82D26", text: "#B82D26" },
  neutral: { dot: "var(--med-color-text-muted)", text: "var(--med-color-text-muted)" },
};

const TREND_PREFIX: Record<TrendDirection, string> = {
  up: "↑", down: "↓", neutral: "–",
};

export function StatCard({ label, value, trend, icon, accent = false }: StatCardProps) {
  const colors = trend ? TREND_COLORS[trend.direction] : null;
  return (
    <div className={css.statWrap}>
      {icon && <div className={css.statIcon}>{icon}</div>}
      <p className={css.statLabel}>{label}</p>
      <p
        className={css.statValue}
        style={accent ? { color: "var(--med-color-accent)" } : undefined}
      >
        {value}
      </p>
      {trend && colors && (
        <div className={css.trendRow}>
          <span className={css.trendDot} style={{ background: colors.dot }} />
          <span className={css.trendText} style={{ color: colors.text }}>
            {TREND_PREFIX[trend.direction]} {trend.label}
          </span>
        </div>
      )}
    </div>
  );
}
