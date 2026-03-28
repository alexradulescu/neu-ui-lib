import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode } from "react";

// ─── Mediterranean StatCard ───────────────────────────────────────────────────
// Dashboard metric tile: label, big value, optional trend + optional icon.
// Glassmorphic surface, monospace value, sage/sienna trend colours.

export type TrendDirection = "up" | "down" | "neutral";

export interface StatCardTrend {
  label: string;             // e.g. "+12.5% vs last month"
  direction: TrendDirection;
}

export interface StatCardProps {
  label: string;
  value: string;
  trend?: StatCardTrend;
  icon?: ReactNode;
  /** Accent the value in copper. Default false. */
  accent?: boolean;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Wrap = styled.div`
  background: var(--med-color-surface);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 16px;
  border: 1px solid var(--med-color-border);
  box-shadow: var(--med-shadow-sm), inset 0 1px 0 var(--med-color-card-shimmer);
  padding: 14px 16px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const IconSlot = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: var(--med-color-row-hover);
  border: 0.5px solid var(--med-color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--med-color-accent);
`;

const StatLabel = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--med-color-text-muted);
  line-height: 1;
`;

const StatValue = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 1.625rem;
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--med-color-text-primary);
`;

const TrendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 2px;
`;

const TrendDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  flex-shrink: 0;
`;

const TrendText = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TREND_UP      = { dot: "#4A7828", text: "#4A7828" };
const TREND_DOWN    = { dot: "#B82D26", text: "#B82D26" };
const TREND_NEUTRAL = { dot: "var(--med-color-text-muted)", text: "var(--med-color-text-muted)" };

function trendColors(d: TrendDirection) {
  if (d === "up")   return TREND_UP;
  if (d === "down") return TREND_DOWN;
  return TREND_NEUTRAL;
}

function trendPrefix(d: TrendDirection) {
  if (d === "up")   return "↑";
  if (d === "down") return "↓";
  return "–";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StatCard({ label, value, trend, icon, accent = false }: StatCardProps) {
  const colors = trend ? trendColors(trend.direction) : null;
  return (
    <Wrap>
      {icon && <IconSlot>{icon}</IconSlot>}
      <StatLabel>{label}</StatLabel>
      <StatValue
        style={accent ? { color: "var(--med-color-accent)" } : undefined}
      >
        {value}
      </StatValue>
      {trend && colors && (
        <TrendRow>
          <TrendDot style={{ background: colors.dot }} />
          <TrendText style={{ color: colors.text }}>
            {trendPrefix(trend.direction)} {trend.label}
          </TrendText>
        </TrendRow>
      )}
    </Wrap>
  );
}
