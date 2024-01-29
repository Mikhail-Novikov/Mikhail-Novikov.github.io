import { Operation, TTableList, TTableRows } from '@common/types';

/**
 * Преобразование полей api из запроса в объект для приложения
 * @param fieldsApi - Поля из api
 * @returns - преобразованный объект
 */
export const transformFieldsApi = (fieldsApi: Operation): TTableList => {
  const { category } = fieldsApi;

  return {
    id: fieldsApi.id,
    type: fieldsApi.type,
    name: [
      fieldsApi.name,
      category?.name,
      fieldsApi.desc,
      fieldsApi.amount,
    ] as unknown as TTableRows[],
  };
};
