import ContextReducer from '@context/ContextReducer';
import React, { useReducer } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from '@common/components/navigate';
import { config } from '@common/config';

import { selectors as initSelector } from '@features/init-app';

import { RegistrationPage, BudgetsPage, UserProfilePage } from '@pages';

import { BudgetItemPage } from '@pages/budgets';

import { addOperationReducer } from './store/reducers';

/**
 * Компонент роутинга страниц
 * @returns - Компонент
 */
export function AppRoutes(): JSX.Element {
  const { budgetList, budgetItem, budgetCostList, authorization, userProfile } =
    config.routes;

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
            <Route exact path={budgetItem.url} component={BudgetItemPage} />
            <Route exact path={budgetCostList.url} component={BudgetsPage} />
          </Switch>
        </Router>
      </ProtectedRoute>
      <Router>
        <Switch>
          {/* по ТЗ авторизация должна быть не доступна для не рег. пользователей,
          но было решено оставить её для возможности ввести свои данные
          если ранее была регистрация */}
          <Route exact path={userProfile.url} component={UserProfilePage} />
          <Route exact path={authorization.url} component={RegistrationPage} />
        </Switch>
      </Router>
    </ContextReducer.Provider>
  );
}
