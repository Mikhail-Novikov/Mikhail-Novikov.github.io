import React, { useEffect } from 'react';

import { Layout } from '@layouts/index';
import { useProfileProcessActions } from '@src/processes/profile';

import { Profile } from '@common/components/form/profile-form';
import { TFormValues } from '@common/components/form/profile-form/types';

import { StatusMessageModal } from '@features/modal';
import { selectors as selecorsProfile } from '@features/profile/selectors';

/**
 * Страница авторизации и смены данных пользователя
 * @returns - Компонент
 */
export const UserProfilePage = (): React.ReactElement => {
  const { profile, profileEdit } = useProfileProcessActions();

  const { email, signUpDate, isConfirmEditProfile } =
    selecorsProfile.useProfileSelector();

  useEffect(() => {
    if (!email) {
      profile();
    }
  }, [email]);

  const submitForm = (values: Partial<TFormValues>) => {
    /** запустить процесс смены пароля */
    profileEdit(values);
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-16">Профиль</h1>
      <div className="width-75">
        <Profile
          submitOnSuccess={submitForm}
          signUpDate={signUpDate}
          email={email}
          isConfirmEditProfile={isConfirmEditProfile}
        />
      </div>
      <StatusMessageModal />
    </Layout>
  );
};
