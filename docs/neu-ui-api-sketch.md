# NeuUI API Sketch

## Executive View

- API goal: Mantine-simple, Apple-feeling, Base UI underneath where behavior matters.
- Props stay boring.
- Defaults look good.
- Components compose.
- No Tailwind in consumer app.
- No provider required unless theme/app shell needs it.
- Most components use 3 sizes only: `sm`, `md`, `lg`.
- Text/typography can have broader scale.
- Component colour props use semantic names.
- Theme maps semantic colours to actual palettes.
- Default to non-Alt colours.
- Use `Alt` colours only for true second accent/contrast needs.

## Product Intent

- NeuUI exists for fast prototypes, not external library distribution.
- Apps should feel like iOS PWAs on mobile.
- Apps should feel like macOS-style tools on desktop.
- Mobile remains primary.
- Desktop must be good enough for real use, not afterthought.
- API should make common app screens obvious:
  - settings
  - booking/list detail
  - dashboards
  - forms
  - filters
  - command/actions
  - shell/navigation
- Most components should look finished with default props.
- Escape hatch still needed through `className`, `style`, and composition.

## Base UI Version

- Build against latest stable Base UI, not current pinned repo version.
- Latest docs source: `https://base-ui.com/llms.txt`.
- Latest verified at review time: `@base-ui/react@1.6.0`.
- Current repo before migration: `@base-ui/react@^1.3.0`.
- Re-check exact docs before coding each primitive.
- 1.6.0-relevant API notes:
  - `OTPField` stable.
  - `Drawer.VirtualKeyboardProvider` matters for mobile sheets with inputs.
  - `Drawer` swipe perf improved.
  - `Combobox` perf improved.
  - Toast ID updates exist and support planned `toast.update`.
- `date-fns` / `@date-fns/tz` can be installed if latest Base UI peer deps require them.

## Reviewer Lens

- Alex should judge: "Would I enjoy building prototypes with this?"
- Claude should judge: "Is this API coherent, maintainable, and scoped?"
- Codex should judge: "Can this be implemented cleanly in this repo?"
- Any reviewer can veto:
  - confusing prop names
  - scope creep
  - Mantine leakage
  - Tailwind leakage
  - Base UI overuse where native element is enough
  - visual mismatch with Apple-like intent

## Shared Types

```ts
export type NeuSize = "sm" | "md" | "lg";

export type NeuTextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

export type NeuRadius = "none" | "sm" | "md" | "lg" | "xl" | "pill";

export type NeuColor =
  | "primary"
  | "primaryAlt"
  | "brand"
  | "brandAlt"
  | "neutral"
  | "neutralAlt"
  | "info"
  | "infoAlt"
  | "success"
  | "successAlt"
  | "warning"
  | "warningAlt"
  | "danger"
  | "dangerAlt";

export type NeuPaletteRole =
  | "background"
  | "surface"
  | "surfaceRaised"
  | "surfaceInset"
  | "border"
  | "divider"
  | "text"
  | "textMuted"
  | "textSubtle"
  | "focus";

export type LegacyMediterraneanColor =
  | "neutral"
  | "copper"
  | "sand"
  | "sky"
  | "sage"
  | "sienna"
  | "danger";

export type NeuVariant =
  | "filled"
  | "light"
  | "outline"
  | "subtle"
  | "ghost"
  | "glass";
```

`LegacyMediterraneanColor` is theme-internal only. Public component props use `NeuColor`.

## Theme Tokens

Components consume semantic slots. Themes own palette mapping.

```ts
export interface NeuThemeColorScale {
  bg: string;
  bgHover: string;
  bgActive: string;
  border: string;
  text: string;
  textOnSolid: string;
  focus: string;
}

export interface NeuTheme {
  name: string;
  colors: Record<NeuColor, NeuThemeColorScale>;
  palette: Record<NeuPaletteRole, string>;
  radius: Record<NeuRadius, string>;
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
}
```

Recommended default semantic mapping:

```ts
export const mediterraneanColorMap = {
  primary: "copper",
  primaryAlt: "soft-copper",
  brand: "copper",
  brandAlt: "sand",
  neutral: "stone",
  neutralAlt: "travertine",
  info: "sky",
  infoAlt: "sea-glass",
  success: "sage",
  successAlt: "olive",
  warning: "amber",
  warningAlt: "sun",
  danger: "sienna",
  dangerAlt: "clay",
} satisfies Record<NeuColor, string>;
```

Use plain semantic names first. Use `Alt` only when design needs extra contrast or second accent.

`primary` vs `brand`:

- `primary`: primary action, active state, selected item.
- `brand`: brand/decorative accent, logo-ish treatment, theme identity.
- In many themes these may map to same base palette. That is acceptable.

## Button

```tsx
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: NeuVariant;
  color?: NeuColor;
  size?: NeuSize;
  radius?: NeuRadius;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

<Button color="primary" variant="filled" leftSection={<IconPlus />}>
  Add property
</Button>
```

## IconButton

```tsx
export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: NeuVariant;
  color?: NeuColor;
  size?: NeuSize;
  radius?: NeuRadius;
  loading?: boolean;
}

<IconButton aria-label="Search" variant="outline" color="primary">
  <IconSearch />
</IconButton>
```

## Card

```tsx
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "plain" | "glass" | "elevated" | "inset";
  padding?: NeuSize;
  radius?: NeuRadius;
  interactive?: boolean;
}

<Card variant="glass" padding="md">
  <Card.Header>
    <Card.Title>Villa Amalfi</Card.Title>
    <Card.Description>Positano, Italy</Card.Description>
  </Card.Header>
  <Card.Content>...</Card.Content>
</Card>
```

## Badge

```tsx
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: NeuColor;
  variant?: "light" | "filled" | "outline" | "dot";
  size?: NeuSize;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

<Badge color="success">Confirmed</Badge>
```

## Section Groups

Use where one side needs 2-3 icons/buttons/badges.

```tsx
export interface SectionGroupProps {
  children: React.ReactNode;
  gap?: "xs" | "sm" | "md";
  divider?: boolean;
}

export type InputGroupProps = SectionGroupProps;
export type SelectGroupProps = SectionGroupProps;

<TextField
  leftSection={
    <InputGroup>
      <IconSearch />
      <Badge color="info">AI</Badge>
    </InputGroup>
  }
  rightSection={
    <InputGroup>
      <IconButton aria-label="Clear"><IconX /></IconButton>
      <IconButton aria-label="Voice"><IconMicrophone /></IconButton>
    </InputGroup>
  }
/>

<Select
  label="Property"
  leftSection={
    <SelectGroup>
      <IconBuilding />
      <Badge color="brand">Villa</Badge>
    </SelectGroup>
  }
  rightSection={
    <SelectGroup>
      <IconButton aria-label="Clear"><IconX /></IconButton>
    </SelectGroup>
  }
  data={properties}
/>
```

## TextField

```tsx
export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: NeuSize;
  radius?: NeuRadius;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
}

<TextField
  label="Full name"
  placeholder="Sofia Esposito"
  description="As it appears on passport"
/>
```

## Textarea

```tsx
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: NeuSize;
  radius?: NeuRadius;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  fullWidth?: boolean;
}
```

## OTPField

Base UI-backed. Useful for auth prototypes.

```tsx
export interface OTPFieldProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  length?: number;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  size?: NeuSize;
}

<OTPField
  label="Verification code"
  length={6}
  onValueChange={setCode}
/>
```

## Select

Base UI-backed.
Use for small fixed option sets, roughly 2-5 choices.
Do not overload with search/autocomplete.

```tsx
export interface SelectItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  description?: React.ReactNode;
}

export interface SelectOptionGroup {
  label: React.ReactNode;
  items: SelectItem[];
}

export interface SelectProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  placeholder?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  data: Array<SelectItem | SelectOptionGroup | string>;
  clearable?: boolean;
  disabled?: boolean;
  size?: NeuSize;
  radius?: NeuRadius;
  fullWidth?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

<Select
  label="Region"
  placeholder="Choose region"
  data={[
    { label: "Italy", items: ["Amalfi Coast", "Tuscany", "Sicily"].map(toItem) },
  ]}
/>
```

## Combobox

Base UI-backed.
Use for searchable lists, autocomplete, larger option sets, async lookup, and future multiselect-style flows.

```tsx
export interface ComboboxItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  description?: React.ReactNode;
}

export interface ComboboxProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  placeholder?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  data: ComboboxItem[];
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  emptyMessage?: React.ReactNode;
  size?: NeuSize;
  radius?: NeuRadius;
  fullWidth?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

<Combobox
  label="Property"
  placeholder="Search properties"
  data={properties}
  onValueChange={setPropertyId}
/>
```

## SegmentedControl

Base UI `toggle-group` or `tabs` backed.

```tsx
export interface SegmentedControlItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  data: Array<string | SegmentedControlItem>;
  size?: NeuSize;
  color?: NeuColor;
  fullWidth?: boolean;
  disabled?: boolean;
}

<SegmentedControl
  value={view}
  onValueChange={setView}
  data={["All", "Active", "Pending", "Cancelled"]}
/>
```

## Switch

Base UI-backed.

```tsx
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  size?: NeuSize;
  color?: NeuColor;
}
```

## Dialog

Base UI-backed.

```tsx
export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnOverlayClick?: boolean;
}

<Dialog open={open} onOpenChange={setOpen} title="Reserve stay">
  <Dialog.Body>...</Dialog.Body>
  <Dialog.Footer>
    <Button variant="subtle">Cancel</Button>
    <Button>Confirm</Button>
  </Dialog.Footer>
</Dialog>
```

## Sheet

Base UI `drawer` backed.

```tsx
export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: "bottom" | "left" | "right";
  children?: React.ReactNode;
}

<Sheet open={open} onOpenChange={setOpen} side="bottom" title="Filters">
  ...
</Sheet>
```

## Menu

Base UI-backed.

```tsx
export interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onSelect?: () => void;
}

export interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}
```

## Toast

Base UI-backed (Base UI `toast` primitive manages the queue, viewport, and swipe-to-dismiss; NeuUI supplies styling and the convenience API below).

```tsx
export interface ToastOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  color?: NeuColor;
  duration?: number;
  action?: React.ReactNode;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  placement?: "top" | "bottom";
  maxVisible?: number;
}
```

Mount `ToastProvider` once, at the `AppShell` root (or app root if `AppShell` isn't used). It renders the viewport via portal; nothing else needs wiring.

Imperative trigger, callable from anywhere (event handlers, async callbacks, outside React tree) — no need to thread props down:

```tsx
export interface NeuToast {
  (options: ToastOptions): string; // returns toast id
  success: (options: ToastOptions | string) => string;
  error: (options: ToastOptions | string) => string;
  info: (options: ToastOptions | string) => string;
  warning: (options: ToastOptions | string) => string;
  dismiss: (id?: string) => void; // omit id to dismiss all
  update: (id: string, options: Partial<ToastOptions>) => void;
}

export const toast: NeuToast;
```

```tsx
toast.success({ title: "Booking confirmed", description: "Villa Amalfi, Jul 12–19" });
toast.error("Could not save changes");

const id = toast({ title: "Uploading…", duration: Infinity });
// later
toast.update(id, { title: "Upload complete", color: "success", duration: 3000 });
```

`toast.success/error/info/warning` variants are shorthand that set `color` and accept either a string (used as `title`) or a full `ToastOptions` object. `duration: Infinity` (or omitted with `action` present) keeps a toast open until dismissed or updated — used for in-progress states.

A `useToast()` hook is not needed: `toast()` works outside React (no provider lookup required at call time) as long as `ToastProvider` is mounted somewhere in the tree.

## BottomNav

Current `Navbar`, renamed for clarity.

```tsx
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface BottomNavProps {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  maxItems?: number;
}

<BottomNav items={items} activeId="home" onSelect={setActive} />
```

## Sidebar

Desktop source list.

```tsx
export interface SidebarSection {
  id: string;
  label?: React.ReactNode;
  items: NavItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsed?: boolean;
  footer?: React.ReactNode;
}
```

## Toolbar

Desktop title/action strip.

```tsx
export interface ToolbarProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  search?: React.ReactNode;
}

<Toolbar
  title="Bookings"
  leading={<IconButton aria-label="Back"><IconChevronLeft /></IconButton>}
  actions={<Button>New booking</Button>}
/>
```

## AppShell

Responsive mobile/desktop shell.
V1 stays intentionally narrow: mobile bottom nav, desktop sidebar, optional toolbar.
Inspector panes and advanced split views come later when real app screens need them.

```tsx
export interface AppShellProps {
  title?: React.ReactNode;
  nav: NavItem[] | SidebarSection[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  mobileNav?: "bottom" | "none";
  desktopNav?: "sidebar" | "topbar" | "none";
  toolbar?: React.ReactNode;
  inspector?: React.ReactNode;
  children: React.ReactNode;
}

<AppShell
  title="Bookings"
  nav={nav}
  activeId={active}
  onNavigate={setActive}
  toolbar={<Toolbar actions={<Button>New</Button>} />}
>
  <BookingsPage />
</AppShell>
```

## StatCard

```tsx
export type TrendDirection = "up" | "down" | "neutral";

export interface StatCardTrend {
  label: string;
  direction: TrendDirection;
}

export interface StatCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  trend?: StatCardTrend;
  icon?: React.ReactNode;
  color?: NeuColor;
  accent?: boolean;
}
```

## Data Display: Which Component To Use

Three components look similar but solve different problems — keep all three, pick by shape of data, not by habit:

- **`KeyValueList`** — a fixed set of label/value pairs describing *one* thing (a detail panel, a summary card). No rows are interactive, no selection, no per-row actions. Example: a property's facts (address, beds, host) on a single booking detail screen.
- **`DataList`** — a vertical list of *records*, each with the same shape (title/subtitle/meta/badge), often selectable, mobile-first. Use when rows represent entities a user picks from or taps into. Example: a list of bookings or search results on a phone screen.
- **`Table`** — *tabular* data with more than ~2 columns where users compare values across rows/columns, optionally with custom cell rendering per column. Desktop-leaning. Example: a finance/admin grid with sortable numeric columns.

Rule of thumb: one entity's details → `KeyValueList`. A scrollable list of cards/rows → `DataList`. A grid you'd reach for a spreadsheet to represent → `Table`.

## KeyValueList

```tsx
export interface KeyValueItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface KeyValueListProps {
  items: KeyValueItem[];
  caption?: React.ReactNode;
  split?: string; // grid-template-columns ratio, e.g. "38% 62%"
}

<KeyValueList
  caption="Property"
  items={[
    { label: "Address", value: "Via Roma 12, Positano" },
    { label: "Host", value: "Sofia Esposito" },
  ]}
/>
```

## DataList

Replaces/expands `ListBox`.

```tsx
export interface DataListItem {
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  value?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DataListProps {
  items: DataListItem[];
  caption?: React.ReactNode;
  selectedId?: string;
  onSelect?: (id: string) => void;
  variant?: "plain" | "grouped" | "inset";
}
```

## Table

Custom. Keep simple.

```tsx
export interface TableColumn<Row> {
  key: keyof Row | string;
  label: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: Row) => React.ReactNode;
}

export interface TableProps<Row extends Record<string, unknown>> {
  columns: TableColumn<Row>[];
  data: Row[];
  caption?: React.ReactNode;
  getRowKey?: (row: Row, index: number) => string;
  striped?: boolean;
  hover?: boolean;
}
```

## DateField

Phase 1 native fallback. Not full date picker.

```tsx
export interface DateFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: NeuSize;
  fullWidth?: boolean;
}

<DateField label="Check-in" min={today} />
```

## API Questions

- `color` vs `tone`: decided `color`.
- Colour values: decided semantic names, not palette names.
- Size values: decided `sm | md | lg` for most components.
- `leftSection/rightSection` vs `leftIcon/rightIcon`: recommend `leftSection/rightSection`. Allows text, badge, spinner.
- Grouped side sections: decided add `InputGroup` / `SelectGroup` style helpers.
- `onChange` vs Base UI `onValueChange`: decided `onValueChange`.
- Compound `Card.Header` style: decided yes for all relevant components.
- `Navbar` rename: decided `BottomNav`.
