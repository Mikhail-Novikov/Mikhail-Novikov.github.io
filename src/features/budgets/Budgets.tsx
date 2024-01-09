import React from 'react';

import { BudgetTable } from '@common/components/table';
import { TTableList } from '@common/components/table/types';

interface BudgetProps {
  data: TTableList[];
}

/**
 * Компонент краткого отображения операции
 */
export const Budgets = ({ data }: BudgetProps): React.ReactElement => (
  <BudgetTable data={data} />
);
