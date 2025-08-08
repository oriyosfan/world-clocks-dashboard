import type { Meta, StoryObj } from '@storybook/react';
import { SearchOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from './Input';
import React from 'react';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type here…',
    disabled: false,
    allowClear: true,
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    allowClear: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Input {...args} style={{ maxWidth: 360 }} />,
};

export const WithPrefixSuffix: Story = {
  render: (args) => <Input {...args} style={{ maxWidth: 360 }} prefix={<SearchOutlined />} suffix=".com" />,
};

export const Password: Story = {
  render: (args) => (
    <Input.Password
      {...args}
      style={{ maxWidth: 360 }}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      placeholder="Enter password"
    />
  ),
};

export const TextArea: Story = {
  render: (args) => <Input.TextArea placeholder="Multiline text…" rows={4} style={{ maxWidth: 480 }} />,
  args: {
    placeholder: 'Multiline text…',
  },
};
