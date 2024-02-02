export type TApiToProduct = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
};

export type CategoryState = {
  id: string;
  name: string;
  photo?: string;
  createdAt: string;
  updatedAt: Date;
};

export type TTableRows = {
  createdAt: string;
  name: string;
  photo?: string;
};

export type TTableList = {
  id: string;
  name: TTableRows[];
};

export type ActionEdit = {
  valueFieldsEditedForm: CategoryState;
  idCategoryToClick: string;
};

export type TFieldsAddOPeration = {
  name: string;
  desc?: string;
  amount: number;
  date: string;
  type: string;
  categoryId: string;
};
