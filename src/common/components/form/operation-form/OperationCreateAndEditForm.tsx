import '../form.css';
import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
export const OperationCreateAndEditForm = ({
  isEdit,
  submitOnSuccess,
  formValues,
}: OperationFormProps): React.ReactElement => {
  const dateInputValue = new Date().toISOString();
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  // eslint-disable-next-line no-console
  console.log('🚀 ~ data:', formValues);

  const initialValuesOfForm = {
    name: 'add',
    desc: '',
    amount: 0,
    date: dateInputValue,
    type: '',
    category: '',
  };

  const incomingFormValues = {
    ...formValues,
    date: dateInputValue,
    name: 'edit',
  };

  const isInitialValue = isEdit ? incomingFormValues : initialValuesOfForm;
  // eslint-disable-next-line no-console
  console.log('🚀 ~ isInitialValue:', isInitialValue);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: isInitialValue,
  });

  useEffect(() => {
    setValue('name', formValues.name);
    setValue('category', formValues.category);
    setValue('amount', formValues.amount);
    setValue('desc', formValues.desc);
  }, [formValues]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        submitOnSuccess(data);
      })}
      id="operation"
      className="form"
    >
      <div
        className="flex-row align-items-center gap-16 mb-12"
        role="group"
        aria-labelledby="my-radio-group"
      >
        <div className="flex-row align-items-center">
          <label className="mb-0" htmlFor="Profit">
            <input
              name="type"
              type="radio"
              value="Profit"
              {...register('type', { required: false })}
            />
            {t('profit-list')}
          </label>
        </div>

        <div className="flex-row align-items-center">
          <label className="mb-0" htmlFor="Cost">
            <input
              name="type"
              type="radio"
              value="Cost"
              {...register('type', { required: false })}
            />

            {t('cost-list')}
          </label>
        </div>
      </div>

      <div className="mb-32">
        <label>Название операции</label>
        <input
          type="text"
          {...register('name', { required: false, minLength: 4 })}
        />
      </div>

      <div className="mb-32">
        <label>Категория</label>
        <input type="text" {...register('category', { required: false })} />
      </div>

      <div className="mb-32">
        <label>Сумма</label>
        <input type="number" {...register('amount', { required: false })} />
      </div>

      <div className="mb-32">
        <label>Описание</label>
        <input type="text" {...register('desc', { required: false })} />
      </div>
    </form>
  );
};
