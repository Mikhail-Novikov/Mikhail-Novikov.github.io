import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

/**
 * Хук для использования экшенов в компонентах
 *
 * @param {object} actions - список экшенов
 *
 * @returns {object} - привязанные экшены
 */
export const useActions = <T extends ActionCreatorsMapObject>(
  actions: T,
): T => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch],
  );
};
