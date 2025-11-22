import React from 'react';
import { ButtonProps } from '@/interfaces';

function Button({
    children,
    className,
    type='button',
    size = 'md',
    onClick,
    disabled = false,
}: ButtonProps) {

    const sizeMap = {
    sm: 'px-4 py-2 ',
    md: 'px-6 py-3 ',  
    lg: 'px-8 py-4 ',
    xl: 'px-10 py-6 ',
  }
  return (

        <button type={type}  onClick={onClick} disabled={disabled}  className={`${sizeMap[size]} ${className} bg-gray-900 text-white rounded-lg hover:opacity-90 disabled:opacity-50`}>
            {children}
        </button>
  )
}

export default Button;