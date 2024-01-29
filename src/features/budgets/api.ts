import { config } from '@common/config';

import { BudgetState } from './types';

/**
 * Запрос на получение списка программ
 * @param limit - количество операций
 * @returns - Список операций
 */

const getOperations = (limit: number): any =>
  fetch(
    `${config.api.getCategories}?${new URLSearchParams({
      pagination: JSON.stringify({
        pageSize: limit,
      }),
    }).toString()}`,
  )
    .then((res) => res.json())
    .then((res) => res.data);

/**
 * Запрос на получение операций
 * @param токен
 * @returns {Operations} - данные всех операций
 */
const operationsFetch = (): Promise<BudgetState[]> =>
  fetch(`${config.api.getCategories}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);

export const api = {
  getOperations,
  operationsFetch,
};
