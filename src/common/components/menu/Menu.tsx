import cn from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { config } from '@common/config';

interface MenuProps {
  isAuth?: boolean;
}

/**
 * Компонент menu
 */
export const Menu = ({ isAuth = true }: MenuProps): React.ReactElement => {
  const { routes } = config;

  // eslint-disable-next-line id-length
  const { t } = useTranslation();

  return (
    <ul className="header-menu">
      {Object.values(routes).map((item: { url: string; name: string }) => {
        const { url, name } = item;
        const enable = isAuth ? '' : 'not-event';

        if (!name) {
          return null;
        }

        return (
          <li className="header-menu-item" key={name}>
            <NavLink
              className={cn(enable)}
              exact
              activeClassName="header-menu-item-active"
              to={url}
            >
              {t(name)}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
