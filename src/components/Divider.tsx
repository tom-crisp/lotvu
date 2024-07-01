import React from 'react';

interface DividerProps {
  color?: string;
  thickness?: string;
  margin?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  color = 'gray-100',
  thickness = '1px',
  margin = 'my-4',
  className = '',
}) => {
  return (
    <hr
      className={`${margin} ${className}`}
      style={{
        borderColor: `var(--${color})`,
        borderWidth: thickness,
      }}
    />
  );
};

export default Divider;
