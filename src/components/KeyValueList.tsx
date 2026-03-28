import { useMemo } from "react";
import type { ReactNode, CSSProperties } from "react";
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
  const rowStyle = useMemo<CSSProperties>(() => ({ gridTemplateColumns: split }), [split]);
  return (
    <div className={css.glass}>
      {caption && <div className={css.caption}>{caption}</div>}
      {items.map((item, i) => (
        <div key={i} className={css.kvRow} style={rowStyle}>
          <span className={css.kvLabel}>{item.label}</span>
          <span className={css.kvValue}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
