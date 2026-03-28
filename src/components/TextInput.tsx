import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import { medInputStyles, medCompactInputStyles, medInputWrapperOrder } from "@/theme/inputStyles";

export interface TextInputProps extends Omit<MantineTextInputProps, "size"> {
  /** Alias for Mantine's `description` prop — renders below the input. */
  hint?: string;
  /**
   * Compact mode: uses Mantine's "xs" size (~28px height) but keeps
   * font-size at 1rem (16px) so iOS Safari does not zoom on focus.
   */
  compact?: boolean;
}

export function TextInput({ hint, description, compact = false, ...props }: TextInputProps) {
  return (
    <MantineTextInput
      {...props}
      // Use Mantine's own xs sizing system to get the small height;
      // medCompactInputStyles then overrides font-size back to 1rem.
      size={compact ? "xs" : "md"}
      description={hint ?? description}
      inputWrapperOrder={medInputWrapperOrder}
      styles={compact ? medCompactInputStyles : medInputStyles}
    />
  );
}
