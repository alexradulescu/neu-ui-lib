import {
  DatePickerInput as MantineDatePickerInput,
  type DatePickerInputProps as MantineDatePickerInputProps,
} from "@mantine/dates";
import { medInputStyles, medDropdownStyles } from "@/theme/inputStyles";

// ─── Mediterranean DatePickerInput ────────────────────────────────────────────
// Mantine DatePickerInput with warm calendar styling — copper selected dates,
// warm stone typography, glass dropdown panel.

export interface DatePickerInputProps
  extends Omit<MantineDatePickerInputProps, "size"> {
  hint?: string;
}

// Shared calendar cell styles
const dayStyles = {
  borderRadius: "8px",
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "0.875rem",
  color: "#2A2118",
  "&[data-selected]": {
    background: "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
    color: "#FAF8F5",
    fontWeight: 600,
  },
  "&[data-today]:not([data-selected])": {
    border: "1.5px solid #B87333",
    color: "#B87333",
    fontWeight: 600,
  },
  "&[data-in-range]": {
    background: "rgba(184, 115, 51, 0.10)",
    color: "#2A2118",
    borderRadius: 0,
  },
  "&[data-first-in-range]": {
    borderRadius: "8px 0 0 8px",
  },
  "&[data-last-in-range]": {
    borderRadius: "0 8px 8px 0",
  },
  "&:hover:not([data-selected]):not([data-disabled])": {
    background: "rgba(180, 155, 120, 0.16)",
  },
  "&[data-disabled]": {
    color: "#C4B090",
    opacity: 0.5,
  },
};

export function DatePickerInput({
  hint,
  description,
  styles,
  ...props
}: DatePickerInputProps) {
  return (
    <MantineDatePickerInput
      {...props}
      description={hint ?? description}
      valueFormat="D MMM YYYY"
      styles={{
        ...medInputStyles,
        ...medDropdownStyles,
        input: {
          ...medInputStyles.input,
        },
        // Calendar header (month/year navigation)
        calendarHeader: {
          marginBottom: "8px",
        },
        calendarHeaderControl: {
          borderRadius: "8px",
          color: "#7A6850",
          "&:hover": {
            background: "rgba(180, 155, 120, 0.16)",
            color: "#2A2118",
          },
        },
        calendarHeaderLevel: {
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "1rem",
          fontWeight: 400,
          color: "#2A2118",
          borderRadius: "8px",
          "&:hover": {
            background: "rgba(180, 155, 120, 0.12)",
          },
        },
        // Weekday labels (Mon Tue Wed…)
        weekday: {
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "#A89880",
          textTransform: "uppercase",
        },
        day: dayStyles,
        // Month list cells (shown when navigating to month view)
        monthsListControl: {
          borderRadius: "8px",
          fontFamily: '"DM Sans", sans-serif',
          color: "#2A2118",
          "&[data-selected]": {
            background: "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
            color: "#FAF8F5",
          },
          "&:hover:not([data-selected])": {
            background: "rgba(180, 155, 120, 0.16)",
          },
        },
        // Year list cells
        yearsListControl: {
          borderRadius: "8px",
          fontFamily: '"DM Sans", sans-serif',
          color: "#2A2118",
          "&[data-selected]": {
            background: "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
            color: "#FAF8F5",
          },
          "&:hover:not([data-selected])": {
            background: "rgba(180, 155, 120, 0.16)",
          },
        },
        // Chevron icon
        section: {
          color: "#7A6850",
        },
        // Override any caller styles last
        ...(styles as object),
      }}
    />
  );
}
