/* eslint-disable */
// TODO: fix eslint here
'use client';

import { Select, type SelectProps } from '@/components/ui';
import { type TimezoneOption } from '../utils/timezoneOptions';

export interface SelectTimezoneProps {
  value?: string;
  className?: string;
  onChange: (zone: string) => void;
  options: TimezoneOption[];
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
          <span className={`fi fi-${countryName.toLowerCase()} h-4 w-5`} />
          <span className="flex-1">{countryName}</span>
          <span className="text-xs text-gray-500 tabular-nums">UTC{offsetStr}</span>
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
      onChange={(v) => onChange(v)}
      placeholder="Add time-zone..."
      filterOption={(input, option) => (option?.['search'] as string).includes(input.toLowerCase())}
    />
  );
};
