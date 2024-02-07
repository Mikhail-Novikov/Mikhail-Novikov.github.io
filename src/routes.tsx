import ContextReducer from '@context/ContextReducer';
import React, { useReducer } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from '@common/components/navigate';
import { config } from '@common/config';

import { RegistrationPage, BudgetsPage, UserProfilePage } from '@pages';

import { BudgetItemPage } from '@pages/budgets';
import { CategoryPage } from '@pages/categories';

import { addOperationReducer } from './store/reducers';

/**
 * Компонент роутинга страниц
 * @returns - Компонент
 */
export function AppRoutes(): JSX.Element {
  const { budgetList, categoryList, budgetItem, authorization, userProfile } =
    config.routes;
  const [state, dispatch] = useReducer(addOperationReducer, {});

  return (
    <ContextReducer.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path={authorization.url} component={RegistrationPage} />
        </Switch>
      </Router>
      <ProtectedRoute>
        <Router>
          <Switch>
            <Route exact path={budgetList.url} component={BudgetsPage} />
            <Route exact path={categoryList.url} component={CategoryPage} />

            <Route exact path={budgetItem.url} component={BudgetItemPage} />
            <Route exact path={userProfile.url} component={UserProfilePage} />
          </Switch>
        </Router>
      </ProtectedRoute>
    </ContextReducer.Provider>
  );
}
