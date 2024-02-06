import { useContextReducer } from '@context/ContextReducer';
import { t } from 'i18next';
import React, { useEffect } from 'react';

import { useOperationProcessActions } from '@src/processes/operation/';

import { OperationEditForm } from '@common/components/form';
import { BudgetTable } from '@common/components/table';
import { TTableList } from '@common/types';

import { TFieldsAddOPeration } from '@features/categories/types';
import { selectors as selectorsModal, useModalActions } from '@features/modal';
import { selectors as selectorsOperation } from '@features/operation';
import { useOperation } from '@features/operation/ducks';
import { Operation } from '@features/operation/types';

interface BudgetProps {
  data: TTableList[];
}

/**
 * Компонент отображения таблицы бюджета по всем операциям
 */
export const Budgets = ({ data }: BudgetProps): React.ReactElement => {
  const { operation, editOperation, deleteOperation, sendEditFormOpertaion } =
    useOperationProcessActions();
  const { setId } = useOperation();
  const { dispatch } = useContextReducer();
  const { isOpen } = selectorsModal.useModalSelector();
  const fields = selectorsOperation.useOperationSelector();

  const { showModal } = useModalActions();

  const handleClickRow = (id: string) => {
    setId(id);
    operation();
  };

  const sendingToForm = (
    valueFieldsEditedForm: TFieldsAddOPeration & Operation,
  ) => {
    sendEditFormOpertaion(valueFieldsEditedForm);

    showModal({
      isOpen: false,
      isOpenSuccess: false,
    });
    dispatch({
      type: 'closeModal',
      payload: <></>,
      titleModal: '',
    });
  };

  /* откроет окно для редактирования */
  const handleClickEditOperation = (item: Operation) => {
    setId(item.id);
    editOperation(item);
  };

  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: 'editModalOperation',
        payload: (
          <OperationEditForm
            submitOnSuccess={sendingToForm}
            formValues={fields}
          />
        ),
        titleModal: t('edit_operation'),
      });
    }
  }, [isOpen]);

  /* запускаем процесс удаления строки операции */
  const handleClickDeleteOperation = (id: string) => {
    setId(id);
    deleteOperation(id);
  };

  return (
    <BudgetTable
      data={data}
      handleClickRow={handleClickRow}
      handleClickEditOperation={handleClickEditOperation}
      handleClickDeleteOperation={handleClickDeleteOperation}
    />
  );
};
