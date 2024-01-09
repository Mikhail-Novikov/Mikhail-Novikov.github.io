import React from 'react';

import '../form.css';
import { Box } from '../../../../layouts';
import { Button } from '../../button';
import { Modal } from '../../modal';

/**
 * Компонент формы вызова модального окна
 */
export const ActionFormModal = (): React.ReactElement => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [valueInput, setValueInput] = React.useState<string>(
    'Вы ничего не написали',
  );

  return (
    <>
      <Box>
        <form action="modal">
          <div className="form-group">
            <label className="d-block" htmlFor="i_modal">
              Введите текст
            </label>
            <input
              className="form-control"
              placeholder="Этот текст будет виден в модальном окне"
              type="text"
              name="i_modal"
              id="i_modal"
              onChange={(event) => setValueInput(event.target.value)}
            />
          </div>

          <Button
            label="Открыть окно"
            size="medium"
            primary
            onClick={() => setIsOpenModal(true)}
            type="button"
          />
        </form>
      </Box>
      <Modal
        content={valueInput}
        isOpenModal={isOpenModal}
        handleClickButton={() => null}
        titleModal=""
      />
    </>
  );
};
