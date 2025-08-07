import * as FlagIcons from 'country-flag-icons/react/3x2';
import React from 'react';

const TypedFlagIcons: Record<string, React.FC<{ title?: string }>> = FlagIcons;

import { Card as AppCard, Button } from '@/components/ui';
import { CloseOutlined } from '@infra/bridge';

export interface CardProps {
  country: string;
  time: string;
  offset: string;
  countryCode: string;
  user?: string;
  onClose?: () => void;
  onClick?: () => void;
}

export const getFlag = (code: string): React.ReactNode | null => {
  const Flag = TypedFlagIcons[code.toUpperCase()];
  return Flag ? <Flag title={code} /> : null;
};

export const Card: React.FC<CardProps> = ({ country, time, offset, countryCode, user, onClose, onClick }) => (
  <AppCard
    className="relative w-full cursor-pointer rounded-xl p-0 shadow-sm transition-shadow duration-300 hover:shadow-md"
    onClick={onClick}
  >
    {onClose && (
      <Button
        type="text"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        icon={<CloseOutlined />}
        aria-label="Remove clock"
        className="absolute top-2 right-2 z-10 h-6 w-6 min-w-0 p-0 opacity-60 hover:opacity-100"
        style={{ position: 'absolute' }}
      />
    )}
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={'flex h-8 w-10 items-center justify-center'} aria-hidden>
          {getFlag(countryCode)}
        </span>
        <div className="flex flex-col">
          <span className="text-lg font-medium">{country}</span>
          {user && (
            <span className="text-muted-foreground text-sm">
              {user.charAt(0).toUpperCase() + user.slice(1)}&apos;s time
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end leading-none">
        <span className="text-2xl font-semibold tabular-nums">{time}</span>
        <span className="text-muted-foreground text-sm">{offset}</span>
      </div>
    </div>
  </AppCard>
);
