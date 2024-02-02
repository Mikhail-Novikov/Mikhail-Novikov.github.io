import React, { useEffect } from 'react';

import { Layout } from '@layouts/index';
import { useProfileProcessActions } from '@src/processes/profile';

import { Profile } from '@common/components/form/profile';
import { TFormValues } from '@common/components/form/profile/types';

import { selectors as selecorsProfile } from '@features/profile/selectors';

/**
 * Страница авторизации и смены данных пользователя
 * @returns - Компонент
 */
export const UserProfilePage = (): React.ReactElement => {
  const { profile, profileAuth } = useProfileProcessActions();

  const { email, signUpDate, isSuccess } = selecorsProfile.useProfileSelector();

  useEffect(() => {
    if (!email) {
      profile();
    }
  }, [email]);

  const submitForm = (
    values: Pick<TFormValues, 'password' | 'newPassword'>,
  ) => {
    /** запустить процесс смены пароля */
    profileAuth(values);
    // eslint-disable-next-line no-console
    console.log('values form profile', values);
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-16">Профиль</h1>
      <div className="width-75">
        <Profile
          submitOnSuccess={submitForm}
          signUpDate={signUpDate}
          email={email}
          isSuccess={isSuccess}
        />
      </div>
    </Layout>
  );
};
