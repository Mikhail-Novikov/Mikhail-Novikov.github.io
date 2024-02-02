import { useContextReducer } from '@context/ContextReducer';
import { t } from 'i18next';
import React, { useEffect } from 'react';

import { useOperationProcessActions } from '@src/processes/operation/';

import { OperationCreateAndEditForm } from '@common/components/form/operation-form';
import { BudgetTable } from '@common/components/table';
import { TTableList } from '@common/types';

import { selectors as selectorsModal } from '@features/modal';
import { selectors as selectorsOperation } from '@features/operation';
import { useOperation } from '@features/operation/ducks';

interface BudgetProps {
  data: TTableList[];
}

/**
 * Компонент отображения бюджета по всем операциям
 */
export const Budgets = ({ data }: BudgetProps): React.ReactElement => {
  const { operation, editOperation } = useOperationProcessActions();
  const { setId } = useOperation();
  const { dispatch } = useContextReducer();
  const { isOpen } = selectorsModal.useModalSelector();
  const fields = selectorsOperation.useOperationSelector();

  const handleClickRow = (id: string) => {
    setId(id);
    operation();
  };
  const handleClickEditOperation = (id: string) => {
    setId(id);
    editOperation();
  };

  const sendingToForm = (valueFieldsEditedForm: any) => {
    editOperation(valueFieldsEditedForm);
  };

  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: 'editModalOperation',
        payload: (
          <OperationCreateAndEditForm
            isEdit
            submitOnSuccess={sendingToForm}
            formValues={fields}
          />
        ),
        titleModal: t('edit_operation'),
      });
    }
  }, [isOpen]);

  return (
    <BudgetTable
      data={data}
      handleClickRow={handleClickRow}
      handleClickEditOperation={handleClickEditOperation}
    />
  );
};
