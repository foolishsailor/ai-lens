import { ReactNode, memo } from 'react';
import { Grid } from '@mui/material';

export interface ButtonBarContainerProps {
  children: ReactNode;
}

const ButtonBarContainer = ({ children }: ButtonBarContainerProps) => {
  return (
    <Grid container item sx={{ alignSelf: 'flex-end' }}>
      {children}
    </Grid>
  );
};

export default memo(ButtonBarContainer);
