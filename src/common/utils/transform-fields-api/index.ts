import { BudgetState } from '@features/budgets/types';
import { TTableColumns, TTableList } from '@features/operation/types';

/**
 * Преобразование полей api из запроса в объект для приложения
 * @param fieldsApi - Поля из api
 * @returns - преобразованный объект
 */
export const transformFieldsApi = (fieldsApi: BudgetState): TTableList => {
  const { category } = fieldsApi;

  return {
    id: fieldsApi.id,
    type: fieldsApi.type,
    categoryId: category?.id,
    nameColumns: [
      fieldsApi.name,
      category?.name,
      fieldsApi.desc,
      fieldsApi.amount,
    ] as unknown as TTableColumns[],
  };
};
