import React from 'react';

import './logo.css';
import pathImage from './logo.svg';

/**
 * Компонент Logo
 */
export const Logo = (): React.ReactElement => (
  <a href="#" className="logo not-event">
    <img className="logo-img" src={pathImage} alt="Учёт расходов" />
  </a>
);
