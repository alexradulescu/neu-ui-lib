import {
  SegmentedControl as MantineSegmentedControl,
  type SegmentedControlProps as MantineProps,
} from "@mantine/core";

// ─── Mediterranean SegmentedControl ──────────────────────────────────────────
// Pill-shaped toggle strip — the most iconic native iOS control.
// Slots: 2–5 segments. Active segment slides a copper gradient indicator.
// Adapts to dark/light mode via CSS vars.

export type SegmentedControlProps = MantineProps;

export function SegmentedControl(props: SegmentedControlProps) {
  return (
    <MantineSegmentedControl
      {...props}
      styles={{
        root: {
          background: "var(--med-color-surface-deep)",
          border: "1px solid var(--med-color-border)",
          borderRadius: "999px",
          padding: "3px",
          gap: "1px",
        },
        indicator: {
          background:
            "linear-gradient(135deg, #C68D4A 0%, #B87333 60%, #9A5E25 100%)",
          borderRadius: "999px",
          boxShadow:
            "0 2px 8px rgba(120, 80, 40, 0.28), inset 0 1px 0 rgba(255, 230, 180, 0.22)",
          // Remove any default border Mantine may add
          border: "none",
        },
        label: {
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "var(--med-color-text-secondary)",
          padding: "5px 16px",
          borderRadius: "999px",
          transition: "color 200ms ease",
          "&[data-active]": {
            color: "#FFFFFF",
          },
        },
        // Hide the radio input visually
        input: {
          display: "none",
        },
      }}
    />
  );
}
