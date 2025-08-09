'use client';
import React from 'react';

import { Select, type SelectProps } from '@/components/ui';

import { type TimezoneOption } from '../utils/timezoneOptions';

import { getFlag } from './Card';

export interface SelectTimezoneProps {
  value: string;
  className?: string;
  options: TimezoneOption[];
  onChange: (zone: string) => void;
}

// Narrowing helper to check presence of a `search` key
function hasSearch(option: unknown): option is { search: unknown } {
  return typeof option === 'object' && option !== null && 'search' in option;
}

// Type guard to ensure option has a `search` string field
function isSearchableOption(option: unknown): option is { search: string } {
  if (!hasSearch(option)) {
    return false;
  }
  return typeof option.search === 'string';
}

export const SelectTimezone = ({ value, onChange, className, options }: SelectTimezoneProps) => {
  const optionsToRender: SelectProps['options'] = options.map((o) => {
    const countryName = o.country;
    const offsetStr = o.offsetStr;
    const displayName = `${countryName} ${offsetStr}`;
    return {
      value: o.key,
      search: displayName.toLowerCase(),
      label: (
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-5 items-center justify-center" aria-hidden>
            {getFlag(o.countryCode)}
          </span>
          <span className="flex-1">{countryName}</span>
          <span className="text-muted-foreground text-xs tabular-nums">UTC{offsetStr}</span>
        </div>
      ),
    };
  });
  return (
    <Select
      allowClear
      showSearch
      value={value}
      options={optionsToRender}
      optionLabelProp="label"
      className={`${className}`}
      onClear={() => onChange('')}
      placeholder="Add time-zone..."
      onChange={(v: string) => onChange(v)}
      filterOption={(input, option) => isSearchableOption(option) && option.search.includes(input.toLowerCase())}
    />
  );
};
