import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode } from "react";

// ─── Mediterranean KeyValueList ───────────────────────────────────────────────
// Ultra-dense two-column key→value pairs.
// Suitable for property panels, booking details, metadata, configuration.

export interface KVItem {
  label: string;
  value: ReactNode;
}

export interface KeyValueListProps {
  items: KVItem[];
  caption?: string;
  /** Column split — defaults to "38% 62%" */
  split?: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Container = styled.div`
  background: var(--med-color-surface);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 16px;
  border: 1px solid var(--med-color-border);
  box-shadow: var(--med-shadow-sm), inset 0 1px 0 var(--med-color-card-shimmer);
  overflow: hidden;
`;

const Caption = styled.div`
  padding: 10px 16px 8px;
  border-bottom: 1px solid var(--med-color-divider);
  font-family: "DM Sans", sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--med-color-text-secondary);
`;

const KVRow = styled.div`
  display: grid;
  gap: 8px;
  padding: 7px 16px;
  border-bottom: 1px solid var(--med-color-divider);
  align-items: baseline;

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: var(--med-color-row-stripe);
  }
`;

const KVLabel = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--med-color-text-muted);
  letter-spacing: 0.01em;
`;

const KVValue = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  color: var(--med-color-text-primary);
  line-height: 1.35;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export function KeyValueList({ items, caption, split = "38% 62%" }: KeyValueListProps) {
  return (
    <Container>
      {caption && <Caption>{caption}</Caption>}
      {items.map((item, i) => (
        <KVRow key={i} style={{ gridTemplateColumns: split }}>
          <KVLabel>{item.label}</KVLabel>
          <KVValue>{item.value}</KVValue>
        </KVRow>
      ))}
    </Container>
  );
}
