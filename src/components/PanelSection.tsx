import React from 'react';

interface PanelSectionProps {
  header: string;
  children?: React.ReactNode | React.ReactNode[];
}

export function PanelSection({
  header,
  children,
}: PanelSectionProps): JSX.Element {
  return (
    <div className="w-full">
      <h3 className="border-b border-gray-300 px-2 py-2 font-bold">{header}</h3>
      <div className="px-2 py-2">{children}</div>
    </div>
  );
}
