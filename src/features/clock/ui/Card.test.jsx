import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Card } from './Card';

vi.mock('@/components/icons', () => ({ CloseOutlined: () => <span>close</span> }));

describe('Card component', () => {
  const baseProps = {
    country: 'France',
    time: '12:34:56',
    offset: '+02:00',
    countryCode: 'FR',
  };

  it('renders country and time', () => {
    render(<Card {...baseProps} />);
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('12:34:56')).toBeInTheDocument();
    expect(screen.getByText('+02:00')).toBeInTheDocument();
  });

  it('fires onClose without triggering onClick', () => {
    const onClose = vi.fn();
    const onClick = vi.fn();
    render(<Card {...baseProps} onClose={onClose} onClick={onClick} />);

    const removeBtn = screen.getByRole('button', { name: /remove clock/i });
    fireEvent.click(removeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});
