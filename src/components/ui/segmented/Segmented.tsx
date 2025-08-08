'use client';

import { Segmented as AppSegmented, type SegmentedProps as AppSegmentedProps } from 'antd';
import React from 'react';

export type SegmentedProps = AppSegmentedProps & {
  // Future props
};

export function Segmented(props: SegmentedProps) {
  return <AppSegmented {...props} />;
}
