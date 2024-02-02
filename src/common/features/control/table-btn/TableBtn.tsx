import { useContextReducer } from '@context/ContextReducer';
import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

import deletePathImage from '@src/images/delete.svg';
import editPathImage from '@src/images/modify.svg';

import { Button } from '@common/components';
import { OperationCreateAndEditForm } from '@common/components/form/operation-form';

interface TableBtnProps {
  editClick: () => void;
}

/**
 * Компонент кнопок редактирования и удаления операции
 * @returns - компонет кнопок
 */
export const TableBtn = ({ editClick }: TableBtnProps): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();
  const { dispatch } = useContextReducer();

  const deleteClick = () => {
    dispatch({
      type: 'deleteModalOperation',
      payload: (
        <OperationCreateAndEditForm isEdit submitOnSuccess={() => null} />
      ),
      titleModal: t('edit_operation'),
    });
  };

  return (
    <div className="table-btn">
      <Button
        type="button"
        label={<img src={editPathImage} alt="" />}
        isBorder={false}
        onClick={editClick}
      />

      <Button
        type="button"
        label={<img src={deletePathImage} alt="" />}
        isBorder={false}
        onClick={deleteClick}
      />
    </div>
  );
};
