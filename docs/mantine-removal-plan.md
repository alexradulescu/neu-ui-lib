# Mantine Removal Plan

## Executive View

- Goal: NeuUI = fast Apple-like PWA prototype kit.
- Mobile first: iOS bottom nav, sheets, grouped lists, glass cards.
- Desktop second: macOS sidebar, title bar, toolbar, menu bar, split panes.
- Keep: React 19, Base UI, CSS tokens, styled-static if still useful.
- Remove: Mantine core, Mantine dates, Mantine hooks, Mantine provider/theme.
- Avoid: Tailwind consumer setup, public-library complexity, full HeroUI parity.

## Intent

- NeuUI is not external component library.
- NeuUI is personal/internal prototype accelerator.
- Primary use: build good-looking iOS-like PWA apps fast.
- Secondary use: support desktop layouts that feel closer to macOS apps than generic web dashboards.
- Desired feel:
  - calm
  - native-ish
  - glassy
  - warm
  - compact
  - consistent
  - high-trust by default
- Desired API:
  - Mantine-simple
  - Apple-ish output
  - Base UI behavior underneath where useful
  - no Tailwind requirement
  - no large provider ceremony
- Theme direction:
  - semantic colours, not palette names in component APIs
  - support multiple visual themes:
    - Mediterranean warm glass
    - Greek white-blue
    - light macOS blue-grey
    - warm macOS cream
    - dark graphite
    - dark purple/accent
  - components ask for `color="primary"` or `color="success"`, not `color="copper"`
  - `Alt` colours exist for second accent/secondary states inside rich themes
- Success: new app screen can be built quickly without design thrash.
- Non-goal: match HeroUI component count.
- Non-goal: publish polished public package.
- Non-goal: support every edge-case component on day one.

## Review Process

- Three reviewers before implementation:
  - Alex: product taste, API feel, prototype workflow fit.
  - Claude: independent architecture/API review.
  - Codex: repo-grounded implementation review.
- Review order:
  - Read intent first.
  - Review API sketches second.
  - Challenge scope third.
  - Approve migration phases last.
- Feedback expected:
  - rename props/components
  - cut low-value components
  - adjust phase order
  - flag Base UI misuse
  - flag visual/API mismatch with Apple-like goal
- User API decisions already made:
  - sizes: most components use `sm | md | lg`
  - text/typography can have broader scale
  - prop name is `color`, not `tone`
  - colours are semantic: `primary`, `brand`, `info`, `success`, `warning`, `danger`, etc.
  - alt colours allowed: `primaryAlt`, `neutralAlt`, etc.
  - keep `leftSection` / `rightSection`
  - add grouped section helpers for richer input/select sides
  - keep `onValueChange`
  - use compound names where relevant: `Card.Header`, `Dialog.Footer`, etc.
  - rename `Navbar` to `BottomNav`
- Implementation starts only after review feedback lands.

## Current State

- React 19 already in place.
- Base UI already installed.
- Mantine still powers most demo widgets.
- Custom NeuUI exists, but narrow:
  - `Navbar`
  - `ListBox`
  - `MedTable`
  - `KeyValueList`
  - `StatCard`
  - `Badge` type only
- Visual identity strong.
- Component system not real yet.

## Existing Component Migration

Every component currently in `src/components/` moves into `src/ui/components/` — none are deleted outright, all get brought up to the API sketch contract (not just relocated as-is).

- `Navbar.tsx` → `ui/components/BottomNav.tsx`
  - Rename type `NavbarItem` → `NavItem`, `NavbarProps` → `BottomNavProps`.
  - Add `badge?: React.ReactNode` and `disabled?: boolean` per item (sketch has these, current component doesn't).
  - Add `maxItems` prop; replace hardcoded `items.slice(0, 6)` with it.
- `ListBox.tsx` → `ui/components/DataList.tsx`
  - Drop the Mantine `Badge` import — last remaining Mantine dependency in `src/components/`, must go in Phase 1, not later.
  - Rename `ListBoxItem` → `DataListItem`; map `name → title`, `subtitle → subtitle`, `meta → meta`, `value → value`, `status/statusVariant → badge` (render a NeuUI `Badge` from the consumer side or via a `badge` render prop).
  - Add `variant?: "plain" | "grouped" | "inset"` per the sketch; current component only renders one flat style.
- `KeyValueList.tsx` → `ui/components/KeyValueList.tsx`
  - Keep as-is functionally (label/value rows, custom `split` ratio) — already matches its intended use case, just needs the move and a pass with the shared `Card`/glass surface tokens instead of its own `css.glass` class.
- `MedTable.tsx` (`Table.tsx`) → `ui/components/Table.tsx`
  - Rename `MedTableProps` → `TableProps<Row>`, make `columns`/`data` generic over `Row` instead of `Record<string, unknown>` (sketch already specifies this).
  - Add `striped?: boolean` and `hover?: boolean` — present in the sketch, missing from the current implementation.
- `StatCard.tsx` → `ui/components/StatCard.tsx`
  - Add `color?: NeuColor` prop (sketch has it; current component only supports a boolean `accent` flag with a hardcoded accent color var).
  - Replace hardcoded trend hex colors (`#4A7828`, `#B82D26`) with theme color tokens once the semantic color system lands, so trend colors follow the active theme instead of being Mediterranean-only.
- `Badge.tsx` → `ui/components/Badge.tsx`
  - Currently only exports the `MedBadgeVariant` type, no component. Build the actual `Badge` component per the API sketch (`color`, `variant`, `size`, `leftSection`/`rightSection`) — this unblocks the `ListBox`/`DataList` migration above, since it removes the need for Mantine's `Badge`.

## Mantine Usage To Remove

- `src/main.tsx`
  - `MantineProvider`
  - Mantine CSS imports
  - Mantine color scheme resolver
- `src/theme/mediterranean.ts`
  - Mantine theme object
  - Mantine component overrides
  - Mantine color tuples
- `src/routes/index.tsx`
  - `Button`
  - `ActionIcon`
  - `Card`
  - `Modal`
  - `SegmentedControl`
  - `Select`
  - `TextInput`
  - `Badge`
  - `DatePickerInput`
  - `useMantineColorScheme`
- `src/components/ListBox.tsx`
  - Mantine `Badge`
- `package.json`
  - `@mantine/core`
  - `@mantine/dates`
  - `@mantine/hooks`

## Base UI Coverage

- Good Base UI fit:
  - Button
  - Dialog
  - Drawer
  - Select
  - Combobox
  - Menu
  - Menubar
  - Popover
  - Tooltip
  - Toast
  - Tabs
  - Toggle group
  - Switch
  - Checkbox
  - Radio group
  - Slider
  - Number field
  - Accordion
  - Avatar
  - Scroll area
  - Progress
  - Meter
- Custom NeuUI fit:
  - Card
  - Badge
  - StatCard
  - KeyValueList
  - DataList
  - Table
  - AppShell
  - Sidebar
  - BottomNav
  - Toolbar
- Gap:
  - Date picker/calendar. Base UI has no full date picker.

## Date Picker Decision

- Recommendation: do not keep Mantine for date picker.
- Phase 1: use native `input[type="date"]` wrapper.
- Phase 2: add optional richer date picker using React Aria Date/Calendar or custom small calendar.
- Reason: one Mantine date picker keeps whole Mantine weight and theme model alive.

## Target Folder Shape

```txt
src/
  ui/
    primitives/
      button.tsx
      dialog.tsx
      drawer.tsx
      select.tsx
      tabs.tsx
      switch.tsx
      menu.tsx
      toast.tsx
    components/
      AppShell.tsx
      BottomNav.tsx
      Sidebar.tsx
      Toolbar.tsx
      Card.tsx
      Badge.tsx
      StatCard.tsx
      TextField.tsx
      DateField.tsx
      DataList.tsx
      Table.tsx
    styles/
      tokens.css
      components.module.css
    index.ts
  routes/
    index.tsx
  styles/
    app.css
```

## Migration Phases

### Phase 0: Lock Direction

- Switch package manager to Bun first, before any component work:
  - Delete `package-lock.json`.
  - `bun install` to generate `bun.lock`.
  - Add `"packageManager": "bun@1.3.8"` to `package.json`.
  - Swap scripts to run through `bun` (`bun run dev`, `bun run build`, `bun run preview`).
  - Confirm `bun run build` (vite build + tsc) passes before touching Mantine.
- Add docs.
- Decide API names (see `neu-ui-api-sketch.md`).

### Phase 1: Remove Easy Mantine Widgets

- Create NeuUI:
  - `Badge`
  - `Card`
  - `Button`
  - `IconButton`
  - `TextField`
  - `SegmentedControl`
- Replace demo imports.
- Keep visuals same or better.
- No Base UI needed for `Card`/`Badge`.
- `Button`/`IconButton` are Base UI-backed (wrap Base UI's unstyled button primitive) for consistent focus-visible, disabled, and pressed states across the system. No plain-native-button fallback — keep one implementation.

### Phase 2: Replace Overlays And Pickers

- Create:
  - `Dialog`
  - `Sheet`
  - `Select`
  - `Menu`
  - `Popover`
  - `Tooltip`
  - `Toast`
- Use Base UI for focus management, keyboard nav, escape, portals.
- Replace Mantine `Modal` and `Select`.
- Date picker: replace with `DateField`.

### Phase 3: App Layout System

- Create:
  - `AppShell`
  - `BottomNav`
  - `Sidebar`
  - `TopBar`
  - `Toolbar`
  - `Pane`
- Mobile:
  - bottom nav
  - sheets
  - stacked content
- Desktop:
  - source-list sidebar
  - title/toolbar
  - main/detail/inspector panes

### Phase 4: Delete Mantine

- Remove provider.
- Remove Mantine CSS.
- Remove Mantine theme file.
- Remove packages.
- Run:
  - `rg "@mantine|Mantine"`
  - `bun run build`

### Phase 5: AI Docs

- Add:
  - `AGENTS.md`
  - `docs/neu-ui.md`
  - `docs/component-recipes.md`
  - `docs/design-tokens.md`
- Goal: Codex can build new app screens in NeuUI style fast.

## Done Criteria

- `rg "@mantine|Mantine"` returns empty.
- `bun run build` passes.
- Demo page uses only NeuUI exports.
- Mobile screenshot matches current quality.
- Desktop screenshot shows macOS-like layout.
- Components have stable props, variants, sizes, disabled/loading/error states.
- No Tailwind dependency.

## Risks

- Rebuilding select/dialog/sheet takes care. Base UI solves behavior, not styling.
- Date picker needs separate decision.
- Visual regressions likely unless screenshots checked.
- Public library polish not needed. Avoid overbuilding.

## Recommendation

- Keep NeuUI.
- Remove Mantine.
- Use Base UI as behavior layer.
- Build Apple-like app kit, not HeroUI clone.
- Prioritize layout primitives and common form/actions.
