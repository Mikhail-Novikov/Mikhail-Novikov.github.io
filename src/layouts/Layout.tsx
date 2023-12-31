import { useContextReducer } from '@context/ContextReducer';
import { ContextTheme } from '@context/ContextTheme';
import React from 'react';
import './layout.css';
import { createPortal } from 'react-dom';

import { Header, Modal } from '@common/components';

interface LayoutProps {
  /** Контент */
  children: React.ReactElement | React.ReactFragment;
  /** Режим авторизации */
  isAuthorized?: boolean;
}

export enum Themes {
  dark = 'dark',
  light = 'light',
}

/**
 * Компонент Layout
 */
export const Layout = ({
  children,
  isAuthorized,
}: LayoutProps): React.ReactElement => {
  const [themesName, setThemeState] = React.useState<Themes>();
  const { state, dispatch } = useContextReducer();

  const closeModal = () => {
    dispatch({
      type: 'closeModalAddOpertation',
      payload: <></>,
      titleModal: '',
    });
  };

  return (
    <ContextTheme.Provider value={{ setThemeState, themesName }}>
      <Header isAuthorized={isAuthorized} />
      <main className="container">
        {children}

        {createPortal(
          <Modal
            content={state.form}
            titleModal={state.titleModal}
            isOpenModal={state.isOpen}
            handleClickButton={closeModal}
          />,
          document.body,
        )}
      </main>
    </ContextTheme.Provider>
  );
};
