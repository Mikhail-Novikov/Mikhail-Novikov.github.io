import React from 'react';
import './style.css';
import { useHistory } from 'react-router';

import enterPathImage from '@src/images/enter.svg';
import userPathImage from '@src/images/user.svg';

import { config } from '@common/config';

interface AccountBtnProps {
  isAuthorized: boolean;
}

/**
 * Компонент кнопки входа в профиль
 * @param isAuthorized - авторизован
 * @returns - компонет кнопки авторизации
 */
export const AccountBtn = ({
  isAuthorized,
}: AccountBtnProps): React.ReactElement => {
  const history = useHistory();

  const goToAuthorized = () => history.push(config.routes.authorized.url);

  return (
    <a
      className="account-btn"
      title="Авторизация и регистрация"
      onClick={goToAuthorized}
    >
      <img src={isAuthorized ? userPathImage : enterPathImage} alt="Профиль" />
    </a>
  );
};
