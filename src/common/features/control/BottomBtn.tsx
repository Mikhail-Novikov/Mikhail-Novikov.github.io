import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@common/components';

interface BottomBtnProps {
  /** Обработчик клика на кнопку Показать ещё */
  handleClickShow?: () => void;
  /** Обработчик клика на кнопку Добавить операцию */
  handleClickAdd?: () => void;
}

/**
 * Компонент кнопок добавления операции и показать ещё
 */
export const BottomBtn = ({
  handleClickAdd,
  handleClickShow,
}: BottomBtnProps): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <ul className="flex-row jce mt-24">
      <li className="mr-16">
        <Button
          label={t('add')}
          onClick={handleClickAdd}
          type="button"
          size="large"
        />
      </li>
      <li>
        <Button
          label={t('show-more')}
          onClick={handleClickShow}
          type="button"
          size="large"
        />
      </li>
    </ul>
  );
};
