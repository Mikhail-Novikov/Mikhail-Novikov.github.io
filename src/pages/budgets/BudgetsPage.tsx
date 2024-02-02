import { useContextReducer } from '@context/ContextReducer';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from '@layouts/index';
import { useOperationProcessActions } from '@src/processes/operation';

import { OperationForm } from '@common/components/form';
import { BottomBtn } from '@common/features/control';
import { Operation, TTableList } from '@common/types';
import { transformFieldsApi } from '@common/utils/transform-fields-api';

import { api as apiBudgets } from '@features/budgets/api';
import {
  BudgetDetails,
  Budgets,
  BudgetsTotalAmount,
} from '@features/budgets/componets';

export enum Themes {
  dark = 'dark',
  light = 'light',
}

/**
 * Страница списка Расходов
 * @returns - Компонент
 */
export const BudgetsPage = (): React.ReactElement => {
  const [operations, setOperations] = useState<TTableList[]>(null);
  const [countOperation, setCountOperation] = useState<number>(5);
  const { dispatch } = useContextReducer();
  const { addOperation } = useOperationProcessActions();

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiBudgets.getOperations(countOperation);
        const transformRes = res.map((item: Operation) =>
          transformFieldsApi(item),
        );

        setOperations(transformRes);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('getOperations error', error);
      }
    };
    fetch();
  }, [countOperation]);

  const showOperation = () => setCountOperation(() => countOperation + 5);

  const submitAddOperation = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('submitAddOperation', values);
    addOperation(values);
  };

  const handleOpenModal = () => {
    dispatch({
      type: 'openModalAdd',
      payload: <OperationForm submitOnSuccess={submitAddOperation} />,
      titleModal: t('add_operation'),
    });
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-16 margin-bottom-12">
        {t('total_budget')}:
        <BudgetsTotalAmount />
      </h1>

      <legend className="flex-row align-items-center justify-content-between title-border margin-bottom-8">
        {t('history_operation')}
        <BudgetDetails />
      </legend>

      <Budgets data={operations} />

      <BottomBtn
        handleClickShow={showOperation}
        handleClickAdd={handleOpenModal}
      />
    </Layout>
  );
};
