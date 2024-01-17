import ContextReducer from '@context/ContextReducer';
import React, { useReducer } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from '@common/components/navigate';
import { config } from '@common/config';

import { selectors as initSelector } from '@features/init-app';

import { AuthorizationPage, BudgetsPage, UserProfilePage } from '@pages';

import { addOperationReducer } from './store/reducers';

/**
 * Компонент роутинга страниц
 * @returns - Компонент
 */
export function AppRoutes(): JSX.Element {
  const {
    budgetList,
    budgetProfitList,
    budgetCostList,
    budgetCost,
    authorization,
    userProfile,
  } = config.routes;

  const [state, dispatch] = useReducer(addOperationReducer, {});

  const { initApp } = initSelector.useInitialAppSelector();
  // eslint-disable-next-line no-console
  console.log('Инициализация приложения', initApp);

  return (
    <ContextReducer.Provider value={{ state, dispatch }}>
      <ProtectedRoute>
        <Router>
          <Switch>
            <Route exact path={budgetList.url} component={BudgetsPage} />
            <Route exact path={budgetProfitList.url} component={BudgetsPage} />
            <Route exact path={budgetCostList.url} component={BudgetsPage} />
            <Route exact path={budgetCost.url} component={BudgetsPage} />
          </Switch>
        </Router>
      </ProtectedRoute>
      <Router>
        <Switch>
          <Route exact path={userProfile.url} component={UserProfilePage} />
          <Route exact path={authorization.url} component={AuthorizationPage} />
        </Switch>
      </Router>
    </ContextReducer.Provider>
  );
}
