import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  icon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = 'info',
  title,
  children,
  icon = true,
  ...props
}) => {
  const styles = {
    info: {
      container: 'bg-teal-50/70 border-teal-200 text-teal-900',
      icon: <Info className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />,
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-900',
      icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />,
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />,
    },
  };

  const current = styles[variant];

  return (
    <div
      role="alert"
      className={cn(
        'rounded-xl border p-4 flex gap-3 text-sm leading-relaxed',
        current.container,
        className
      )}
      {...props}
    >
      {icon && current.icon}
      <div className="flex-1">
        {title && <h5 className="font-semibold mb-1 text-inherit">{title}</h5>}
        <div className="text-inherit opacity-95">{children}</div>
      </div>
    </div>
  );
};
