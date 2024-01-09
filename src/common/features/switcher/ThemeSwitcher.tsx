import './switcher.css';
import { ContextTheme } from '@context/ContextTheme';
import { Themes } from '@context/types';
import React, { useContext, useEffect, useState } from 'react';

/**
 * Компонент Switcher переключения темы приложения
 */
export const ThemeSwitcher = (): React.ReactElement => {
  const { setThemeState, themesName } = useContext(ContextTheme);

  const [isToggleTheme, setToggleTheme] = useState<boolean>(false);

  useEffect(() => {
    if (isToggleTheme) {
      setThemeState(Themes.dark);
    } else {
      setThemeState(Themes.light);
    }
  }, [isToggleTheme, setThemeState]);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="switchCheckLabel"
        checked={isToggleTheme}
        onChange={() => setToggleTheme(!isToggleTheme)}
      />
      <label className="form-check-label" htmlFor="switchCheckLabel">
        <span className="form-check-label-text">{themesName}</span>
      </label>
    </div>
  );
};
