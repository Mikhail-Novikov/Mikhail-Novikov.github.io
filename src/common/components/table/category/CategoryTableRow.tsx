import React from 'react';
import { v4 as uuid } from 'uuid';

import '../style.css';
import { TableBtn } from '@common/features/control';

import { TTableRows } from './types';

interface BudgetTableRowProps {
  itemRow: TTableRows[];
  handleClickRow: () => void;
  handleClickEditCategory: () => void;
  itemIdRow: string;
}

/**
 *  Cтрока таблицы
 */
const CategoryTableRow = ({
  itemRow,
  handleClickRow,
  handleClickEditCategory,
  itemIdRow,
}: BudgetTableRowProps): React.ReactElement => (
  <tr className="pointer">
    {itemRow?.map((item) => (
      <td key={uuid()} onClick={handleClickRow}>
        <div className="margin-right-24 txt-line-clamp-2">{item}</div>
      </td>
    ))}
    <td aria-label="table-control">
      <TableBtn itemIdRow={itemIdRow} editClick={handleClickEditCategory} />
    </td>
  </tr>
);

export default CategoryTableRow;
