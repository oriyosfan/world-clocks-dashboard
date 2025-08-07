'use client';

import { Input as AppInput, type InputProps as AppInputProps } from '@infra/bridge';

export type InputProps = AppInputProps & {
  // Future props
};

export function Input(props: InputProps) {
  return <AppInput {...props} />;
}
