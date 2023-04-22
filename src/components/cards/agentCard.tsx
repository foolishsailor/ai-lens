import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const AgentCard = styled(Grid)`
  position: relative;
  height: 100%;
`;

export const AgentCardHeader = styled(Grid)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(1)
}));

export const AgentCardHeaderTitle = styled(Grid)`
  flex: 1;
`;
export const AgentCardHeaderRight = styled(Grid)``;
export const AgentCardHeaderLeft = styled(Grid)``;

export const AgentCardContent = styled(Grid)(({ theme }) => ({
  position: 'relative',
  flex: 1,
  height: '100%',
  padding: theme.spacing(1)
}));
