import React, { useState } from 'react';

import { Layout } from '@layouts/index';

import { BottomBtn } from '@common/features/control';

import { api } from '@features/budget-item/api';
import { OperationShemaApi } from '@features/budget-item/types';
import { Budgets } from '@features/budgets';

const data = [
  { id: 1, name: ['Зарплата', 'Основное', 'Аванс на работе', '2000'] },
  { id: 2, name: ['Подработка', 'Временное', 'Продал колёса', '300'] },
];

/**
 * Страница списка Расходов
 * @returns - Компонент
 */
export const BudgetProfitItemPage = (): React.ReactElement => {
  const [operations, setOperations] = useState<OperationShemaApi>();
  const [idOperations, setIdOperations] = useState<number>(1);

  /** обработчик получения операции */
  const getOperation = async (id: number) => {
    const listOperation = api.getOperationItem(id);
    setOperations(await listOperation);

    setIdOperations(idOperations + 1);
  };
  /** получаем операцию */
  if (operations === undefined) {
    getOperation(1);
  }

  /** формируем схему операции для таблицы { ид, name:[] } */
  const newOperation = (el: OperationShemaApi) => {
    const { id, title, price, category, description } = el;

    return { id, name: [title, category, description, price] };
  };

  /** ручное добавление в таблицу оперции */
  const handleAddList = () => {
    getOperation(idOperations);

    return data.push(newOperation(operations));
  };

  return (
    <Layout>
      <div className="d-block table-title title-border mb-24">Общий бюджет</div>
      <Budgets data={[]} />

      <BottomBtn handleClickAdd={handleAddList} />
    </Layout>
  );
};
