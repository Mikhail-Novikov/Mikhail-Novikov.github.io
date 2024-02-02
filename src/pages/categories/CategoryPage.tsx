import { useContextReducer } from '@context/ContextReducer';
import { useCategoryProcessActions } from '@processes/gategory';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from '@layouts/index';

import { CreateCategoryForm } from '@common/components/form/category-form';
import { BottomBtn } from '@common/features/control';

import { api as apiCategory } from '@features/categories/api';
import { Categories } from '@features/categories/components';
import {
  CategoryState,
  TTableList,
  TTableRows,
} from '@features/categories/types';

export enum Themes {
  dark = 'dark',
  light = 'light',
}

/**
 * Страница списка Расходов
 * @returns - Компонент
 */
export const CategoryPage = (): React.ReactElement => {
  const [operations, setOperations] = useState<TTableList[]>(null);
  const [countOperation, setCountOperation] = useState<number>(5);
  const { dispatch } = useContextReducer();
  const { addCategory } = useCategoryProcessActions();

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      try {
        const tokenApp = localStorage.getItem('token-app');
        const res = await apiCategory.categoriesPostFetch(tokenApp);

        const transformRes = res.map((item: CategoryState) => ({
          id: item.id,
          name: [
            item.createdAt,
            item.name,
            item.photo,
          ] as unknown as TTableRows[],
        }));

        setOperations(transformRes);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('getOperations error', error);
      }
    };
    fetch();
  }, [countOperation]);

  const showOperation = () => setCountOperation(() => countOperation + 5);

  const sendingToForm = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('sendingToForm add-category', values);
    addCategory(values);
  };

  const addCategoriesForm = () => {
    dispatch({
      type: 'openModalAdd',
      payload: <CreateCategoryForm submitOnSuccess={sendingToForm} />,
      titleModal: t('add_categories'),
    });
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-16 margin-bottom-12">
        {t('category-list')}
      </h1>

      <Categories data={operations} />

      <BottomBtn
        handleClickShow={showOperation}
        handleClickAdd={addCategoriesForm}
      />
    </Layout>
  );
};
