import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import { combineReducers } from 'redux';

import { nameFeatures } from '@common/constants';

import { budgetReducer } from '@features/budgets';
import { categoryReducer } from '@features/categories';
import { initAppReducer } from '@features/init-app';
import { modalReducer } from '@features/modal';
import { operationReducer } from '@features/operation';
import { profileReducer } from '@features/profile';
import { registrationReducer } from '@features/registration';
import { tokenReducer } from '@features/token';

export const history = createHashHistory({ basename: '/' });

const rootReducer = combineReducers({
  [nameFeatures.router]: connectRouter(history),
  [nameFeatures.initApp]: initAppReducer,
  [nameFeatures.token]: tokenReducer,
  [nameFeatures.registration]: registrationReducer,
  [nameFeatures.profile]: profileReducer,
  [nameFeatures.operation]: operationReducer,
  [nameFeatures.budget]: budgetReducer,
  [nameFeatures.category]: categoryReducer,
  [nameFeatures.modal]: modalReducer,
});

export default rootReducer;
