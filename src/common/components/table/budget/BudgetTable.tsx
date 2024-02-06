import React from 'react';

import { CurrencySign } from '@common/components';
import { TTableList } from '@common/types';

import TableRow from './BudgetTableRow';
import TableThead from './BudgetTableThead';
import '../style.css';

interface BudgetListProps {
  /** список доходов/расходов */
  data: TTableList[];
  /** обработчик клика по ряду таблицы */
  handleClickRow: (id: string) => void;
  /** обработчик клика редактирования операции */
  handleClickEditOperation: (item: any) => void;
  /** обработчик клика удаления операции */
  handleClickDeleteOperation: (id: string) => void;
}

/**
 * Таблица доходов/расходов
 */
export const BudgetTable = ({
  data,
  handleClickRow,
  handleClickEditOperation,
  handleClickDeleteOperation,
}: BudgetListProps): React.ReactElement => (
  <table className="table">
    <TableThead />

    <tbody>
      {!data?.length && (
        <tr>
          <td className="padding-left-none" colSpan={6}>
            <h3 className="txt-micro">
              Бюджет <CurrencySign value={0} />. Нажмите &laquo;Добавить&raquo;
            </h3>
          </td>
        </tr>
      )}
      {data?.map((item: TTableList) => (
        <TableRow
          key={item.id}
          itemRow={item.nameColumns}
          type={item.type}
          handleClickRow={() => handleClickRow(item.id)}
          handleClickEditOperation={() => handleClickEditOperation(item)}
          handleClickDeleteOperation={() => handleClickDeleteOperation(item.id)}
        />
      ))}
    </tbody>
  </table>
);
