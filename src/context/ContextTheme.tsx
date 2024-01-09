import React from 'react';

import { ThemeContext, Themes } from './types';

export const ContextTheme = React.createContext<ThemeContext>({
  setThemeState: () => Themes,
  themesName: 'light',
});
