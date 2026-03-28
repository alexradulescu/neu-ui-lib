import { Badge } from "@mantine/core";
import type { MedBadgeVariant } from "./Badge";
import css from "./mediterranean.module.css";

export interface ListBoxItem {
  id: string;
  name: string;
  subtitle: string;
  meta: string;
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

export function ListBox({ items, caption, selectedId, onSelect }: ListBoxProps) {
  return (
    <div className={css.glass} role="listbox" aria-label={caption}>
      {caption && <div className={css.caption} aria-hidden="true">{caption}</div>}
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <div
            key={item.id}
            className={`${css.listRow}${isSelected ? ` ${css.listRowSelected}` : ""}`}
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect?.(item.id)}
          >
            <div className={css.listLeft}>
              <span className={css.listName}>{item.name}</span>
              <span className={css.listSubtitle}>{item.subtitle}</span>
              <span className={css.listMeta}>{item.meta}</span>
            </div>
            <div className={css.listRight}>
              <Badge color={item.statusVariant ?? "copper"} size="sm">
                {item.status}
              </Badge>
              <span className={css.listValue}>{item.value}</span>
              <span className={css.listDate}>{item.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
