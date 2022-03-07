import React from 'react';

interface FullViewportProps {
  children: React.ReactNode | React.ReactNode[];
}

export function FullViewport({ children }: FullViewportProps): JSX.Element {
  return <div className="w-screen h-screen">{children}</div>;
}
