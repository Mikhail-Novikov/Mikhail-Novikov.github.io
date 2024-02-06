import { config } from '@common/config';
import { TFieldsAddOPeration } from '@common/types';

import { OperationState } from './types';

/**
 * Запрос на получение данных операции
 * @param токен
 * @returns {Profile} - данные профиля
 */
const operationFetch = (id: string): Promise<OperationState> =>
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

const addOperationFetch = async (
  fieldsAddOPeration: TFieldsAddOPeration,
  token: string,
): Promise<number | void> => {
  const { name, desc, amount, date, type, categoryId } = fieldsAddOPeration;

  const body = JSON.stringify({
    name,
    desc,
    amount,
    date,
    type,
    categoryId,
  });

  const res = await fetch(config.api.getOperations, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.status)
    .catch((errors) => {
      // eslint-disable-next-line no-console
      console.log('errors api add-operations', errors);
    });
  return res;
};

/**
 * Запрос на изменение операции
 * @param token
 * @param id
 * @returns - token
 */

const editOperationFetch = async (
  fieldsEditOPeration: Partial<OperationState>,
  token: string,
  id: string,
): Promise<number | void> => {
  const { desc, name, amount, date, type, categoryId } = fieldsEditOPeration;
  const body = JSON.stringify({
    name,
    desc,
    amount,
    date,
    type,
    categoryId,
  });

  const res = await fetch(`${config.api.getOperation}${id}`, {
    method: 'PATCH',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.status)
    .catch((errors) => {
      // eslint-disable-next-line no-console
      console.log('errors api add-operations', errors);
    });
  return res;
};

/**
 * Запрос на удаление операции по id
 * @param fieldsAddCategory
 * @param токен
 * @returns {Category}
 */
const deleteOperationFetch = async (
  id: string,
  token: string,
): Promise<number> => {
  const res = await fetch(`${config.api.getOperation}${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.status;
};

export const api = {
  operationFetch,
  addOperationFetch,
  editOperationFetch,
  deleteOperationFetch,
};
