import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

/**
 *  Заголовки столбцов таблицы
 */
const BudgetTableThead = (): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <>
      <colgroup>
        <col style={{ width: '10px' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '15%' }} />
        <col />
        <col style={{ width: '160px' }} />
        <col style={{ width: '160px' }} />
      </colgroup>
      <thead>
        <tr>
          <th className="padding-left-none" colSpan={2}>
            {t('table_column_name')}
          </th>
          <th>{t('table_column_category')}</th>
          <th>{t('table_column_description')}</th>
          <th>{t('table_column_amount')}</th>
          <th aria-label="column" />
        </tr>
      </thead>
    </>
  );
};

export default BudgetTableThead;
