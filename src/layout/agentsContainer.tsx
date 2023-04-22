import { ReactNode, useRef } from 'react';
import { useTheme } from '@mui/material';

export interface AgentsContainerProps {
  children?: ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
}

export const AgentsContainer = ({ children, ref }: AgentsContainerProps) => {
  const theme = useTheme();
  return (
    <div
      ref={ref}
      style={{
        flex: 4,
        padding: 8,

        position: 'relative',
        overflow: 'auto'
      }}
    >
      {children}
    </div>
  );
};
