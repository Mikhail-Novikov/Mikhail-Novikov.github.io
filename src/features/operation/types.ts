export enum NamesColumns {
  Name = 'Название',
  Category = 'Категория',
  Description = 'Описание',
  Amount = 'Сумма',
  Details = 'Подробно',
}

export enum TBudgetType {
  Profit = 'Доходы',
  Cost = 'Расходы',
}

export type TTableColumns = {
  name: string;
  category: string;
  desc: string;
  amount: number;
};

export type TTableList = {
  id: string;
  categoryId: string;
  type: string;
  nameColumns: TTableColumns[];
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
  createdAt: Date;
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

export type OperationState = {
  categoryId: string;
  date: string;
} & Operation;
