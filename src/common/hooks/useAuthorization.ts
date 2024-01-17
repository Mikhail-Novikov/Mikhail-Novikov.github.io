// eslint-disable-next-line import/no-cycle
import { selectors } from '@features/registration';

/**
 * Проверка авторизации
 * @returns - признак авторизации
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthorization = () => {
  const { isAuthorization } = selectors.useRegistrationSelector();

  return { isAuthorization };
};
