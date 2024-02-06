import cn from 'clsx';
import React, { FC, HTMLAttributes } from 'react';
import './button.css';

type TButton = JSX.IntrinsicElements['button']['type'];

type TSize = 'small' | 'medium' | 'large';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  danger?: boolean;
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
  danger,
  size = 'medium',
  label,
  type = 'button',
  isBorder = true,
  ...props
}): React.ReactElement => {
  const mode = (): string => {
    if (primary) {
      return 'button--primary';
    }
    if (danger) {
      return 'button--danger';
    }
    return 'button--secondary';
  };

  const border = isBorder ? '' : 'btn-border-none';

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn('button', `button--${size}`, mode(), border)}
      form="operation"
      {...props}
    >
      {label}
    </button>
  );
};
