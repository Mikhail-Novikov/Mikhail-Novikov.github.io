type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TTableRows = {
  name: string;
  category: Category;
  desc: string;
  amount: number;
};

export type TTableList = {
  id: string;
  type: string;
  name: TTableRows[];
};

export type Operation = {
  id: string;
  name?: string;
  desc?: string;
  createdAt?: Date;
  updatedAt?: Date;
  amount?: number;
  category?: Category;
  type?: 'Cost' | 'Profit';
};

export type TFieldsAddOPeration = {
  name: string;
  desc?: string;
  amount: number;
  date: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  type: string;
  categoryId: string;
};

export enum NamesColumns {
  Tag = 'Операция',
  Name = 'Название',
  Category = 'Категория',
  Description = 'Описание',
  Amount = 'Сумма',
  Details = 'Подробно',
}
