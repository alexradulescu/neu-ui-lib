import {
  Select as MantineSelect,
  type SelectProps as MantineSelectProps,
} from "@mantine/core";
import { medInputStyles, medDropdownStyles } from "@/theme/inputStyles";

// ─── Mediterranean Select ─────────────────────────────────────────────────────
// Mantine Select with warm glass dropdown and copper accent.

export interface SelectProps extends Omit<MantineSelectProps, "size"> {
  hint?: string;
}

export function Select({ hint, description, styles, ...props }: SelectProps) {
  return (
    <MantineSelect
      {...props}
      description={hint ?? description}
      styles={{
        ...medInputStyles,
        ...medDropdownStyles,
        input: {
          ...medInputStyles.input,
        },
        // Chevron icon colour
        section: {
          color: "#7A6850",
        },
        // Override any caller styles last
        ...(styles as object),
      }}
    />
  );
}
