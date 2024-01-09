import ContextReducer from '@context/ContextReducer';
import React, { useReducer } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { config } from '@common/config';

import { AuthorizedPage, BudgetsPage } from '@pages';

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
    authorized,
  } = config.routes;

  // const initialState = {
  //   isOpen: false,
  //   form: <></>,
  //   titleModal: '',
  // };

  const [state, dispatch] = useReducer(addOperationReducer, {});

  return (
    <ContextReducer.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path={budgetList.url} component={BudgetsPage} />
          <Route exact path={budgetProfitList.url} component={BudgetsPage} />
          <Route exact path={budgetCostList.url} component={BudgetsPage} />
          <Route exact path={budgetCost.url} component={BudgetsPage} />
          <Route exact path={authorized.url} component={AuthorizedPage} />
        </Switch>
      </Router>
    </ContextReducer.Provider>
  );
}
