import { useContextReducer } from '@context/ContextReducer';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from '@layouts/index';
import { useOperationProcessActions } from '@src/processes/operation';

import { OperationCreateForm } from '@common/components/form/operation-form';
import { BottomBtn } from '@common/features/control';
import { useCalculationCoins } from '@common/hooks';
import { transformFieldsApi } from '@common/utils/transform-fields-api';

import { selectors as selectorsBudget } from '@features/budgets';
import { api as apiBudgets } from '@features/budgets/api';
import {
  BudgetDetails,
  Budgets,
  BudgetsTotalAmount,
} from '@features/budgets/componets';
import { BudgetState } from '@features/budgets/types';
import { selectors as selectorsCategory } from '@features/categories';
import { selectors as selectorsModal } from '@features/modal';
import { StatusMessageModal } from '@features/modal/components';
import { TTableList } from '@features/operation/types';

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
  const [operationsAll, setAllOperations] = useState<any>(null);
  const [countOperation, setCountOperation] = useState<number>(5);
  const { dispatch } = useContextReducer();
  const { addOperation } = useOperationProcessActions();
  const { isConfirm } = selectorsModal.useModalSelector();
  const { data: dataCategories } = selectorsCategory.useCategorySelector();
  const { data } = selectorsBudget.useBudgetSelector();
  const { summTotal, summCost, summProfit } =
    useCalculationCoins(operationsAll);

  const tokenApp = localStorage.getItem('token-app');

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  const transformRes = (res: BudgetState[]) =>
    res.map((item: BudgetState) => transformFieldsApi(item));

  const fetch = async () => {
    try {
      const res = await apiBudgets.getOperations(tokenApp, countOperation);
      setAllOperations(transformRes(await apiBudgets.getOperations(tokenApp)));

      setOperations(transformRes(res));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('getOperations error', error);
    }
  };

  useEffect(() => {
    fetch();
  }, [countOperation, isConfirm, data]);

  useEffect(() => setOperations(transformRes(data)), [data]);

  const showOperation = () => setCountOperation(() => countOperation + 5);

  const submitAddOperation = (values: any) => {
    addOperation(values);
    fetch();
    dispatch({
      type: 'closeModal',
      payload: <></>,
      titleModal: '',
    });
  };

  const createOperation = () => {
    dispatch({
      type: 'openModalAdd',
      payload: (
        <OperationCreateForm
          submitOnSuccess={submitAddOperation}
          categoryValueId={dataCategories}
        />
      ),
      titleModal: t('add_operation'),
      rightBtn: dataCategories.length ? 'Сохранить' : null,
    });
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-16 margin-bottom-12">
        {t('total_budget')}:
        <BudgetsTotalAmount summTotal={summTotal} />
      </h1>

      <legend className="flex-row align-items-center justify-content-between title-border margin-bottom-8">
        {t('history_operation')}
        <BudgetDetails summCost={summCost} summProfit={summProfit} />
      </legend>

      <Budgets data={operations} />

      <BottomBtn
        handleClickShow={showOperation}
        handleClickAdd={createOperation}
      />

      <StatusMessageModal />
    </Layout>
  );
};
