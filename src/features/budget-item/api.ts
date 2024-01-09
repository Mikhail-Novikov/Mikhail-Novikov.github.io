import axios from 'axios';

import { OperationShemaApi } from './types';

/**
 * Запрос на получение списка программ
 * @returns - Список операций
 */

const getOperationItem = (id: number): Promise<OperationShemaApi> =>
  axios({
    method: 'GET',
    baseURL: 'https://fakestoreapi.com/products/',
    url: id.toString(),
  }).then((res): OperationShemaApi => res.data);

export const api = {
  getOperationItem,
};
