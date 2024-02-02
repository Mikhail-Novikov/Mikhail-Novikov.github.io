import { Field, Form, Formik } from 'formik';
import '../form.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TFieldsAddOPeration } from '@common/types';

// import { validateNumber, validateText } from '../ValidationShema';
import { ErrorMessages } from '../error-message';

interface OperationFormProps {
  /** режим редактирования */
  isEdit?: boolean;
  /** Данные для полей операции при редактировании */
  formValues?: any;
  /** Обработчик формы */
  submitOnSuccess: (values: TFieldsAddOPeration) => void;
}

/**
 * Компонент формы добавления операции дохода/расхода
 * @param isEdit - режим редактирования
 * @returns - компонет кнопок
 */
export const OperationForm = ({
  isEdit,
  submitOnSuccess,
  formValues,
}: OperationFormProps): React.ReactElement => {
  const dateInputValue = new Date().toISOString();

  const incomingFormValues = {
    ...formValues,
    date: dateInputValue,
  };

  const initialValuesOfForm = {
    name: 'add',
    desc: '',
    amount: 0,
    date: dateInputValue,
    type: '',
    categoryId: '',
  };

  const isInitialValue = isEdit ? incomingFormValues : initialValuesOfForm;

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={isInitialValue}
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
          <div className="flex-row align-items-center">
            <label className="mb-0" htmlFor="Profit">
              {' '}
              <Field
                id="Profit"
                type="radio"
                name="type"
                value="Profit"
                form="operation"
                checked
              />
              {t('profit-list')}
            </label>
          </div>

          <div className="flex-row align-items-center">
            <label className="mb-0" htmlFor="Cost">
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
        </div>

        <div className="mb-32">
          <label htmlFor="title">*{t('table_column_name')}</label>
          <Field id="title" name="name" type="text" />
          <ErrorMessages field="name" />
        </div>

        <div className="mb-8">
          <label htmlFor="categoryId">*{t('table_column_category')}</label>
          <Field id="categoryId" name="categoryId" type="text" />
          <ErrorMessages field="categoryId" />
        </div>

        <div className="mb-8">
          <label htmlFor="amount">*{t('table_column_amount')}</label>
          <Field id="amount" name="amount" type="number" />
          <ErrorMessages field="amount" />
        </div>

        <div className="mb-8">
          <label htmlFor="desc">{t('table_column_description')}</label>
          <Field id="desc" name="desc" as="textarea" />
        </div>
      </Form>
    </Formik>
  );
};
