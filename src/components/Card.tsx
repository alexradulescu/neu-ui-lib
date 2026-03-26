import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode, CSSProperties } from "react";

// ─── Frosted warm-glass card ─────────────────────────────────────────────────
// Layers:
//   1. Warm parchment background with frosted glass
//   2. Inset top-edge shimmer via ::before linear-gradient
//   3. Warm-tinted shadow beneath

const GlassCard = styled.div`
  position: relative;
  background: rgba(255, 250, 244, 0.72);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 16px;
  border: 1px solid rgba(180, 155, 120, 0.25);
  box-shadow: 0 4px 32px rgba(120, 80, 40, 0.10),
              inset 0 1px 0 rgba(255, 245, 230, 0.60);
  overflow: hidden;
`;

const CardInner = styled.div`
  padding: 28px 32px;
  position: relative;
  z-index: 1;
`;

// Compact padding variant
const CardInnerCompact = styled.div`
  padding: 20px 24px;
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
  color: #2A2118;
  letter-spacing: 0.01em;
  margin-bottom: 8px;
`;

const CardBody = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #7A6850;
`;

const CardDivider = styled.hr`
  border: none;
  border-top: 0.5px solid rgba(180, 155, 120, 0.30);
  margin: 20px 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
`;

// ─── Public API ───────────────────────────────────────────────────────────────

export interface CardProps {
  children: ReactNode;
  compact?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function Card({ children, compact = false, style, className }: CardProps) {
  const Inner = compact ? CardInnerCompact : CardInner;
  return (
    <GlassCard style={style} className={className}>
      <Inner>{children}</Inner>
    </GlassCard>
  );
}

// Named sub-components for composition
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Divider = CardDivider;
Card.Footer = CardFooter;
