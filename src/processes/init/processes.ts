import { push } from 'connected-react-router';
import { createHashHistory } from 'history';
import { SagaIterator } from 'redux-saga';
import { put, all, takeEvery, call, SagaReturnType } from 'redux-saga/effects';

import { config } from '@common/config';

import { actions as initActions } from '@features/init-app';
import { actions as registrationActions } from '@features/registration';
import { sagas as sagasToken } from '@features/token';

import { actions as initProcessActions } from './actions';

export const history = createHashHistory();
/**
 * Процесс инициализации приложения
 * @returns {void}
 */
export function* initProcess(): SagaIterator {
  try {
    /* процесс для инициализации  */
    /**
     * АВТОМАТИЧЕСКИЙ ЗАПУСК ПРОВЕРКИ ТОКЕН ЗНАЧЕНИЯ для получения isAuth = true
     *  --- при запуске приложения нужна проверка на наличие токена в localstorage
     *  1. создать saga getTokenValueFromStorage - будет читать токен из хранилища
     *  2. запуск saga getTokenValueFromStorage
     *  3. создать условие
     *  4. localstorage.get('token-app') -> проверить пуст или нет
     *  5. создать селектор или вернуть из саги значение сравнения true/false
     *  6. если не пуст -> диспатчим isAuth = true ( yield put(registrationActions.registration()) )
     *  7. и переходи на страницу Main (последующий запуск процесса operations load)
     * ----
     *  8. если пустое значение -> переходим на страницу авторизации


     * /* РУЧНОЙ ЗАПУСК для получения isAuth = true ПРИ ОТСТУТСВИИ ТОКЕН ЗНАЧЕНИЯ В БРАУЗЕРЕ */
    /**
     *  9. заполняем форму авторизации и нажимаем submit
     *  10. запуск action процесса регистрации
     *  11. заполненые данные отправка на сервер чтоб получить token
     *  12. try -> в ответе полуаем объект с token
     *  13. парсим из него token и сораняем в стейт reducer setState - yield put(registrationActions.setState(token))
     *  14. извлекаем селектором token значение из стейта reducer token
     *  15. записываем в localStorage.get('token-app', token)
     *  16. запускаем процесс registration
     */

    /* запуск приложения */
    yield put(initActions.switchIsInitApp());

    /* читаем токен из хранилища браузера */
    const tokenApp: SagaReturnType<typeof sagasToken.getTokenValueFromStorage> =
      yield call(sagasToken.getTokenValueFromStorage);

    /* Примитивная проверка токена */
    if (tokenApp.length > 25) {
      yield put(registrationActions.registrationSuccess());
      yield put(push(config.routes.budgetList.url));
    } else {
      // eslint-disable-next-line no-console
      console.log('token empty, переход на авторизацию');
      yield put(push(config.routes.authorization.url));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error worker init app', error);
  }
}

/**
 * Вотчер процесса инициализации приложения
 * @returns {void}
 */
export function* initProcessWatcher(): SagaIterator {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]); // eslint-disable-next-line no-console
}
