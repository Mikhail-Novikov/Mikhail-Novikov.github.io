import { useContextReducer } from '@context/ContextReducer';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from '@layouts/index';

import { OperationForm } from '@common/components/form';
import { TTableList } from '@common/components/table/types';
import { BottomBtn } from '@common/features/control';
import { transformFieldsApi } from '@common/utils/transform-fields-api';

import { Budgets } from '@features/budgets';
import { api } from '@features/budgets/api';
import { BudgetDetails, BudgetsTotalAmount } from '@features/budgets/componets';

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

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.getOperations(countOperation);

        const transformRes = res.map((item) => transformFieldsApi(item));

        setOperations(transformRes);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('getOperations error', error);
      }
    };
    fetch();
  }, [countOperation]);

  const showOperation = () => setCountOperation(() => countOperation + 5);

  const addOperation = () => {
    dispatch({
      type: 'openModalAddOpertation',
      payload: <OperationForm isEdit={false} />,
      titleModal: t('add_operation'),
    });
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-12 padding-left-4">
        {t('total_budget')}:
        <BudgetsTotalAmount />
      </h1>

      <legend className="flex-row align-items-center justify-content-between title-border margin-bottom-8 padding-left-8">
        {t('history_operation')}
        <BudgetDetails />
      </legend>

      <Budgets data={operations} />

      <BottomBtn
        handleClickShow={showOperation}
        handleClickAdd={addOperation}
      />
    </Layout>
  );
};
