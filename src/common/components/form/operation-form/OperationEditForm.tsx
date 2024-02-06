import { Field, Form, Formik } from 'formik';
import '../form.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TFieldsAddOPeration } from '@common/types';

import { Operation } from '@features/operation/types';

import { ErrorMessages } from '../registration-form/error-message';

interface OperationFormProps {
  /** Данные для полей операции при редактировании */
  formValues?: Operation;
  /** Обработчик формы */
  submitOnSuccess: (values: TFieldsAddOPeration) => void;
}

/**
 * Компонент формы редактирования операции
 * @param {OperationFormProps}
 * @returns - компонент формы
 */
export const OperationEditForm = ({
  submitOnSuccess,
  formValues,
}: OperationFormProps): React.ReactElement => {
  const dateInputValue = new Date().toISOString();

  const incomingFormValues = {
    ...formValues,
    date: dateInputValue,
    categoryId: formValues.category?.id,
  };

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={incomingFormValues}
      onSubmit={(values, actions) => {
        submitOnSuccess(values);
        actions.resetForm();
      }}
    >
      <Form className="form" id="operation">
        <div
          className="flex-row align-items-center gap-16 mb-12"
          role="group"
          aria-labelledby="my-radio-group"
        >
          <label className="mb-0 flex-row align-items-center" htmlFor="Profit">
            {' '}
            <Field
              id="Profit"
              type="radio"
              name="type"
              value="Profit"
              form="operation"
            />
            {t('profit-list')}
          </label>

          <label className="mb-0 flex-row align-items-center" htmlFor="Cost">
            {' '}
            <Field
              id="Cost"
              type="radio"
              name="type"
              value="Cost"
              form="operation"
            />
            {t('cost-list')}
          </label>
        </div>

        <div className="mb-32">
          <label htmlFor="title">*{t('table_column_name')}</label>
          <Field id="title" name="name" type="text" />
          <ErrorMessages field="name" />
        </div>

        <div className="mb-8">
          <label htmlFor="amount">*{t('table_column_amount')}</label>
          <Field id="amount" name="amount" type="number" min={0} />
        </div>

        <div className="mb-8">
          <label htmlFor="desc">{t('table_column_description')}</label>
          <Field id="desc" name="desc" as="textarea" />
        </div>
      </Form>
    </Formik>
  );
};
