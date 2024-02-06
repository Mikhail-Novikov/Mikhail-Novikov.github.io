import cn from 'clsx';
import React from 'react';
import { v4 as uuid } from 'uuid';

import '../style.css';
import { TableBtn } from '@common/features/control';
import { TTableColumns } from '@common/types';

interface BudgetTableRowProps {
  itemRow: TTableColumns[];
  type: string;
  handleClickRow: () => void;
  handleClickEditOperation: () => void;
  handleClickDeleteOperation: () => void;
}

/**
 *  Cтрока таблицы
 */
const BudgetTableRow = ({
  itemRow,
  type,
  handleClickRow,
  handleClickEditOperation,
  handleClickDeleteOperation,
}: BudgetTableRowProps): React.ReactElement => {
  const isDisabled = itemRow[1] === undefined;

  return (
    <tr className={cn(isDisabled ? '' : 'pointer')}>
      <td
        aria-label="cell"
        className={cn('padding-left-none', isDisabled ? 'disabled' : '')}
      >
        <div className={`${type === 'Cost' ? 'glyph-Cost' : 'glyph-income'}`} />
      </td>
      {itemRow?.map((item) => (
        <td
          key={uuid()}
          onClick={handleClickRow}
          className={cn(isDisabled ? 'disabled' : 'pointer')}
        >
          <div className="margin-right-24 txt-line-clamp-2">{item}</div>
        </td>
      ))}
      <td aria-label="table-control">
        <TableBtn
          isDisabled={isDisabled}
          deleteClick={handleClickDeleteOperation}
          editClick={handleClickEditOperation}
        />
      </td>
    </tr>
  );
};

export default BudgetTableRow;
