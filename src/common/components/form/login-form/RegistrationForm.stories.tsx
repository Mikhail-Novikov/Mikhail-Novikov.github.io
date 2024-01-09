import type { Meta, StoryObj } from '@storybook/react';

import { RegistrationForm } from './RegistrationForm';

const meta: Meta<typeof RegistrationForm> = {
  title: 'Components/RegistrationForm',
  component: RegistrationForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionForm: Story = {
  args: {},
};
