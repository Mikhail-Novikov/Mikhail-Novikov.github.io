import '../form.css';
import React from 'react';
import { useForm } from 'react-hook-form';

import { CategoryState } from '@features/categories/types';

interface EditCategoryFormProps {
  /** режим редактирования */
  isEdit?: boolean;
  /** Данные для полей операции при редактировании */
  formValues?: CategoryState;
  /** Обработчик формы */
  submitOnSuccess: (values: CategoryState) => void;
}
/**
 * Компонент формы создание и редактирования операции
 * @param isEdit - режим редактирования
 * @returns - компонет кнопок
 */
export const EditCategoryForm = ({
  submitOnSuccess,
  formValues,
}: EditCategoryFormProps): React.ReactElement => {
  const dateInputValue = new Date().toISOString();

  const incomingFormValues = {
    ...formValues,
    createdAt: dateInputValue,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: incomingFormValues,
  });

  const onSubmit = (data: typeof incomingFormValues) => submitOnSuccess(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="operation" className="form">
      <div className="mb-32">
        <label>*Название категории</label>
        <input
          type="text"
          {...register('name', { required: true, minLength: 4 })}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name?.type === 'required' && (
          <div className="txt-danger txt-micro" role="alert">
            Введите название категории
          </div>
        )}
      </div>

      <div className="mb-32">
        <label>Фото</label>
        <input
          type="text"
          readOnly
          {...register('photo', { required: false })}
        />
      </div>
    </form>
  );
};
