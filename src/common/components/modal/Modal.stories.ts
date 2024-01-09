import type { Meta } from '@storybook/react';

import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    handleClickButton: Function,
  },
};

export default meta;

export const ModalItem = {
  args: {
    isOpen: true,
    setIsOpen: (isOpen: boolean): boolean => isOpen,
    content:
      'Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и тёплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду «Луч Добра».',
  },
};
