import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 border border-dashed border-med-border rounded-card bg-white/60',
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-content-main mb-1.5">{title}</h3>
      <p className="text-sm text-content-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};
