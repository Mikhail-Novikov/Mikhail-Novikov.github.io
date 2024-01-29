import React from 'react';
import { v4 as uuid } from 'uuid';

import TableRow from './BudgetTableRow';
import TableThead from './BudgetTableThead';
import './style.css';

import { TTableList } from '@common/types';

interface BudgetListProps {
  /** список доходов/расходов */
  data: TTableList[];
  /** обработчик клика по ряду таблицы */
  handleClickRow: (id: string) => void;
}

/**
 * Таблица доходов/расходов
 */
export const BudgetTable = ({
  data,
  handleClickRow,
}: BudgetListProps): React.ReactElement => (
  <table className="table">
    <TableThead />

    <tbody>
      {data?.map((item: TTableList) => (
        <React.Fragment key={uuid()}>
          <TableRow
            itemRow={item.name}
            type={item.type}
            handleClickRow={() => handleClickRow(item.id)}
          />
        </React.Fragment>
      ))}
    </tbody>
  </table>
);
