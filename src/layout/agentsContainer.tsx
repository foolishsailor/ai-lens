import { ReactNode } from 'react';
import { useTheme } from '@mui/material';

export interface AgentsContainerProps {
  children?: ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
}

export const AgentsContainer = ({
  children,
  parentRef
}: AgentsContainerProps) => {
  const theme = useTheme();
  return (
    <div
      ref={parentRef}
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
