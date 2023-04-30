import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import NotConnectedIcon from '@mui/icons-material/LinkOff';
import NoAgentsIcon from '@mui/icons-material/NotInterested';
import { Box } from '@mui/material';
import { RootState } from '@/store';

const ConnectionStatus: React.FC = () => {
  const isConnected = useSelector(
    (state: RootState) => state.application.isConnected
  );
  const agentsLength = useSelector(
    (state: RootState) => state.application.agents.length
  );

  let message: string;
  let icon: JSX.Element | null;

  if (!isConnected) {
    message = 'No connection to Chat Agent Server';
    icon = <NotConnectedIcon sx={{ fontSize: '10em', mb: 2 }} />;
  } else if (agentsLength === 0) {
    message = 'Connected but no agents active';
    icon = <NoAgentsIcon sx={{ fontSize: '10em', mb: 2 }} />;
  } else {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        p: 4
      }}
    >
      {icon}
      <Typography variant="h2">{message}</Typography>
    </Box>
  );
};

export default ConnectionStatus;
