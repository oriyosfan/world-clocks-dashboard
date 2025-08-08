'use client';
import { Button as AppButton, type ButtonProps as AppButtonProps } from 'antd';
import React from 'react';

export type ButtonProps = AppButtonProps & {
  // Future props
};

export function Button(props: ButtonProps) {
  return <AppButton {...props} />;
}
