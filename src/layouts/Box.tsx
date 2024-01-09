import React from 'react';
import './layout.css';

interface LayoutBoxProps {
  /** Контент */
  children: string | React.ReactElement;
}

/**
 * Компонент LayoutBox с рамкой и отступами
 */
export const Box = ({ children }: LayoutBoxProps): React.ReactElement => (
  <div className="box">{children}</div>
);
