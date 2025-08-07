import { useState } from 'react';

import { ThemeMode } from '../../../components/providers/theme/types';

import { ThemeToggleControl } from './ThemeToggleControl';

const meta = {
  title: 'Features/Theme Toggle/Control',
  component: ThemeToggleControl,
  tags: ['autodocs'],
};

export default meta;

export const Light = {
  render: () => {
    const [value, setValue] = useState(ThemeMode.Light);
    return <ThemeToggleControl value={value} setValue={setValue} />;
  },
};

export const Dark = {
  render: () => {
    const [value, setValue] = useState(ThemeMode.Dark);
    return <ThemeToggleControl value={value} setValue={setValue} />;
  },
};
