import React from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@layouts/index';

import { useAuthorization } from '@common/hooks';

/**
 * Страница списка Расходов
 * @returns - Компонент
 */
export const UserProfilePage = (): React.ReactElement => {
  const { isAuthorization } = useAuthorization();

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-16">Профиль</h1>
      <div className="width-75">
        {isAuthorization ? (
          <>поля профиля</>
        ) : (
          <div>
            <h2 className="margin-bottom-16">Вы не авторизованы</h2>
            <Link to="/authorization">Пройти авторизацию</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};
