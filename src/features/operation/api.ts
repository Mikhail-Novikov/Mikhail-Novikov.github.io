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

const addOperationFetch = (
  fieldsAddOPeration: TFieldsAddOPeration,
  token: string,
): Promise<TFieldsAddOPeration> => {
  const { name, desc, amount, date, type, category } = fieldsAddOPeration;

  const body = JSON.stringify({
    name,
    desc,
    amount,
    date,
    type,
    category,
    category: {
      name: 'castom',
      id: '198d0938ej3jhjkcastom',
      createdAt: '',
      updatedAt: '',
    },
  });

  return fetch(config.api.getOperations, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((errors) => {
      // eslint-disable-next-line no-console
      console.log('errors api add-operations', errors);
    });
};

/**
 * Запрос на изменение операции
 * @param token
 * @param id
 * @param id
 * @returns - token
 */

const editOperationFetch = (
  fieldsEditOPeration: any,
  token: string,
  id: string,
): any => {
  const { name, desc, amount, date, type, categoryId } = fieldsEditOPeration;
  const body = JSON.stringify({
    name,
    desc,
    amount,
    date,
    type,
    categoryId,
  });

  fetch(`${config.api.getOperation}${id}`, {
    method: 'PATCH',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
  editOperationFetch,
};
