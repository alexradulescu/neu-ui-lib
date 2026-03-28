import { styled } from "@alex.radulescu/styled-static";
import { Badge } from "./Badge";
import type { MedBadgeVariant } from "./Badge";

// ─── Mediterranean ListBox ────────────────────────────────────────────────────
// Data-dense list with 3 info items on the left and 3 on the right.
// Glassmorphic surface, auto-adapts to dark/light mode via CSS vars.

export interface ListBoxItem {
  id: string;
  // Left side (3 pieces)
  name: string;
  subtitle: string;
  meta: string;
  // Right side (3 pieces)
  status: string;
  statusVariant?: MedBadgeVariant;
  value: string;
  date: string;
}

export interface ListBoxProps {
  items: ListBoxItem[];
  caption?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
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

const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--med-color-divider);
  transition: background 140ms ease;
  gap: 12px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--med-color-row-hover);
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
`;

const ItemName = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--med-color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemSubtitle = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--med-color-text-secondary);
`;

const ItemMeta = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 0.625rem;
  color: var(--med-color-text-muted);
  letter-spacing: 0.02em;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  flex-shrink: 0;
`;

const ItemValue = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--med-color-text-primary);
  letter-spacing: -0.01em;
`;

const ItemDate = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.6875rem;
  color: var(--med-color-text-muted);
`;

// ─── Component ────────────────────────────────────────────────────────────────

export function ListBox({ items, caption, selectedId, onSelect }: ListBoxProps) {
  return (
    <Container role="listbox" aria-label={caption}>
      {caption && <Caption aria-hidden="true">{caption}</Caption>}
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <ItemRow
            key={item.id}
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect?.(item.id)}
            style={
              isSelected
                ? {
                    background: "var(--med-color-row-hover)",
                    // iOS-26: inset left-bar without shifting content
                    boxShadow: "inset 3px 0 0 var(--med-color-accent)",
                  }
                : undefined
            }
          >
            <LeftCol>
              <ItemName>{item.name}</ItemName>
              <ItemSubtitle>{item.subtitle}</ItemSubtitle>
              <ItemMeta>{item.meta}</ItemMeta>
            </LeftCol>
            <RightCol>
              <Badge variant={item.statusVariant ?? "copper"} size="sm">
                {item.status}
              </Badge>
              <ItemValue>{item.value}</ItemValue>
              <ItemDate>{item.date}</ItemDate>
            </RightCol>
          </ItemRow>
        );
      })}
    </Container>
  );
}
