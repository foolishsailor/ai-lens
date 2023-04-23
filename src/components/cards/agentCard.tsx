import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

export const AgentCard = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[800]
}));

export const AgentCardHeader = styled(Grid)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '2rem',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[700],
  padding: theme.spacing(0, 1)
}));

export const AgentCardHeaderTitle = styled(Grid)`
  flex: 1;
`;
export const AgentCardHeaderRight = styled(Grid)``;
export const AgentCardHeaderLeft = styled(Grid)``;

export const AgentCardContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  flex: 1,

  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[800]
}));
