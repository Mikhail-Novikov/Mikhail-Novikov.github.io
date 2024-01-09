import cn from 'clsx';
import React from 'react';
import './modal.css';
import { useTranslation } from 'react-i18next';

import { Button } from '../button';

interface ModalProps {
  /** Контент модального окна */
  content: string | React.ReactElement;
  /** Заголовок модального окна */
  titleModal: string;
  /** Признак открытия модального окна */
  isOpenModal: boolean;
  /** Обработчик кнопки закрытия окна  */
  handleClickButton: () => void;
}

/**
 * Modal UI component for user interaction
 */
export const Modal = ({
  content,
  titleModal,
  isOpenModal,
  handleClickButton,
}: ModalProps): React.ReactElement => {
  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <>
      <div className={cn('modal', isOpenModal && 'modal-visible')}>
        <div className="modal-body">
          <div className="modal-header">
            <h2>{titleModal}</h2>
          </div>
          <div className="modal-content">
            <>{content}</>
          </div>
          <ul className="list modal-footer">
            <li className="left">
              <Button
                label={t('cancel')}
                onClick={handleClickButton}
                type="button"
              />
            </li>
            <li>
              <Button
                label={t('save')}
                primary
                onClick={handleClickButton}
                type="submit"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="storybook-overlay" />
    </>
  );
};
