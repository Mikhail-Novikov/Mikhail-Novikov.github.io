import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import {
  SagaReturnType,
  all,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { config } from '@common/config';

import {
  actions as registrationActions,
  sagas as registrationSaga,
  selectors as registrationSelectors,
} from '@features/registration';

import { actions as registrationProcessAction } from './actions';
/**
 * Процесс инициализации приложения
 * @returns {void}
 */
export function* registrationProcess(): SagaIterator {
  try {
    /** Процесс регистрации и получения ответа(о профиле пользователя) */

    /* процесс для регистрации  */
    /**
     *  10. запускаем процесс регистрации пользователя из компонента AuthorizationPage submitForm => registration()
     *  11. отправка формы на сервер и получение ответа с токеном
     *  11. запуск записи из формы в стейт setState
     *  12. извлечь значение token из setState
     *  13. записать token в locastorage.set('token-app', token)
     *  14. проверка token на undefined и корректность
     *  15. запуск saga для разрешения авторизации
     */

    /** получение данных с формы */
    // const { email, password } = yield call(registrationActions.setState);
    const email: ReturnType<typeof registrationSelectors.selectorEmail> =
      yield select(registrationSelectors.selectorEmail);
    const password: ReturnType<typeof registrationSelectors.selectorPassword> =
      yield select(registrationSelectors.selectorPassword);

    /** отправка формы на сервер и получение ответа с токеном */
    const responseReg: SagaReturnType<
      typeof registrationSaga.registrationNewUserSaga
    > = yield call(registrationSaga.registrationNewUserSaga, {
      email,
      password,
    });

    /*  если нет ошибок в ответе */
    if (!responseReg.errors?.length) {
      /* запуск записи из формы в стейт setState */
      yield put(registrationActions.setState(responseReg));

      /* читаем токен из state после запроса */
      const token: ReturnType<typeof registrationSelectors.selectorsSetState> =
        yield select(registrationSelectors.selectorsSetState);

      /* запись token в locastorage */
      localStorage.setItem('token-app', token);

      /* Разрешаем авторизацию  */
      yield put(registrationActions.registrationSuccess());

      /* Переходим на основную страницу */
      yield put(push(config.routes.budgetList.url));
    }

    /** Записываем данные профиля в стейт ? */

    /** данные профиля нам нужны только при открытии страницы профиля,
     *  то есть надо сделать запрос на сервер и получить
     *  данные профиля и показать на странице профиля */

    /* процесс для profile */
    /** 1. переход на страницу профиля
     *  2. запуск процесса Profile
     *  3. запуск Saga getProfile c запросом на сервер
     *  4. создаем селектор profileSelectors
     *  5. извлекаем из селектора данные и парсим(подставляем) значения в разметку
     */
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error registration process', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* registrationProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(registrationProcessAction.registration, registrationProcess),
  ]);
}
