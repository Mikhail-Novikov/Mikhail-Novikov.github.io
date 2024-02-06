import React from 'react';
import { Link } from 'react-router-dom';

import pathImageCost from './images/cost.svg';
import pathImageArrow from './images/left-arrow.svg';
import pathImageProfit from './images/profit.svg';
import { OperationState, TBudgetType } from '../types';

interface BudgetProps {
  dataOperations: OperationState;
}

/**
 * Компонент полного отображения операции
 */
export const Operation = ({
  dataOperations,
}: BudgetProps): React.ReactElement => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;

  const { category } = dataOperations;

  const createDate = new Date(dataOperations?.createdAt);

  const formatDates = (el: string) => el.replace(/^"(.+(?="$))"$/, '$1');

  const date = JSON.stringify(createDate.toLocaleString('ru-RU', options));

  const time = JSON.stringify(createDate.toLocaleTimeString());

  const typeOperation = TBudgetType[dataOperations?.type];

  return (
    <div className="margin-top-32">
      <h1 className="title title-border flex-row mb-24">
        <Link className="margin-right-8 block" rel="stylesheet" to="/">
          <img src={pathImageArrow} alt="" width="32" />
        </Link>
        Карточка операции
      </h1>
      <div className="flex-row align-items-start">
        <img
          src={
            dataOperations?.type === 'Cost' ? pathImageCost : pathImageProfit
          }
          alt={typeOperation}
          width="60"
        />

        <dl className="list list-space-large w-25 margin-left-32 grow-1">
          <dt>Название</dt>
          <dd>{dataOperations?.name ?? '-'}</dd>

          <dt>Категория</dt>
          <dd>{category.name ?? '-'}</dd>

          <dt>Описание</dt>
          <dd>{dataOperations?.desc ?? '-'}</dd>

          <dt>Сумма</dt>
          <dd>{dataOperations?.amount ?? 0}</dd>

          <dt>Дата операции</dt>
          <dd>
            {formatDates(date)} в {formatDates(time)}
          </dd>
        </dl>
      </div>
    </div>
  );
};
