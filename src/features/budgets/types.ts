export type TApiToProduct = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
};

type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BudgetState = {
  id: string;
  name?: string;
  desc?: string;
  amount?: number;
  createdAt?: Date;
  type?: 'Profit' | 'Cost';
  updatedAt: Date;
  category?: Category;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};
