import React from 'react';
import { v4 as uuid } from 'uuid';

import TableRow from './BudgetTableRow';
import TableThead from './BudgetTableThead';
import './style.css';
import { NamesColumns, TBudget, TTableList } from './types';

interface BudgetListProps {
  /** список доходов/расходов */
  data: TBudget[];
}

/**
 * Таблица доходов/расходов
 */
export const BudgetTable = ({ data }: BudgetListProps): React.ReactElement => (
  <table className="table">
    <TableThead />

    <tbody>
      {data?.map((item: TTableList) => (
        <React.Fragment key={uuid()}>
          <TableRow itemRow={item.name as NamesColumns[]} tag={item.tag} />
        </React.Fragment>
      ))}
    </tbody>
  </table>
);
