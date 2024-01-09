import cn from 'clsx';
import React, { FC, HTMLAttributes } from 'react';
import './button.css';

type TButton = JSX.IntrinsicElements['button']['type'];

type TSize = 'small' | 'medium' | 'large';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  backgroundColor?: string | null;
  size?: TSize;
  type: TButton;
  isBorder?: boolean;
  label: string | React.ReactNode;
  onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */

export const Button: FC<ButtonProps> = ({
  primary,
  size = 'medium',
  label,
  type = 'button',
  isBorder = true,
  ...props
}): React.ReactElement => {
  const mode = primary ? 'button--primary' : 'button--secondary';

  const border = isBorder ? '' : 'btn-border-none';

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn('button', `button--${size}`, mode, border)}
      {...props}
    >
      {label}
    </button>
  );
};
