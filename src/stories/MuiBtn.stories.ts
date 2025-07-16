import { fn } from 'storybook/test';
import { Button } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'MUI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    children: 'Btn Label',
  },
} satisfies Meta<typeof Button>;;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CreateTrackBtn: Story = {
  args: {
    children: 'Create Track',
    sx: { height: 50, fontSize: 18, minWidth: 160 },
  },
};

export const CancelBtn: Story = {
  args: {
    children: 'Cancel',
  },
};

export const CloseBtn: Story = {
  args: {
    children: 'Close',
  },
};

export const SaveBtn: Story = {
  args: {
    children: 'Save',
  },
};

export const ConfirmBtn: Story = {
  args: {
    children: 'Confirm',
  },
};

export const UploadBtn: Story = {
  args: {
    children: 'Upload',
  },
};
