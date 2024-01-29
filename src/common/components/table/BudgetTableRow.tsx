import React from 'react';
import { v4 as uuid } from 'uuid';

import './style.css';
import { TableBtn } from '@common/features/control';
import { TTableRows } from '@common/types';

interface BudgetTableRowProps {
  itemRow: TTableRows[];
  type: string;
  handleClickRow: () => void;
}

/**
 *  Cтрока таблицы
 */
const BudgetTableRow = ({
  itemRow,
  type,
  handleClickRow,
}: BudgetTableRowProps): React.ReactElement => (
  <tr className="pointer">
    <td className="padding-left-none" aria-label="cell">
      <div className={`${type === 'Cost' ? 'glyph-Cost' : 'glyph-income'}`} />
    </td>
    {itemRow?.map((item) => (
      <td key={uuid()} onClick={handleClickRow}>
        <div className="margin-right-24 txt-line-clamp-2">{item}</div>
      </td>
    ))}
    <td
      aria-label="table-control"
      onMouseDown={(event: any) => event.preventDefault()}
    >
      <TableBtn />
    </td>
  </tr>
);

export default BudgetTableRow;
