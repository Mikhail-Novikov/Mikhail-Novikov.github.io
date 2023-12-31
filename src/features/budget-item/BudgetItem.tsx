import React from 'react';

import '../table/style.css';
import { TBudgetType } from './types';

interface BudgetProps {
  type: keyof typeof TBudgetType;
}

/**
 * Компонент полного отображения операции
 */
export const BudgetItem = ({ type }: BudgetProps): React.ReactElement => (
  <>
    <h1 className="title title-border mb-24">{TBudgetType[type]}</h1>
    <dl className="list list-space-large w-25">
      <dt>Название дохода/расхода</dt>
      <dd>Зарплата</dd>

      <dt>Категория</dt>
      <dd>Основное</dd>

      <dt>Описание</dt>
      <dd>Аванс на работе</dd>

      <dt>Сумма</dt>
      <dd>2000$</dd>
    </dl>
  </>
);
