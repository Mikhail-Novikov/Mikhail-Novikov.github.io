import React from 'react';

import { useOperationProcessActions } from '@src/processes/operation/';

import { BudgetTable } from '@common/components/table';
import { TTableList } from '@common/types';

import { useOperation } from '@features/operation/ducks';

interface BudgetProps {
  data: TTableList[];
}

/**
 * Компонент отображения бюджета по всем операциям
 */
export const Budgets = ({ data }: BudgetProps): React.ReactElement => {
  const { operation } = useOperationProcessActions();
  const { setId } = useOperation();

  const handleClickRow = (id: string) => {
    setId(id);
    operation();
  };

  return <BudgetTable data={data} handleClickRow={handleClickRow} />;
};
