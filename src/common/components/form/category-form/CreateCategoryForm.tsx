import '../form.css';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Category } from './types';

interface CreateCategoryFormProps {
  /** Данные для полей операции при редактировании */
  formValues?: Category;
  /** Обработчик формы */
  submitOnSuccess: (values: Category) => void;
}
/**
 * Компонент формы создание и редактирования операции
 * @param {CreateCategoryFormProps}
 * @returns - компонет формы
 */
export const CreateCategoryForm = ({
  submitOnSuccess,
  formValues,
}: CreateCategoryFormProps): React.ReactElement => {
  const dateInputValue = new Date().toISOString();

  const incomingFormValues = {
    ...formValues,
    name: formValues?.name,
    createdAt: dateInputValue,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: incomingFormValues,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        submitOnSuccess(data);
      })}
      id="operation"
      className="form"
    >
      <div className="mb-32">
        <label>*Название категории</label>
        <input
          type="text"
          {...register('name', { required: true, minLength: 4 })}
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
