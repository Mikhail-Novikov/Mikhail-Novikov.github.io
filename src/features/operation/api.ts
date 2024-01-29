import { config } from '@common/config';
import { TFieldsAddOPeration } from '@common/types';

import { OperationState as OperationShemaApi } from './types';

/**
 * Запрос на получение данных операции
 * @param токен
 * @returns {Profile} - данные профиля
 */
const operationFetch = (id: string): Promise<OperationShemaApi> =>
  fetch(`${config.api.getOperation}${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json());

/**
 * Запрос на добавление операции
 * @param token - ?
 * @returns - token
 */
const urlencoded = new URLSearchParams();

const addOperationFetch = (
  fieldsAddOPeration: TFieldsAddOPeration,
  token: string,
): Promise<TFieldsAddOPeration> => {
  const { name, desc, amount, date, type, categoryId } = fieldsAddOPeration;

  urlencoded.append('name', `${name}`);
  urlencoded.append('desc', `${desc}`);
  urlencoded.append('amount', `${amount}`);
  urlencoded.append('date', `${date}`);
  urlencoded.append('type', `${type}`);
  urlencoded.append('categoryId', `${categoryId}`);

  return fetch(config.api.getCategories, {
    method: 'POST',
    body: urlencoded,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((errors) => {
      // eslint-disable-next-line no-console
      console.log('errors api add-operations', errors);
    });
};

export const api = {
  operationFetch,
  addOperationFetch,
};
