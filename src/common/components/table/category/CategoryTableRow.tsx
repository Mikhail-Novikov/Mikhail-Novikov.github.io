import React from 'react';
import { v4 as uuid } from 'uuid';

import '../style.css';
import { TableBtn } from '@common/features/control';

import { TTableColumns } from '@features/categories/types';

interface CategoryTableRowProps {
  itemRow: TTableColumns[];
  handleClickRow?: () => void;
  handleClickEditCategory: () => void;
  handleClickDeleteCategory?: () => void;
}

/**
 *  Cтрока таблицы
 */
const CategoryTableRow = ({
  itemRow,
  handleClickRow,
  handleClickEditCategory,
  handleClickDeleteCategory,
}: CategoryTableRowProps): React.ReactElement => (
  <tr className="pointer">
    {itemRow?.map((item) => (
      <td key={uuid()} onClick={handleClickRow}>
        <div className="margin-right-24 txt-line-clamp-2">{item}</div>
      </td>
    ))}
    <td aria-label="table-control">
      <TableBtn
        editClick={handleClickEditCategory}
        deleteClick={handleClickDeleteCategory}
      />
    </td>
  </tr>
);

export default CategoryTableRow;
