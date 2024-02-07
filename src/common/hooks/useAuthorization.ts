// eslint-disable-next-line import/no-cycle
import { selectors as selectorsRegistration } from '@features/registration';

/**
 * Проверка авторизации
 * @returns - признак авторизации
 */
export const useAuthorization = (): boolean => {
  const { isAuthorization } = selectorsRegistration.useRegistrationSelector();

  return isAuthorization;
};
