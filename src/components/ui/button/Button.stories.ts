import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'], // Docs tab auto-generates API table
  argTypes: {
    type: {
      options: ['primary', 'default', 'dashed', 'text', 'link'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    children: 'Click me',
    type: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Primary visual variant */
export const Primary: Story = {};

export const Default: Story = {
  args: {
    children: 'Click me',
    type: 'default',
    disabled: false,
  },
};

/** Disabled button */
export const Disabled: Story = {
  args: { disabled: true },
};

/** Large, dashed button */
export const LargeDashed: Story = {
  args: { type: 'dashed', size: 'large' },
};
