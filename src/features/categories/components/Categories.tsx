import { useContextReducer } from '@context/ContextReducer';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

import { useCategoryProcessActions } from '@src/processes/category';

import { EditCategoryForm } from '@common/components/form/category-form';
import { CategoryTable } from '@common/components/table';

import { selectors as selectorsCategory } from '@features/categories';
import { useCategory } from '@features/categories/ducks';
import { selectors as selectorsModal, useModalActions } from '@features/modal';

import { CategoryState, TTableList } from '../types';

interface BudgetProps {
  data: TTableList[];
}

/**
 * Компонент отображения категорий
 */
export const Categories = ({ data }: BudgetProps): React.ReactElement => {
  const { editCategory, sendEditFormCategory, deleteCategory } =
    useCategoryProcessActions();
  const { setId } = useCategory();
  const { dispatch } = useContextReducer();
  const { isOpen } = selectorsModal.useModalSelector();
  const fields = selectorsCategory.useCategorySelector();

  const [idCategoryToClick, setIdCategoryToClick] = useState<string>();

  const { showModal } = useModalActions();

  /* заполняем форму со строки таблицы на иконку */
  const handleClickEditCategory = (id: string) => {
    setIdCategoryToClick(id);

    setId(id);
    editCategory(idCategoryToClick);
  };

  /* отправляем отредактированные поля */
  const sendingToForm = (valueFieldsEditedForm: CategoryState) => {
    sendEditFormCategory(valueFieldsEditedForm);
    showModal({
      isOpen: false,
      isOpenSuccess: false,
    });
    dispatch({
      type: 'closeModal',
      payload: <></>,
      titleModal: '',
    });
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

  /* запускаем процесс удаления строки категории */
  const handleClickDeleteCategory = (id: string) => {
    setId(id);
    deleteCategory(id);
  };

  return (
    <CategoryTable
      data={data}
      handleClickEditCategory={handleClickEditCategory}
      handleClickDeleteCategory={handleClickDeleteCategory}
    />
  );
};
