import React, { useEffect } from 'react';

import { Layout } from '@layouts/index';
import { useProfileProcessActions } from '@src/processes/profile';

import { Profile } from '@common/components/form/profile';
import { TFormValues } from '@common/components/form/profile/types';
import { useAuthorization } from '@common/hooks';

import { selectors as selecorsProfile } from '@features/profile/selectors';

/**
 * Страница авторизации и смены данных пользователя
 * @returns - Компонент
 */
export const UserProfilePage = (): React.ReactElement => {
  const { isAuthorization } = useAuthorization();
  const { profile } = useProfileProcessActions();

  const { email, signUpDate } = selecorsProfile.useProfileSelector();

  useEffect(() => {
    if (!email) {
      profile();
    }
  }, [email]);

  const submitForm = (values: TFormValues) => {
    /** запустить редюсер c параметрами, далее процесс регистрации */
    // getFieldsForm(values);
    // eslint-disable-next-line no-console
    console.log('values form profile', values);
  };

  return (
    <Layout>
      <h1 className="table-title margin-top-8 margin-bottom-16">Профиль</h1>
      <div className="width-75">
        <Profile
          submitOnSuccess={submitForm}
          isAuthorization={isAuthorization}
          signUpDate={signUpDate}
          email={email}
        />
      </div>
    </Layout>
  );
};
