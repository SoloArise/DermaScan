import React from 'react';
import { cn } from '../../lib/utils';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  className,
  size = 'default',
  children,
  ...props
}) => {
  const sizeMap = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };

  return (
    <main
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};
