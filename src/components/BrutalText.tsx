import React from 'react';

interface BrutalTextProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  italic?: boolean;
}

export const BrutalText: React.FC<BrutalTextProps> = ({
  children,
  color = '#1A1A1A',
  size = 80,
  italic = false,
}) => {
  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: size,
        color,
        fontStyle: italic ? 'italic' : 'normal',
        lineHeight: 1.1,
        textAlign: 'center',
        letterSpacing: '-0.03em',
      }}
    >
      {children}
    </div>
  );
};
