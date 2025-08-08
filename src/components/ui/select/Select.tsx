'use client';

import { Select as AppSelect, type SelectProps as AppSelectProps } from 'antd';
import React from 'react';

export type SelectProps = AppSelectProps & {
  // Future props
};

export function Select(props: SelectProps) {
  return <AppSelect {...props} />;
}
