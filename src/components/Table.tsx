import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode } from "react";

// ─── Mediterranean Table ──────────────────────────────────────────────────────

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

// ─── Styles ───────────────────────────────────────────────────────────────────

const TableWrap = styled.div`
  background: var(--med-color-surface);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 16px;
  border: 1px solid var(--med-color-border);
  box-shadow: var(--med-shadow-sm), inset 0 1px 0 var(--med-color-card-shimmer);
  overflow: hidden;
  width: 100%;
`;

/* Scroll container sits INSIDE the clip boundary so touch-scroll works on mobile */
const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
`;

const TableEl = styled.table`
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  table-layout: auto;
`;

const TableCaptionEl = styled.caption`
  padding: 10px 16px 8px;
  text-align: left;
  font-family: "DM Sans", sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--med-color-text-secondary);
  border-bottom: 1px solid var(--med-color-divider);
  caption-side: top;
`;

const Thead = styled.thead`
  background: var(--med-color-row-stripe);
`;

const Th = styled.th`
  padding: 9px 16px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--med-color-text-secondary);
  border-bottom: 1px solid var(--med-color-divider);
  white-space: nowrap;
  user-select: none;
`;

const Td = styled.td`
  padding: 9px 16px;
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  color: var(--med-color-text-primary);
  border-bottom: 1px solid var(--med-color-divider);
  vertical-align: middle;
  white-space: nowrap;
`;

const Tr = styled.tr`
  transition: background 130ms ease;

  &:last-child td {
    border-bottom: none;
  }

  &:nth-child(even) {
    background: var(--med-color-row-stripe);
  }

  /* iOS-26 style: rounded corners on first/last cell, inset highlight */
  &:hover td {
    background: var(--med-color-row-hover);
  }

  &:hover td:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:hover td:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export function MedTable({ columns, data, caption, getRowKey }: MedTableProps) {
  return (
    <TableWrap>
      <TableScroll>
        <TableEl>
          {caption && <TableCaptionEl>{caption}</TableCaptionEl>}
          <Thead>
            <tr>
              {columns.map((col) => (
                <Th
                  key={col.key}
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                >
                  {col.label}
                </Th>
              ))}
            </tr>
          </Thead>
          <tbody>
            {data.map((row, i) => (
              <Tr key={getRowKey ? getRowKey(row, i) : String(i)}>
                {columns.map((col) => (
                  <Td key={col.key} style={{ textAlign: col.align ?? "left" }}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </TableEl>
      </TableScroll>
    </TableWrap>
  );
}
