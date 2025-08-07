'use client';

import { Card as AppCard, type CardProps as AppCardProps } from '@infra/bridge';

export type CardProps = AppCardProps & {
  // Future props
};

export function Card(props: CardProps) {
  return <AppCard {...props} />;
}
