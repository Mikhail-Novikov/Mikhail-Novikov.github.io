import '../form.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Category, TFieldsAddOPeration } from '@common/types';

import { TFormSelectValues } from './types';

interface OperationFormProps {
  /** Обработчик формы */
  submitOnSuccess: (values: Partial<TFieldsAddOPeration>) => void;
  /** id значения категорий */
  categoryValueId?: TFormSelectValues[];
}
/**
 * Компонент формы создание операции
 * @param {OperationFormProps}
 * @returns - компонент формы
 */
export const OperationCreateForm = ({
  submitOnSuccess,
  categoryValueId,
}: OperationFormProps): React.ReactElement => {
  const dateInputValue = new Date().toISOString();
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  const initValues = {
    name: '',
    desc: '',
    amount: 0,
    date: dateInputValue,
    type: '',
    categoryId: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initValues,
  });

  if (!categoryValueId.length) {
    return (
      <>
        <h4 className="mb-32 margin-top-none">
          У вас нет категорий для создания операций.
        </h4>
        <div>Сначала создайте категории</div>
      </>
    );
  }

  const onSubmit = (data: typeof initValues) => submitOnSuccess(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="operation" className="form">
      <div className="mb-12" role="group" aria-labelledby="my-radio-group">
        <div className="flex-row align-items-center gap-16 ">
          <div className="flex-row align-items-center">
            <label className="mb-0" htmlFor="Profit">
              <input
                name="type"
                type="radio"
                value="Profit"
                {...register('type', { required: true })}
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
                {...register('type', { required: true })}
              />

              {t('cost-list')}
            </label>
          </div>
        </div>

        {errors.type?.type === 'required' && (
          <div className="margin-4 txt-danger txt-micro" role="alert">
            {t('select-operation')}
          </div>
        )}
      </div>

      <div className="mb-32">
        <label>*{t('label-name-operation')}</label>
        <input
          placeholder={t('enter-name')}
          type="text"
          {...register('name', { required: true, minLength: 3 })}
        />
        {errors.name?.type === 'required' && (
          <div className="txt-danger txt-micro" role="alert">
            {t('enter-name')}
          </div>
        )}
      </div>

      <div className="mb-32">
        <label>*{t('table_column_category')}</label>
        <select
          {...register('categoryId', { required: true })}
          placeholder="Выберите категорию"
        >
          {categoryValueId?.map((item: Category, index) => (
            <option value={item.id} key={index.toString()}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.categoryId?.type === 'required' && (
          <div className="txt-danger txt-micro" role="alert">
            Выберите категорию бюджета
          </div>
        )}
      </div>

      <div className="mb-32">
        <label>{t('table_column_amount')}</label>
        <input type="number" {...register('amount', { required: false })} />
      </div>

      <div className="mb-32">
        <label>{t('table_column_description')}</label>
        <input type="text" {...register('desc', { required: false })} />
      </div>
    </form>
  );
};
