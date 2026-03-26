import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import { medInputStyles, medInputWrapperOrder } from "@/theme/inputStyles";

export interface TextInputProps extends Omit<MantineTextInputProps, "size"> {
  /** Alias for Mantine's `description` prop — renders below the input. */
  hint?: string;
}

export function TextInput({ hint, description, ...props }: TextInputProps) {
  return (
    <MantineTextInput
      {...props}
      description={hint ?? description}
      // Put description below the input, not above (Mantine default is above)
      inputWrapperOrder={medInputWrapperOrder}
      styles={medInputStyles}
    />
  );
}
