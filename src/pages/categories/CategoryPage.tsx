import { useContextReducer } from '@context/ContextReducer';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from '@layouts/index';
import { useCategoryProcessActions } from '@src/processes/category';

import { CreateCategoryForm } from '@common/components/form/category-form';
import { BottomBtn } from '@common/features/control';
import { Category } from '@common/types';

import { selectors } from '@features/categories';
import { api as apiCategory } from '@features/categories/api';
import { Categories } from '@features/categories/components';
import {
  CategoryState,
  TTableList,
  TTableColumns,
} from '@features/categories/types';
import { StatusMessageModal } from '@features/modal/components';

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
  const { data } = selectors.useCategorySelector();

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  const formatDates = (el: string) => el.replace(/^"(.+(?="$))"$/, '$1');
  const formatCreateAd = (item: string) => {
    const createDate = new Date(item);
    return JSON.stringify(createDate.toLocaleString('ru-RU', options));
  };

  /* преобразовние полей категорий с внешнего API в столбцы таблицы */
  const transformRes = (res: CategoryState[]) =>
    res.map((item: CategoryState) => ({
      id: item.id,
      nameColumns: [
        formatDates(formatCreateAd(item.createdAt)),
        item.name,
        item.photo,
      ] as unknown as TTableColumns[],
    }));

  /* рендер компонента при изменении списка категорий при удалениии и редактировании */
  useEffect(() => setOperations(transformRes(data)), [data]);

  /* первоначальная загрузка списка категорий и по запросу Показать ещё */
  useEffect(() => {
    const fetch = async () => {
      const tokenApp = localStorage.getItem('token-app');
      const res = await apiCategory.categoriesPostFetch(tokenApp);

      setOperations(transformRes(res));
    };
    fetch();
  }, [countOperation]);

  /* обработчик кнопки Показать ещё, увеличивает кол-во опреаций к показу на странице */
  const showMore = () => setCountOperation(() => countOperation + 5);

  /* отправляем заполненую форму на сервер и закрываем форму */
  const sendingToForm = (values: Category) => {
    addCategory(values);
    dispatch({
      type: 'closeModal',
      payload: <></>,
      titleModal: '',
    });
  };

  /* открываем форму Добавления операции в модальном окне */
  const addCategoriesForm = () => {
    dispatch({
      type: 'openModalAdd',
      payload: <CreateCategoryForm submitOnSuccess={sendingToForm} />,
      titleModal: t('add_categories'),
      rightBtn: 'Сохранить',
    });
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-16 margin-bottom-12">
        {t('category-list')}
      </h1>

      <Categories data={operations} />

      <BottomBtn
        handleClickShow={showMore}
        handleClickAdd={addCategoriesForm}
      />

      <StatusMessageModal />
    </Layout>
  );
};
