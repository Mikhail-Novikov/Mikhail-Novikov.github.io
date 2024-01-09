import cn from 'clsx';
import './header.css';
import React, { useContext } from 'react';

import { ContextTheme } from '@src/context';

import { LanguageButton } from '@common/features/language-switch-button/LanguageButton';

import { AccountBtn } from '../../features/control/account-btn';
import { ThemeSwitcher } from '../../features/switcher';
import { Logo } from '../logo';
import { Menu } from '../menu';

interface HeaderProps {
  /** Режим авторизации */
  isAuthorized?: boolean;
}

/**
 * Компонент Header
 */
export const Header = ({ isAuthorized }: HeaderProps): React.ReactElement => {
  const { themesName } = useContext(ContextTheme);

  return (
    <header className={cn('header header-pos-fixed', themesName)}>
      <Logo />

      <Menu />

      <div className="flex-row align-items-center margin-left-auto margin-right-16">
        <div className="margin-right-24">
          <LanguageButton />
        </div>

        <ThemeSwitcher />
      </div>

      <AccountBtn isAuthorized={isAuthorized} />
    </header>
  );
};
