import { createAction } from '@reduxjs/toolkit';

import { TFormValues } from '@common/components/form/profile-form/types';
import { useActions } from '@common/hooks';

/** Экшн для запуска процесса просмотра профиля, токен в системе */
const profile = createAction('profile');

/** Экшн для запуска процесса смены пароля */
const profileEdit = createAction<Partial<TFormValues>>('profileEdit');

export const actions = {
  profile,
  profileEdit,
};

export const useProfileProcessActions = (): typeof actions =>
  useActions(actions);
