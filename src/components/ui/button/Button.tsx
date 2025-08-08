'use client';

import { Button as AppButton, type ButtonProps as AppButtonProps } from 'antd';

export type ButtonProps = AppButtonProps & {
  // Future props
};

export function Button(props: ButtonProps) {
  return <AppButton {...props} />;
}
