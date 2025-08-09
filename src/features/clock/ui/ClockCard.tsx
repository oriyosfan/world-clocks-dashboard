'use client';

import React from 'react';

import { useClockTime } from '../hooks/useClockTime';
import { getTimezoneOptions } from '../utils/timezoneOptions';

import { Card } from './Card';

const options = getTimezoneOptions();
const keyToOption = new Map(options.map((o) => [o.key, o]));

export interface ClockCardProps {
  user: string;
  clockKey: string;
  onClose: () => void;
  onClick: () => void;
}

export function ClockCard({ clockKey, user, onClose, onClick }: ClockCardProps) {
  const option = keyToOption.get(clockKey);
  const timeZoneName = option?.timezoneName ?? 'UTC';
  const time = useClockTime(timeZoneName);
  if (!option) {
    return null;
  }
  return (
    <Card
      user={user}
      time={time}
      onClose={onClose}
      onClick={onClick}
      offset={option.offsetStr}
      country={option.country}
      countryCode={option.countryCode}
    />
  );
}
