import React from 'react';
import '../style.css';
import { useTranslation } from 'react-i18next';

/**
 *  Заголовки столбцов таблицы
 */
const CategoryTableThead = (): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <>
      <colgroup>
        <col style={{ width: '190px' }} />
        <col />
        <col style={{ width: '190px' }} />
        <col style={{ width: '160px' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Дата</th>
          <th>{t('table_column_name')}</th>
          <th>Фото</th>
          <th aria-label="column" />
        </tr>
      </thead>
    </>
  );
};

export default CategoryTableThead;
