import { ErrorMessage } from 'formik';
import React from 'react';

interface ErrorMessagesProps {
  /** имя поля валидации */
  field: string;
}

/**
 * Компонент ошибки ввода значения в поле формы
 */
export const ErrorMessages = ({
  field,
}: ErrorMessagesProps): React.ReactElement => (
  <div className="error">
    <ErrorMessage component="span" name={field} />
  </div>
);
