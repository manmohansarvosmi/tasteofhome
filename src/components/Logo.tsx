import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="Taste of Home – Homemade Food"
        className={`${sizeClasses[size]} w-auto max-w-[200px] object-contain`}
        draggable={false}
      />
    </div>
  );
};
