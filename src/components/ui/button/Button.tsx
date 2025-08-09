'use client';
import { Button as AppButton, type ButtonProps as AppButtonProps } from 'antd';
import React from 'react';

export type ButtonProps = AppButtonProps & {
  // Future props
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return <AppButton ref={ref} {...props} />;
});
