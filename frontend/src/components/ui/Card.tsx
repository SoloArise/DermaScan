import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-card border border-med-border shadow-subtle p-6 transition-all duration-200',
        hoverEffect && 'hover:shadow-card-hover hover:border-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
