import React from 'react';

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
}: BottomBtnProps): React.ReactElement => (
  <ul className="flex-row jce mt-24">
    <li className="mr-16">
      <Button
        label="Добавить операцию"
        onClick={handleClickAdd}
        type="button"
        size="large"
      />
    </li>
    <li>
      <Button
        label="Показать ещё"
        onClick={handleClickShow}
        type="button"
        size="large"
      />
    </li>
  </ul>
);
