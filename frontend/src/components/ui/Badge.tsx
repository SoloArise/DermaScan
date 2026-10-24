import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'teal' | 'navy' | 'gray' | 'warning' | 'error' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'gray',
  children,
  ...props
}) => {
  const variants = {
    teal: 'bg-primary-light text-primary border-teal-200',
    navy: 'bg-slate-100 text-navy border-slate-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
