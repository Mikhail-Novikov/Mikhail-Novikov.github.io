import { Field, Form, Formik } from 'formik';
import '../form.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { validateNumber, validateText } from '../ValidationShema';
import { ErrorMessages } from '../error-message';

interface OperationFormProps {
  /** режим редактирования */
  isEdit: boolean;
}

/**
 * Компонент формы добавления операции дохода/расхода
 * @param isEdit - режим редактирования
 * @returns - компонет кнопок
 */
export const OperationForm = ({
  isEdit,
}: OperationFormProps): React.ReactElement => {
  const [typeOperation, setTypeOperation] = useState<string>('profit');

  const incomingFormValues = {
    typeOperation: 'cost',
    title: 'сумка',
    category: 'подарок',
    description: 'сестре на др',
    amount: 1500,
  };

  const initialValuesOfForm = {
    typeOperation: '',
    title: '',
    category: '',
    description: '',
    amount: 0,
  };

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={isEdit ? incomingFormValues : initialValuesOfForm}
      onSubmit={(values, actions) => {
        actions.resetForm();
      }}
    >
      <Form className="form">
        {!isEdit && (
          <div className="flex-row align-items-center gap-16 mb-12">
            <div className="flex-row align-items-center">
              <Field
                id="typeOperationProfit"
                type="radio"
                name="typeOperation"
                value="profit"
                onChange={() => setTypeOperation('profit')}
                checked={typeOperation === 'profit'}
                dispatch
              />
              <label className="mb-0" htmlFor="typeOperationProfit">
                {t('profit-list')}
              </label>
            </div>

            <div className="flex-row align-items-center">
              <Field
                id="typeOperationCost"
                type="radio"
                name="typeOperation"
                value="cost"
                onChange={() => setTypeOperation('cost')}
                checked={typeOperation === 'cost'}
              />
              <label className="mb-0" htmlFor="typeOperationCost">
                {t('cost-list')}
              </label>
            </div>
          </div>
        )}

        <div className="mb-32">
          <label htmlFor="title">*{t('table_column_name')}</label>
          <Field id="title" name="title" type="text" validate={validateText} />
          <ErrorMessages field="title" />
        </div>

        <div className="mb-8">
          <label htmlFor="category">*{t('table_column_category')}</label>
          <Field
            id="category"
            name="category"
            type="text"
            validate={validateText}
          />
          <ErrorMessages field="category" />
        </div>

        <div className="mb-8">
          <label htmlFor="amount">*{t('table_column_amount')}</label>
          <Field
            id="amount"
            name="amount"
            type="number"
            validate={validateNumber}
          />
          <ErrorMessages field="amount" />
        </div>

        <div className="mb-8">
          <label htmlFor="description">{t('table_column_description')}</label>
          <Field id="description" name="description" as="textarea" />
        </div>
      </Form>
    </Formik>
  );
};
