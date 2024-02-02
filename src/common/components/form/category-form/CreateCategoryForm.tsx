import '../form.css';
import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { TFieldsAddOPeration } from '@common/types';

interface OperationFormProps {
  /** режим редактирования */
  isEdit?: boolean;
  /** Данные для полей операции при редактировании */
  formValues?: any;
  /** Обработчик формы */
  submitOnSuccess: (values: TFieldsAddOPeration) => void;
}
/**
 * Компонент формы создание и редактирования операции
 * @param isEdit - режим редактирования
 * @returns - компонет кнопок
 */
export const CreateCategoryForm = ({
  isEdit,
  submitOnSuccess,
  formValues,
}: OperationFormProps): React.ReactElement => {
  const dateInputValue = new Date().toISOString();

  const initialValuesOfForm = {
    name: 'add',
  };

  const incomingFormValues = {
    ...formValues,
    createdAt: dateInputValue,
  };

  const isInitialValue = isEdit ? incomingFormValues : initialValuesOfForm;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isInitialValue,
  });

  useEffect(() => {
    setValue('name', formValues?.name);
    setValue('createdAt', dateInputValue);
  }, [formValues]);

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
