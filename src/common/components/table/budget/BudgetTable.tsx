import React from 'react';

import TableRow from './BudgetTableRow';
import TableThead from './BudgetTableThead';
import '../style.css';

import { TTableList } from '@common/types';

interface BudgetListProps {
  /** список доходов/расходов */
  data: TTableList[];
  /** обработчик клика по ряду таблицы */
  handleClickRow: (id: string) => void;
  /** обработчик клика редактирования операции */
  handleClickEditOperation: (id: string) => void;
}

/**
 * Таблица доходов/расходов
 */
export const BudgetTable = ({
  data,
  handleClickRow,
  handleClickEditOperation,
}: BudgetListProps): React.ReactElement => (
  <table className="table">
    <TableThead />

    <tbody>
      {data?.map((item: TTableList) => (
        <TableRow
          key={item.id}
          itemRow={item.name}
          itemIdRow={item.id}
          type={item.type}
          handleClickRow={() => handleClickRow(item.id)}
          handleClickEditOperation={() => handleClickEditOperation(item.id)}
        />
      ))}
    </tbody>
  </table>
);
