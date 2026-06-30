import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Select as BaseSelect } from "@base-ui/react/select";

export type NeuSize = "sm" | "md" | "lg";
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
export type NeuVariant = "filled" | "light" | "outline" | "subtle" | "ghost" | "glass";

function cx(...classes: Array<string | false | null | undefined | 0 | "">) {
  return classes.filter(Boolean).join(" ");
}

type ButtonBaseProps = Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
  variant?: NeuVariant;
  color?: NeuColor;
  size?: NeuSize;
  radius?: NeuRadius;
  fullWidth?: boolean;
  loading?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      className,
      children,
      variant = "filled",
      color = "primary",
      size = "md",
      radius = "pill",
      fullWidth = false,
      loading = false,
      disabled,
      leftSection,
      rightSection,
      ...props
    },
    ref,
  ) => (
    <BaseButton
      {...props}
      ref={ref}
      disabled={disabled || loading}
      className={cx(
        "neu-btn",
        `neu-size-${size}`,
        `neu-variant-${variant}`,
        `neu-color-${color}`,
        `neu-radius-${radius}`,
        fullWidth && "neu-full-width",
        loading && "neu-loading",
        className,
      )}
    >
      {loading && <span className="neu-spinner" aria-hidden="true" />}
      {leftSection && <span className="neu-btn-section">{leftSection}</span>}
      <span className="neu-btn-label">{children}</span>
      {rightSection && <span className="neu-btn-section">{rightSection}</span>}
    </BaseButton>
  ),
);
Button.displayName = "Button";

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonBaseProps, "leftSection" | "rightSection" | "fullWidth">
>(({ className, children, variant = "outline", size = "md", radius = "pill", ...props }, ref) => (
  <Button
    {...props}
    ref={ref}
    variant={variant}
    size={size}
    radius={radius}
    className={cx("neu-icon-btn", className)}
  >
    {children}
  </Button>
));
IconButton.displayName = "IconButton";

export interface SectionGroupProps {
  children: React.ReactNode;
  gap?: "xs" | "sm" | "md";
  divider?: boolean;
}

export function InputGroup({ children, gap = "sm", divider = false }: SectionGroupProps) {
  return <span className={cx("neu-section-group", `neu-gap-${gap}`, divider && "neu-section-divider")}>{children}</span>;
}

export const SelectGroup = InputGroup;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: NeuColor;
  variant?: "light" | "filled" | "outline" | "dot";
  size?: NeuSize;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

export function Badge({
  className,
  children,
  color = "neutral",
  variant = "light",
  size = "sm",
  leftSection,
  rightSection,
  ...props
}: BadgeProps) {
  return (
    <span className={cx("neu-badge", `neu-badge-${variant}`, `neu-color-${color}`, `neu-size-${size}`, className)} {...props}>
      {variant === "dot" && <span className="neu-badge-dot" aria-hidden="true" />}
      {leftSection && <span className="neu-btn-section">{leftSection}</span>}
      {children}
      {rightSection && <span className="neu-btn-section">{rightSection}</span>}
    </span>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "plain" | "glass" | "elevated" | "inset";
  padding?: NeuSize;
  radius?: NeuRadius;
  interactive?: boolean;
}

function CardRoot({
  className,
  variant = "glass",
  padding = "md",
  radius = "lg",
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cx(
        "neu-card",
        `neu-card-${variant}`,
        `neu-pad-${padding}`,
        `neu-radius-${radius}`,
        interactive && "neu-card-interactive",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("neu-card-header", props.className)} />;
}

function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={cx("neu-card-title", props.className)} />;
}

function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={cx("neu-card-description", props.className)} />;
}

function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("neu-card-content", props.className)} />;
}

function CardFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("neu-card-footer", props.className)} />;
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: NeuSize;
  radius?: NeuRadius;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      description,
      error,
      size = "md",
      radius = "pill",
      leftSection,
      rightSection,
      fullWidth = true,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = React.useId();
    const resolvedId = id ?? inputId;
    return (
      <label className={cx("neu-field", fullWidth && "neu-full-width", className)} htmlFor={resolvedId}>
        {label && <span className="neu-label">{label}</span>}
        <span className={cx("neu-input-shell", `neu-size-${size}`, `neu-radius-${radius}`, Boolean(error) && "neu-invalid")}>
          {leftSection && <span className="neu-input-section">{leftSection}</span>}
          <input ref={ref} id={resolvedId} className="neu-input" aria-invalid={Boolean(error) || undefined} {...props} />
          {rightSection && <span className="neu-input-section">{rightSection}</span>}
        </span>
        {description && !error && <span className="neu-description">{description}</span>}
        {error && <span className="neu-error">{error}</span>}
      </label>
    );
  },
);
TextField.displayName = "TextField";

export type DateFieldProps = Omit<TextFieldProps, "type">;

export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>((props, ref) => (
  <TextField ref={ref} type="date" {...props} />
));
DateField.displayName = "DateField";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: NeuSize;
  radius?: NeuRadius;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, description, error, size = "md", radius = "lg", fullWidth = true, id, ...props }, ref) => {
    const inputId = React.useId();
    const resolvedId = id ?? inputId;
    return (
      <label className={cx("neu-field", fullWidth && "neu-full-width", className)} htmlFor={resolvedId}>
        {label && <span className="neu-label">{label}</span>}
        <textarea
          ref={ref}
          id={resolvedId}
          className={cx("neu-textarea", `neu-size-${size}`, `neu-radius-${radius}`, Boolean(error) && "neu-invalid")}
          aria-invalid={Boolean(error) || undefined}
          {...props}
        />
        {description && !error && <span className="neu-description">{description}</span>}
        {error && <span className="neu-error">{error}</span>}
      </label>
    );
  },
);
Textarea.displayName = "Textarea";

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

function normalizeSelectItem(item: SelectItem | string): SelectItem {
  return typeof item === "string" ? { value: item, label: item } : item;
}

function isSelectGroup(item: SelectItem | SelectOptionGroup | string): item is SelectOptionGroup {
  return typeof item === "object" && item !== null && "items" in item;
}

export function Select({
  label,
  description,
  error,
  placeholder = "Select",
  value,
  defaultValue,
  onValueChange,
  data,
  disabled = false,
  size = "md",
  radius = "pill",
  fullWidth = true,
  leftSection,
  rightSection,
}: SelectProps) {
  const items = data.flatMap((item) => (isSelectGroup(item) ? item.items : [normalizeSelectItem(item)]));
  return (
    <div className={cx("neu-field", fullWidth && "neu-full-width")}>
      {label && <span className="neu-label">{label}</span>}
      <BaseSelect.Root
        items={items}
        value={value ?? null}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={(next) => onValueChange?.(next ?? null)}
      >
        <BaseSelect.Trigger
          className={cx("neu-select-trigger", `neu-size-${size}`, `neu-radius-${radius}`, Boolean(error) && "neu-invalid")}
        >
          {leftSection && <span className="neu-input-section">{leftSection}</span>}
          <BaseSelect.Value className="neu-select-value" placeholder={placeholder} />
          <BaseSelect.Icon className="neu-select-icon">⌄</BaseSelect.Icon>
          {rightSection && <span className="neu-input-section">{rightSection}</span>}
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={8} align="start">
            <BaseSelect.Popup className="neu-select-popup">
              {data.map((entry, index) => {
                if (isSelectGroup(entry)) {
                  return (
                    <BaseSelect.Group key={`group-${index}`}>
                      <BaseSelect.GroupLabel className="neu-select-group-label">{entry.label}</BaseSelect.GroupLabel>
                      {entry.items.map((option) => (
                        <BaseSelect.Item
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          className="neu-select-item"
                        >
                          <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                          <BaseSelect.ItemIndicator className="neu-select-indicator">✓</BaseSelect.ItemIndicator>
                        </BaseSelect.Item>
                      ))}
                    </BaseSelect.Group>
                  );
                }
                const option = normalizeSelectItem(entry);
                return (
                  <BaseSelect.Item key={option.value} value={option.value} disabled={option.disabled} className="neu-select-item">
                    <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                    <BaseSelect.ItemIndicator className="neu-select-indicator">✓</BaseSelect.ItemIndicator>
                  </BaseSelect.Item>
                );
              })}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {description && !error && <span className="neu-description">{description}</span>}
      {error && <span className="neu-error">{error}</span>}
    </div>
  );
}

export interface ComboboxItem {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<TextFieldProps, "onValueChange" | "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  data: ComboboxItem[];
  emptyMessage?: React.ReactNode;
}

export function Combobox({ data, value, defaultValue, onValueChange, emptyMessage = "No results", ...props }: ComboboxProps) {
  const [query, setQuery] = React.useState(defaultValue ?? value ?? "");
  const filtered = data.filter((item) => String(item.label).toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="neu-combobox">
      <TextField
        {...props}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          onValueChange?.(event.target.value || null);
        }}
      />
      {query && (
        <Card variant="elevated" padding="sm" className="neu-combobox-list">
          {filtered.length ? (
            filtered.slice(0, 6).map((item) => (
              <button
                key={item.value}
                type="button"
                className="neu-combobox-item"
                disabled={item.disabled}
                onClick={() => {
                  setQuery(String(item.label));
                  onValueChange?.(item.value);
                }}
              >
                <span>{item.label}</span>
                {item.description && <small>{item.description}</small>}
              </button>
            ))
          ) : (
            <div className="neu-empty">{emptyMessage}</div>
          )}
        </Card>
      )}
    </div>
  );
}

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

export function SegmentedControl({
  value,
  defaultValue,
  onValueChange,
  data,
  size = "md",
  color = "primary",
  fullWidth = false,
  disabled = false,
}: SegmentedControlProps) {
  const options = data.map((item) => (typeof item === "string" ? { value: item.toLowerCase(), label: item } : item));
  const [internal, setInternal] = React.useState(defaultValue ?? options[0]?.value);
  const active = value ?? internal;
  return (
    <div className={cx("neu-segmented", `neu-size-${size}`, `neu-color-${color}`, fullWidth && "neu-full-width")}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled || option.disabled}
          aria-pressed={active === option.value}
          className="neu-segment"
          onClick={() => {
            setInternal(option.value);
            onValueChange?.(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

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

function DialogRoot({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
  closeOnOverlayClick = true,
}: DialogProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
      disablePointerDismissal={!closeOnOverlayClick}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="neu-dialog-backdrop" />
        <BaseDialog.Popup className={cx("neu-dialog", `neu-dialog-${size}`)}>
          <div className="neu-dialog-head">
            <div>
              {title && <BaseDialog.Title className="neu-dialog-title">{title}</BaseDialog.Title>}
              {description && <BaseDialog.Description className="neu-dialog-description">{description}</BaseDialog.Description>}
            </div>
            <BaseDialog.Close className="neu-dialog-close" aria-label="Close">×</BaseDialog.Close>
          </div>
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

function DialogBody(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("neu-dialog-body", props.className)} />;
}

function DialogFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("neu-dialog-footer", props.className)} />;
}

export const Dialog = Object.assign(DialogRoot, {
  Body: DialogBody,
  Footer: DialogFooter,
});

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

export function StatCard({ label, value, trend, icon, color = "primary", accent = false }: StatCardProps) {
  return (
    <Card className="neu-stat-card">
      {icon && <div className={cx("neu-stat-icon", `neu-color-${color}`)}>{icon}</div>}
      <p className="neu-stat-label">{label}</p>
      <p className={cx("neu-stat-value", accent && `neu-text-${color}`)}>{value}</p>
      {trend && (
        <div className={cx("neu-trend", `neu-trend-${trend.direction}`)}>
          <span className="neu-trend-dot" />
          <span>{trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "–"} {trend.label}</span>
        </div>
      )}
    </Card>
  );
}

export interface KeyValueItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface KeyValueListProps {
  items: KeyValueItem[];
  caption?: React.ReactNode;
  split?: string;
}

export function KeyValueList({ items, caption, split = "38% 62%" }: KeyValueListProps) {
  return (
    <Card padding="sm" className="neu-kv">
      {caption && <div className="neu-caption">{caption}</div>}
      {items.map((item, index) => (
        <div key={index} className="neu-kv-row" style={{ gridTemplateColumns: split }}>
          <span className="neu-kv-label">{item.label}</span>
          <span className="neu-kv-value">{item.value}</span>
        </div>
      ))}
    </Card>
  );
}

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

export function DataList({ items, caption, selectedId, onSelect, variant = "grouped" }: DataListProps) {
  return (
    <Card padding="sm" className={cx("neu-data-list", `neu-data-list-${variant}`)}>
      {caption && <div className="neu-caption">{caption}</div>}
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="neu-data-row"
          disabled={item.disabled}
          aria-pressed={item.id === selectedId}
          onClick={() => onSelect?.(item.id)}
        >
          {item.icon && <span className="neu-data-icon">{item.icon}</span>}
          <span className="neu-data-main">
            <span className="neu-data-title">{item.title}</span>
            {item.subtitle && <span className="neu-data-subtitle">{item.subtitle}</span>}
            {item.meta && <span className="neu-data-meta">{item.meta}</span>}
          </span>
          <span className="neu-data-side">
            {item.badge}
            {item.value && <span className="neu-data-value">{item.value}</span>}
          </span>
        </button>
      ))}
    </Card>
  );
}

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

export function Table<Row extends Record<string, unknown>>({
  columns,
  data,
  caption,
  getRowKey,
  striped = true,
  hover = true,
}: TableProps<Row>) {
  return (
    <Card padding="sm" className="neu-table-card">
      <div className="neu-table-scroll">
        <table className={cx("neu-table", striped && "neu-table-striped", hover && "neu-table-hover")}>
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} style={{ width: column.width, textAlign: column.align ?? "left" }}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={getRowKey ? getRowKey(row, index) : String(index)}>
                {columns.map((column) => {
                  const value = row[column.key as keyof Row];
                  return (
                    <td key={String(column.key)} style={{ textAlign: column.align ?? "left" }}>
                      {column.render ? column.render(value, row) : String(value ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

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

export function BottomNav({ items, activeId, onSelect, maxItems = 6 }: BottomNavProps) {
  return (
    <nav className="neu-bottom-nav" aria-label="Primary">
      {items.slice(0, maxItems).map((item) => (
        <button
          key={item.id}
          type="button"
          className="neu-bottom-nav-item"
          disabled={item.disabled}
          aria-current={item.id === activeId ? "page" : undefined}
          onClick={() => onSelect?.(item.id)}
        >
          <span className="neu-bottom-nav-icon">{item.icon}</span>
          <span className="neu-bottom-nav-label">{item.label}</span>
          {item.badge && <span className="neu-bottom-nav-badge">{item.badge}</span>}
        </button>
      ))}
    </nav>
  );
}

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

export function Sidebar({ sections, activeId, onSelect, collapsed = false, footer }: SidebarProps) {
  return (
    <aside className={cx("neu-sidebar", collapsed && "neu-sidebar-collapsed")}>
      <div className="neu-traffic-lights" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {sections.map((section) => (
        <section key={section.id} className="neu-sidebar-section">
          {section.label && <div className="neu-sidebar-label">{section.label}</div>}
          {section.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="neu-sidebar-item"
              disabled={item.disabled}
              aria-current={item.id === activeId ? "page" : undefined}
              onClick={() => onSelect?.(item.id)}
            >
              <span className="neu-sidebar-icon">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && <span className="neu-sidebar-badge">{item.badge}</span>}
            </button>
          ))}
        </section>
      ))}
      {footer && <div className="neu-sidebar-footer">{footer}</div>}
    </aside>
  );
}

export interface ToolbarProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  search?: React.ReactNode;
}

export function Toolbar({ title, subtitle, leading, actions, search }: ToolbarProps) {
  return (
    <header className="neu-toolbar">
      {leading && <div className="neu-toolbar-leading">{leading}</div>}
      <div className="neu-toolbar-title-wrap">
        {title && <h1 className="neu-toolbar-title">{title}</h1>}
        {subtitle && <p className="neu-toolbar-subtitle">{subtitle}</p>}
      </div>
      {search && <div className="neu-toolbar-search">{search}</div>}
      {actions && <div className="neu-toolbar-actions">{actions}</div>}
    </header>
  );
}

export interface AppShellProps {
  title?: React.ReactNode;
  nav: NavItem[] | SidebarSection[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

function navToSections(nav: NavItem[] | SidebarSection[]): SidebarSection[] {
  if (nav.length > 0 && nav[0] && "items" in nav[0]) return nav as SidebarSection[];
  return [{ id: "main", items: nav as NavItem[] }];
}

function navToItems(nav: NavItem[] | SidebarSection[]): NavItem[] {
  return navToSections(nav).flatMap((section) => section.items);
}

export function AppShell({ title, nav, activeId, onNavigate, toolbar, children }: AppShellProps) {
  return (
    <div className="neu-app-shell">
      <div className="neu-desktop-shell">
        <Sidebar sections={navToSections(nav)} activeId={activeId} onSelect={onNavigate} />
        <main className="neu-shell-main">
          {toolbar ?? <Toolbar title={title} />}
          <div className="neu-shell-content">{children}</div>
        </main>
      </div>
      <div className="neu-mobile-shell">
        <main className="neu-mobile-main">
          {toolbar ?? <Toolbar title={title} />}
          <div className="neu-shell-content">{children}</div>
        </main>
        <BottomNav items={navToItems(nav)} activeId={activeId} onSelect={onNavigate} />
      </div>
    </div>
  );
}

export function useThemeMode() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme: () => setTheme((next) => (next === "dark" ? "light" : "dark")),
  };
}
