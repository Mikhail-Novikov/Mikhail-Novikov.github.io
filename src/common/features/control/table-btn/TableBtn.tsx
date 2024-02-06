import cn from 'clsx';
import React from 'react';

import './style.css';
import deletePathImage from '@src/images/delete.svg';
import editPathImage from '@src/images/modify.svg';

import { Button } from '@common/components';

interface TableBtnProps {
  /** Событие клика  редактирования */
  editClick: () => void;
  /** Событие клика  редактирования */
  deleteClick?: () => void;
  /** Событие клика  редактирования */
  isDisabled?: boolean;
}

/**
 * Компонент кнопок редактирования и удаления операции/категории
 * @param {TableBtnProps}
 * @returns - компонет кнопок
 */
export const TableBtn = ({
  editClick,
  deleteClick,
  isDisabled,
}: TableBtnProps): React.ReactElement => (
  <div className="table-btn">
    <div className={cn(isDisabled ? 'disabled' : '')}>
      <Button
        type="button"
        label={<img src={editPathImage} alt="" />}
        isBorder={false}
        onClick={editClick}
      />
    </div>

    <Button
      type="button"
      label={<img src={deletePathImage} alt="" />}
      isBorder={false}
      onClick={deleteClick}
    />
  </div>
);
