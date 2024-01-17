import { combineReducers } from 'redux';

import { nameFeatures } from '@common/constants';

import { initAppReducer } from '@features/init-app';
import { registrationReducer } from '@features/registration';
import { tokenReducer } from '@features/token';

const rootReducer = combineReducers({
  [nameFeatures.initApp]: initAppReducer,
  [nameFeatures.token]: tokenReducer,
  [nameFeatures.registration]: registrationReducer,
});

export default rootReducer;
