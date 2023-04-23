import { ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

export interface PageContainerProps {
  children?: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <Grid
        container
        columnGap={1}
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap'
        }}
      >
        {children}
      </Grid>
    </Box>
  );
};
