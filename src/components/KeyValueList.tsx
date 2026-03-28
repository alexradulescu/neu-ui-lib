import type { ReactNode } from "react";
import css from "./mediterranean.module.css";

export interface KVItem {
  label: string;
  value: ReactNode;
}

export interface KeyValueListProps {
  items: KVItem[];
  caption?: string;
  split?: string;
}

export function KeyValueList({ items, caption, split = "38% 62%" }: KeyValueListProps) {
  return (
    <div className={css.glass}>
      {caption && <div className={css.caption}>{caption}</div>}
      {items.map((item, i) => (
        <div key={i} className={css.kvRow} style={{ gridTemplateColumns: split }}>
          <span className={css.kvLabel}>{item.label}</span>
          <span className={css.kvValue}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
