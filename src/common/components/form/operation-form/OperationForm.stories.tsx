import type { Meta, StoryObj } from '@storybook/react';

import { OperationForm } from './OperationForm';

const meta: Meta<typeof OperationForm> = {
  title: 'Components/OperationForm',
  component: OperationForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionForm: Story = {
  args: {},
};
