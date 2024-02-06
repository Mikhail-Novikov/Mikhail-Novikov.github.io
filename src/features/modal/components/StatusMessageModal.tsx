import React from 'react';

import { Modal } from '@common/components';

import { useModalActions } from '../ducks';
import { selectors } from '../selectors';

/**
 * Окно сообщения о статусе запроса
 */
export const StatusMessageModal = (): React.ReactElement => {
  /* закрыть окно */
  const { showModalMessage, confirm } = useModalActions();
  const { isOpenSuccess, message, title, rightBtn } =
    selectors.useModalSelector();

  const handleClickCancel = () => {
    showModalMessage({
      isOpenSuccess: false,
    });
    confirm(false);
  };
  const handleClickSubmit = () => {
    confirm(true);
  };

  return (
    <Modal
      content={<h5 className="">{message}</h5>}
      titleModal={title}
      isOpenModal={isOpenSuccess}
      handleClickCancel={handleClickCancel}
      handleClickSubmit={handleClickSubmit}
      textRightButton={rightBtn}
    />
  );
};
