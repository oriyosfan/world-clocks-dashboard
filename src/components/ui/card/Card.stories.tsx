import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../button';
import React from 'react';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'Card title',
    loading: false,
    bordered: true,
    hoverable: true,
  },
  argTypes: {
    title: { control: 'text' },
    loading: { control: 'boolean' },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      Small description goes here.
    </Card>
  ),
};

export const WithActions: Story = {
  args: { title: 'Interactive Card' },
  render: (args) => (
    <Card
      {...args}
      style={{ maxWidth: 360 }}
      actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
    >
      Content with action icons.
    </Card>
  ),
};

export const WithCoverAndMeta: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }} cover={<img alt="cover" src="https://picsum.photos/640/360" />}>
      <Card.Meta title="Card Meta title" description="A bit more descriptive text to show typical usage." />
    </Card>
  ),
};

export const LoadingState: Story = {
  args: { loading: true },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      This content is hidden while loading is true.
      <Button style={{ marginTop: 12 }} type="primary">
        CTA
      </Button>
    </Card>
  ),
};
