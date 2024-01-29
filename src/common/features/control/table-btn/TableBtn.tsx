import { useContextReducer } from '@context/ContextReducer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

import deletePathImage from '@src/images/delete.svg';
import editPathImage from '@src/images/modify.svg';
import { useOperationProcessActions } from '@src/processes/operation';

import { Button } from '@common/components';
import { OperationForm } from '@common/components/form';

import { selectors } from '@features/operation';

/**
 * Компонент кнопок редактирования и удаления операции
 * @returns - компонет кнопок
 */
export const TableBtn = (): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  const { addOperation } = useOperationProcessActions();
  const { dispatch } = useContextReducer();
  const { editOperation } = useOperationProcessActions();
  const data = selectors.useOperationSelector();

  /* запуск процесса редактирования операции */
  useMemo(() => {
    editOperation('651c493c8a42911d60f0322b');
  }, []);

  /* отправка отредактированных данных с формы */
  const submitEditOperation = (values: any) => {
    // eslint-disable-next-line no-console
    console.log('submitEditOperation', values);
    addOperation(values);
  };

  const editOperationClick = () => {
    dispatch({
      type: 'editModalOperation',
      payload: (
        <OperationForm
          isEdit
          submitOnSuccess={submitEditOperation}
          formValues={data}
        />
      ),
      titleModal: t('edit_operation'),
    });
  };

  /**
   * 1. по клику на кнопку "Редактирование строки" editOperationClick - запуск процесса
   * 2. процесс запустит saga и сформируется селектор с data
   * 3. записать данные из селектора в formValues
   * 4. когда formValues изменился запускаем dispatch
   * 4. dispatch type: 'editModalOperation' откроет окно  с формой и перенесёт formValues в пропс formValues в форму
   * 5. форма получает значения опреции
   * 6. запустить процесс добавления операции с передачей id для смены типа запроса на PATCH
   *
   */

  const deleteOperationClick = () => {
    dispatch({
      type: 'deleteModalOperation',
      payload: <OperationForm isEdit submitOnSuccess={() => null} />,
      titleModal: t('edit_operation'),
    });
  };

  return (
    <div className="table-btn">
      <Button
        type="button"
        label={<img src={editPathImage} alt="" />}
        isBorder={false}
        onClick={editOperationClick}
      />

      <Button
        type="button"
        label={<img src={deletePathImage} alt="" />}
        isBorder={false}
        onClick={deleteOperationClick}
      />
    </div>
  );
};
