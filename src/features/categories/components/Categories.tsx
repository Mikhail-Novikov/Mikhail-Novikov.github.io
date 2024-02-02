import { useContextReducer } from '@context/ContextReducer';
import { useCategoryProcessActions } from '@processes/gategory';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

import { EditCategoryForm } from '@common/components/form/category-form';
import { CategoryTable } from '@common/components/table';

import { selectors as selectorsCategory } from '@features/categories';
import { useCategory } from '@features/categories/ducks';
import { selectors as selectorsModal, useModal } from '@features/modal';

import { TTableList } from '../types';

interface BudgetProps {
  data: TTableList[];
}

/**
 * Компонент отображения категорий
 */
export const Categories = ({ data }: BudgetProps): React.ReactElement => {
  const { category, editCategory, sendEditFormCategory } =
    useCategoryProcessActions();
  const { setId } = useCategory();
  const { dispatch } = useContextReducer();
  const { isOpen } = selectorsModal.useModalSelector();
  const fields = selectorsCategory.useCategorySelector();

  const [idCategoryToClick, setIdCategoryToClick] = useState<string>();

  const { showModal } = useModal();

  const handleClickRow = (id: string) => {
    setId(id);
    category();
  };

  /* заполняем форму со строки таблицы на иконку */
  const handleClickEditCategory = (id: string) => {
    setIdCategoryToClick(id);

    setId(id);
    editCategory(idCategoryToClick);
  };

  /* отправляем отредактированные поля */
  const sendingToForm = (valueFieldsEditedForm: any) => {
    sendEditFormCategory(valueFieldsEditedForm);
    showModal({
      isOpen: false,
    });
    dispatch({
      type: 'closeModal',
      payload: <></>,
      titleModal: '',
    });
    /* изменяю стейт в компоненте, рендеринга нет, реактивности нет */
    category();
  };

  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: 'editModalOperation',
        payload: (
          <EditCategoryForm
            submitOnSuccess={sendingToForm}
            formValues={fields}
          />
        ),
        titleModal: t('edit_category'),
      });
    }
  }, [isOpen]);

  return (
    <CategoryTable
      data={data}
      handleClickRow={handleClickRow}
      handleClickEditCategory={handleClickEditCategory}
    />
  );
};
