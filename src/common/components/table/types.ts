export enum NamesColumns {
  Tag = 'Операция',
  Name = 'Название',
  Category = 'Категория',
  Description = 'Описание',
  Amount = 'Сумма',
  Details = 'Подробно',
}

export enum TBudgetType {
  Budgets = 'Общий бюджет',
  Profit = 'Доходы',
  Expenses = 'Расходы',
}

export type TTableList = {
  id: number;
  tag: string;
  name: string[];
};

export type TBudget = TBudgetType | TTableList;

type Category = {
  id: string;
  name: string;
  photo?: string;
};

/** CommonWrite - общий тип */
type CommonWrite = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  category: Category;
};

export type Cost = {
  amount: number;
  type: 'Cost';
} & Omit<CommonWrite, 'photo'>;

/** Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 */

export type Profit = {
  amount: number;
  type: 'Profit';
} & Omit<CommonWrite, 'photo'>;

/** Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit) */
export type Operation = Cost | Profit;

export type TApiToProduct = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
};
