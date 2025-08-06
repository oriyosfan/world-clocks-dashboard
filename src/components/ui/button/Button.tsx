'use client';

import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import { forwardRef } from 'react';

export type ButtonProps = AntButtonProps & {
  'data-track'?: string; // place for analytics hooks if you want
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return <AntButton ref={ref} {...props} />;
});
