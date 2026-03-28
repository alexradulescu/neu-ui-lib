import {
  Select as MantineSelect,
  type SelectProps as MantineSelectProps,
} from "@mantine/core";
import {
  medInputStyles,
  medDropdownStyles,
  medInputWrapperOrder,
} from "@/theme/inputStyles";

export interface SelectProps extends Omit<MantineSelectProps, "size"> {
  hint?: string;
}

export function Select({ hint, description, ...props }: SelectProps) {
  return (
    <MantineSelect
      {...props}
      withCheckIcon={false}
      description={hint ?? description}
      inputWrapperOrder={medInputWrapperOrder}
      styles={{
        ...medInputStyles,
        ...medDropdownStyles,
        input: {
          ...medInputStyles.input,
          // Right-side padding to avoid overlap with the chevron icon
          paddingRight: "36px",
          cursor: "default",
        },
        section: {
          color: "#A89880",
        },
      }}
    />
  );
}
