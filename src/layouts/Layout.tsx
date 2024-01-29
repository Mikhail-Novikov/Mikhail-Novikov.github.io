import { useContextReducer } from '@context/ContextReducer';
import { ContextTheme } from '@context/ContextTheme';
import React from 'react';
import './layout.css';
import { createPortal } from 'react-dom';

import { Header, Modal } from '@common/components';
import { useAuthorization } from '@common/hooks';

interface LayoutProps {
  /** Контент */
  children: React.ReactElement | React.ReactFragment;
}

export enum Themes {
  dark = 'dark',
  light = 'light',
}

/**
 * Компонент Layout
 */
export const Layout = ({ children }: LayoutProps): React.ReactElement => {
  const [themesName, setThemeState] = React.useState<Themes>();
  const { state, dispatch } = useContextReducer();
  const { isAuthorization } = useAuthorization();

  // const { submitForm } = useFormikContext();

  // const submitModal = () => {
  //   submitForm();
  // };

  const closeModal = () => {
    dispatch({
      type: 'closeModalAddOpertation',
      payload: <></>,
      titleModal: '',
    });
  };

  return (
    <ContextTheme.Provider value={{ setThemeState, themesName }}>
      <Header isAuthorization={isAuthorization} />
      <main className="container mb-32">
        {children}

        {createPortal(
          <Modal
            content={state.form}
            titleModal={state.titleModal}
            isOpenModal={state.isOpen}
            handleClickCancel={closeModal}
          />,
          document.body,
        )}
      </main>
    </ContextTheme.Provider>
  );
};
