'use client';

import { Segmented as AppSegmented, type SegmentedProps as AppSegmentedProps } from 'antd';
import React from 'react';

export type SegmentedProps = AppSegmentedProps & {
  // Future props
};

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(function Segmented(props, ref) {
  return <AppSegmented ref={ref} {...props} />;
});
