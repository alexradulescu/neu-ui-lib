/**
 * Mediterranean UI — Component Library
 *
 * Built on Mantine v9 alpha, themed with Mediterranean Modernism × iOS 26 Spatial UI.
 *
 * Standard Mantine components (Button, Badge, TextInput, Select, DatePickerInput,
 * Modal, SegmentedControl, Card, ActionIcon) are styled globally via the theme —
 * import them directly from @mantine/core or @mantine/dates.
 *
 * The exports below are custom components with no Mantine equivalent.
 */

export type { MedBadgeVariant } from "./Badge";

export { ListBox } from "./ListBox";
export type { ListBoxProps, ListBoxItem } from "./ListBox";

export { MedTable } from "./Table";
export type { MedTableProps, TableColumn } from "./Table";

export { KeyValueList } from "./KeyValueList";
export type { KeyValueListProps, KVItem } from "./KeyValueList";

export { Navbar } from "./Navbar";
export type { NavbarProps, NavbarItem } from "./Navbar";

export { StatCard } from "./StatCard";
export type { StatCardProps, StatCardTrend, TrendDirection } from "./StatCard";
