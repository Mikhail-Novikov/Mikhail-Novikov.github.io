import React from 'react';

import { TTableList } from '@features/categories/types';

import TableRow from './CategoryTableRow';
import TableThead from './CategoryTableThead';

import '../style.css';

interface BudgetListProps {
  /** список полей для таблицы */
  data: TTableList[];
  /** обработчик клика редактирования */
  handleClickEditCategory: (id: string) => void;
  /** обработчик клика удаления */
  handleClickDeleteCategory: (id: string) => void;
}

/**
 * Таблица категорий
 */
export const CategoryTable = ({
  data,
  handleClickEditCategory,
  handleClickDeleteCategory,
}: BudgetListProps): React.ReactElement => (
  <>
    <table className="table">
      <TableThead />
      {!data?.length && (
        <tbody>
          <tr>
            <td className="padding-left-none" colSpan={4}>
              <h3 className="txt-micro">
                Категории не созданы. Нажмите &laquo;Добавить&raquo;
              </h3>
            </td>
          </tr>
        </tbody>
      )}

      <tbody>
        {data?.map((item: TTableList) => (
          <TableRow
            key={item.id}
            itemRow={item.nameColumns}
            handleClickEditCategory={() => handleClickEditCategory(item.id)}
            handleClickDeleteCategory={() => handleClickDeleteCategory(item.id)}
          />
        ))}
      </tbody>
    </table>
  </>
);
