'use client';

import { Select as AppSelect } from 'antd';
import React from 'react';

import type { RefSelectProps, SelectProps as AppSelectProps } from 'antd';

export type SelectProps = AppSelectProps & {
  // Future props
};

export const Select = React.forwardRef<RefSelectProps, SelectProps>(function Select(props, ref) {
  return <AppSelect ref={ref} {...props} />;
});
