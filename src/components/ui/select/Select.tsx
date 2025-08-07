'use client';

import { Select as AppSelect, type SelectProps as AppSelectProps } from '@infra/bridge';

export type SelectProps = AppSelectProps & {
  // Future props
};

export function Select(props: SelectProps) {
  return <AppSelect {...props} />;
}
