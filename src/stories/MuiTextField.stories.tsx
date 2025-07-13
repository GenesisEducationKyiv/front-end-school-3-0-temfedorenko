import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextFieldComponent } from '../components/TextInput';

const meta: Meta<typeof TextFieldComponent> = {
  title: 'Mui/TextField',
  component: TextFieldComponent,
  tags: ['autodocs'],
  args: {
    value: '',
    id: 'example-input',
    label: 'Field Label',
    styles: { width: 300 },
    testId: 'text-field-testid',
    wrapperStyles: { margin: '20px' },
  },
};

export default meta;

type Story = StoryObj<typeof TextFieldComponent>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    value: 'Filled',
  },
};

export const SearchInput: Story = {
  args: {
    id: 'searching',
    styles: { width: 250 },
    testId: 'search-input',
    label: 'Search by title/artist/album',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <TextFieldComponent
        {...args}
        value={value}
        handleChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
