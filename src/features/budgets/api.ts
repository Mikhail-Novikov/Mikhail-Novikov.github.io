import { config } from '@common/config';

import { OperationState } from '@features/operation/types';

import { BudgetState } from './types';

/**
 * Запрос на получение лимитированного списка операций
 * @param limit - количество
 * @param token - токен приложения
 * @returns - список
 */

const getOperations = (token: string, limit?: number): Promise<BudgetState[]> =>
  fetch(
    `${config.api.getOperations}?${new URLSearchParams({
      pagination: JSON.stringify({
        pageSize: limit ?? Infinity,
      }),
      sorting: JSON.stringify({
        type: 'DESC',
        field: 'createdAt',
      }),
    }).toString()}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((res) => res.json())
    .then((res) => res.data);

/**
 * Запрос на получение операций
 * @param токен
 * @returns {Operations} - данные всех операций
 */
const operationsAllFetch = (token: string): Promise<OperationState[]> =>
  fetch(`${config.api.getOperations}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);

export const api = {
  getOperations,
  operationsAllFetch,
};
