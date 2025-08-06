'use client';

import { Segmented as AppSegmented, type SegmentedProps as AppSegmentedProps } from '@infra/bridge';

export type SegmentedProps = AppSegmentedProps & {
  // Future props
};

export function Segmented(props: SegmentedProps) {
  return <AppSegmented {...props} />;
}
