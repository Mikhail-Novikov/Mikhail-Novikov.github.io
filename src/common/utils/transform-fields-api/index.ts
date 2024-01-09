import { TTableList } from '@common/components/table/types';

export type OperationShemaApi = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

/**
 * Преобразование полей api из запроса в объект для приложения
 * @param fieldsApi - Поля из api
 * @returns - преобразованный объект
 */
export const transformFieldsApi = (
  fieldsApi: OperationShemaApi,
): TTableList => {
  const { id, title, price, category, description } = fieldsApi;

  const tag = ['Cost', 'Profit'][Math.floor(Math.random() * 2)];

  return { id, tag, name: [title, category, description, price] };
};
