import type { ReactNode } from "react";
import css from "./mediterranean.module.css";

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

export interface MedTableProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  caption?: string;
  getRowKey?: (row: Record<string, unknown>, index: number) => string;
}

export function MedTable({ columns, data, caption, getRowKey }: MedTableProps) {
  return (
    <div className={css.glass} style={{ width: "100%" }}>
      <div className={css.tableScroll}>
        <table className={css.table}>
          {caption && <caption className={css.tableCaption}>{caption}</caption>}
          <thead className={css.thead}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={css.th}
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={getRowKey ? getRowKey(row, i) : String(i)} className={css.tr}>
                {columns.map((col) => (
                  <td key={col.key} className={css.td} style={{ textAlign: col.align ?? "left" }}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
