import { config } from '@common/config';

import { CategoryState } from './types';

/**
 * Запрос на получение данных категории по id
 * @param id
 * @returns {} - данные по категории
 */
const categoryFetch = (id: string, token: string): Promise<CategoryState> =>
  fetch(`${config.api.getCategory}${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

/**
 * Запрос на получение лимитированного списка категорий
 * @param limit - количество категорий
 * @returns - Список категорий
 */

const getCategories = (limit: number): Promise<CategoryState[]> =>
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
 * Запрос на получение категорий через авторизацию
 * @param токен
 * @returns {Categories} - данные всех категорий
 */
const categoriesPostFetch = (token: string): Promise<CategoryState[]> =>
  fetch(`${config.api.getCategories}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);

/**
 * Запрос на создание категории
 * @param fieldsAddCategory
 * @param токен
 * @returns {Category} - данные всех категорий
 */
const addCategoryFetch = (fieldsAddCategory: any, token: string): any => {
  const { name } = fieldsAddCategory;

  const body = JSON.stringify({
    name,
    photo: fieldsAddCategory?.photo,
  });

  return fetch(`${config.api.getCategories}`, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

/**
 * Запрос на редактирование категории по id
 * @param fieldsAddCategory
 * @param токен
 * @returns {Category} - данные всех категорий
 */
const editCategoryFetch = (
  fieldsAddCategory: any,
  id: string,
  token: string,
): any => {
  const { name } = fieldsAddCategory;

  const body = JSON.stringify({
    name,
    photo: fieldsAddCategory?.photo,
  });

  return fetch(`${config.api.getCategory}${id}`, {
    method: 'PATCH',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res);
};

export const api = {
  getCategories,
  categoryFetch,
  categoriesPostFetch,
  addCategoryFetch,
  editCategoryFetch,
};
