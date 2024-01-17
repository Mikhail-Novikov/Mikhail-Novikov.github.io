import { createHashHistory } from 'history';
import React, { FC } from 'react';

import { useAuthorization } from '@common/hooks';

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthorization } = useAuthorization();
  const history = createHashHistory();

  if (isAuthorization) {
    return <>{children}</>;
  }

  history.replace('/authorization');

  return null;
};
