import { ReactNode } from 'react';
import { Grid, useTheme } from '@mui/material';

export interface ButtonBarContainerProps {
  children: ReactNode;
}

export const ButtonBarContainer = ({ children }: ButtonBarContainerProps) => {
  const theme = useTheme();
  return (
    <Grid container item sx={{ alignSelf: 'flex-end' }}>
      {children}
    </Grid>
  );
};
