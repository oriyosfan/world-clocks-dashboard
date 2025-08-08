'use client';

import { Card as AppCard, type CardProps as AppCardProps } from 'antd';
import React, { forwardRef } from 'react';

export type CardProps = AppCardProps & {
  // Future props
};

type CardCompound = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Meta: typeof AppCard.Meta;
  Grid: typeof AppCard.Grid;
};

const CardBase = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return <AppCard ref={ref} {...props} />;
});
CardBase.displayName = 'Card';

export const Card: CardCompound = Object.assign(CardBase, {
  Meta: AppCard.Meta,
  Grid: AppCard.Grid,
});
