import { useContextReducer } from '@context/ContextReducer';
import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

import deletePathImage from '@src/images/delete.svg';
import editPathImage from '@src/images/modify.svg';

import { Button } from '@common/components';
import { OperationForm } from '@common/components/form';

/**
 * Компонент кнопок редактирования и удаления операции
 * @returns - компонет кнопок
 */
export const TableBtn = (): React.ReactElement => {
  const { dispatch } = useContextReducer();

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  const editOperation = () => {
    dispatch({
      type: 'openModalAddOpertation',
      payload: <OperationForm isEdit />,
      titleModal: t('edit_operation'),
    });
  };

  return (
    <div className="table-btn">
      <Button
        type="button"
        label={<img src={editPathImage} alt="" />}
        isBorder={false}
        onClick={editOperation}
      />

      <Button
        type="button"
        label={<img src={deletePathImage} alt="" />}
        isBorder={false}
      />
    </div>
  );
};
