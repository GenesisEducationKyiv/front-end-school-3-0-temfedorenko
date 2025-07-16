import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SelectChangeEvent } from '@mui/material/Select';

import { TRACK_SORT_OPTIONS } from '@/constants';
import { SelectComponent } from '@/components/Select';

const meta: Meta<typeof SelectComponent> = {
  title: 'Mui/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  args: {
    value: '',
    id: 'example-select',
    label: 'Choose option',
    styles: { width: 300 },
    dataTestId: 'select-testid',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof SelectComponent>;

export const Default: Story = {};

export const SortSelect: Story = {
  args: {
    id: 'sorting',
    label: 'Sort by',
    styles: { width: 200 },
    dataTestId: 'sort-select',
    options: TRACK_SORT_OPTIONS,
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e: SelectChangeEvent<string>) => {
      setSelectedValue(e.target.value);
    };

    return (
      <SelectComponent
        {...args}
        value={selectedValue}
        handleChange={handleChange}
      />
    );
  },
};
