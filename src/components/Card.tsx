import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode, CSSProperties } from "react";

const GlassCard = styled.div`
  position: relative;
  background: var(--med-color-surface);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 16px;
  border: 1px solid var(--med-color-border);
  box-shadow: var(--med-shadow-md),
              inset 0 1px 0 var(--med-color-card-shimmer);
  overflow: hidden;
`;

const CardInner = styled.div`
  padding: 20px 20px;
  position: relative;
  z-index: 1;
`;

const CardInnerCompact = styled.div`
  padding: 14px 16px;
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.1;
  color: var(--med-color-text-primary);
  letter-spacing: 0.01em;
  margin-bottom: 6px;
`;

const CardBody = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--med-color-text-secondary);
`;

const CardDivider = styled.hr`
  border: none;
  border-top: 0.5px solid var(--med-color-divider);
  margin: 14px 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
`;

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

Card.Title = CardTitle;
Card.Body = CardBody;
Card.Divider = CardDivider;
Card.Footer = CardFooter;
