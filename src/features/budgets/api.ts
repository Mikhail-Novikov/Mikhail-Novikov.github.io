import axios from 'axios';

import { OperationShemaApi } from '@features/budget-item/types';

/**
 * Запрос на получение суммы по всем операциям
 * @param limit - количество операций
 * @returns - сумму
 */

const getPricesOperations = (): Promise<OperationShemaApi[]> =>
  axios({
    method: 'GET',
    baseURL: 'https://fakestoreapi.com/products',
  }).then((res): OperationShemaApi[] => res.data);

/**
 * Запрос на получение списка программ
 * @param limit - количество операций
 * @returns - Список операций
 */

const getOperations = (limit: number): Promise<OperationShemaApi[]> =>
  axios({
    method: 'GET',
    baseURL: 'https://fakestoreapi.com/products',
    url: `?limit=${limit}`,
  }).then((res): OperationShemaApi[] => res.data);

export const api = {
  getOperations,
  getPricesOperations,
};
