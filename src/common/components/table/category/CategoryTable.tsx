import React from 'react';

import { TTableList } from '@features/categories/types';

import TableRow from './CategoryTableRow';
import TableThead from './CategoryTableThead';

import '../style.css';

// eslint-disable-next-line import/order

interface BudgetListProps {
  /** список доходов/расходов */
  data: TTableList[];
  /** обработчик клика по ряду таблицы */
  handleClickRow: (id: string) => void;
  /** обработчик клика редактирования операции */
  handleClickEditCategory: (id: string) => void;
}

/**
 * Таблица категорий
 */
export const CategoryTable = ({
  data,
  handleClickRow,
  handleClickEditCategory,
}: BudgetListProps): React.ReactElement => (
  <>
    <table className="table">
      <TableThead />

      <tbody>
        {data?.map((item: TTableList) => (
          <TableRow
            key={item.id}
            itemRow={item.name}
            itemIdRow={item.id}
            handleClickRow={() => handleClickRow(item.id)}
            handleClickEditCategory={() => handleClickEditCategory(item.id)}
          />
        ))}
      </tbody>
    </table>
  </>
);
