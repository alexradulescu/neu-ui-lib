import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import { medInputStyles, medCompactInputStyles, medInputWrapperOrder } from "@/theme/inputStyles";

export interface TextInputProps extends Omit<MantineTextInputProps, "size"> {
  /** Alias for Mantine's `description` prop — renders below the input. */
  hint?: string;
  /** Compact mode: 36px height instead of 44px; font-size stays at 16px (no iOS zoom). */
  compact?: boolean;
}

export function TextInput({ hint, description, compact = false, ...props }: TextInputProps) {
  return (
    <MantineTextInput
      {...props}
      description={hint ?? description}
      inputWrapperOrder={medInputWrapperOrder}
      styles={compact ? medCompactInputStyles : medInputStyles}
    />
  );
}
