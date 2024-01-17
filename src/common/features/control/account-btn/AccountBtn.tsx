import React from 'react';
import './style.css';
import { useHistory } from 'react-router';

import enterPathImage from '@src/images/enter.svg';
import userPathImage from '@src/images/user.svg';

import { config } from '@common/config';

interface AccountBtnProps {
  isAuthorization: boolean;
}

/**
 * Компонент кнопки входа в профиль
 * @param isAuthorization - авторизован
 * @returns - компонет кнопки авторизации
 */
export const AccountBtn = ({
  isAuthorization,
}: AccountBtnProps): React.ReactElement => {
  const history = useHistory();

  const goToAuthorization = () =>
    !isAuthorization
      ? history.push(config.routes.authorization.url)
      : history.push(config.routes.userProfile.url);

  return (
    <a
      className="account-btn"
      title="Профиль и регистрация"
      onClick={goToAuthorization}
    >
      <img
        src={isAuthorization ? userPathImage : enterPathImage}
        alt="Профиль"
      />
    </a>
  );
};
