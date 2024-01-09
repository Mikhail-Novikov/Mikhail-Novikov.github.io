import { Dispatch } from 'react';

export enum Themes {
  dark = 'dark',
  light = 'light',
}

export type ThemeContext = {
  setThemeState: Dispatch<React.SetStateAction<Themes>>;
  themesName: string;
};
