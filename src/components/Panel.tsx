import classNames from 'classnames';
import React from 'react';

interface PanelProps {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  side: 'left' | 'right';
}

export function Panel({ className, children, side }: PanelProps): JSX.Element {
  return (
    <div
      className={classNames('w-full border-gray-300', className, {
        'border-r': side === 'left',
        'border-l': side === 'right',
      })}
    >
      {children}
    </div>
  );
}
