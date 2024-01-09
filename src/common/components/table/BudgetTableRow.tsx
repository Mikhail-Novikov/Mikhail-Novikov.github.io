import React from 'react';
import { v4 as uuid } from 'uuid';

import './style.css';
import { TableBtn } from '@common/features/control';

import { NamesColumns } from './types';

/**
 *  Cтрока таблицы
 */
const BudgetTableRow = ({
  itemRow,
  tag,
}: {
  itemRow: NamesColumns[];
  tag: string;
}): React.ReactElement => {
  const handleClickRow = (): void => null;

  return (
    <tr className="pointer" onClick={handleClickRow}>
      <td className="padding-left-none" aria-label="cell">
        <div
          className={`${tag === 'Cost' ? 'glyph-expenses' : 'glyph-income'}`}
        />
      </td>
      {itemRow?.map((item) => (
        <td key={uuid()}>
          <div className="margin-right-24 txt-line-clamp-2">{item}</div>
        </td>
      ))}
      <td aria-label="table-control">
        <TableBtn />
      </td>
    </tr>
  );
};

export default BudgetTableRow;
