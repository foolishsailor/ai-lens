// ButtonBar.tsx
import React, { memo, useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Grid,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon
} from '@mui/icons-material';
import SyncIcon from '@mui/icons-material/Sync';
import IndicatorLight from '../indicatorLight';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '@/services/socket/socket';
import {
  useCommandActions,
  CommandActionsEnum
} from '@/services/socket/useCommandActions';
import { changeAgentsLayout } from '@/store/applicationSlice';

type LayoutChangeMenu = 'none' | 'show-connections' | 'fill-space';

const CommandBar: React.FC = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { executeCommand } = useCommandActions();

  const isConnected = useSelector(
    (state: RootState) => state.application.isConnected
  );
  const isRunning = useSelector(
    (state: RootState) => state.application.isRunning
  );

  console.log('isRunning', isRunning);
  const [isSyncing, setIsSyncing] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSync = () => {
    if (socket) {
      if (!isConnected) {
        setIsSyncing(true);
        socket.connect();
      }
    }
  };

  const handleClickPlayStop = async () => {
    try {
      const response = await executeCommand(
        isRunning ? CommandActionsEnum.Stop : CommandActionsEnum.Start
      );
      console.log('Agent added:', response);
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  const handleLayoutChangeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLayoutChangeMenuClose = (option: LayoutChangeMenu) => {
    switch (option) {
      case 'show-connections':
        dispatch(changeAgentsLayout({ gap: 100, padding: 40 }));
        break;
      case 'fill-space':
        dispatch(changeAgentsLayout({ gap: 0, padding: 0 }));
        break;
      default:
        dispatch(changeAgentsLayout({ gap: 0, padding: 0 }));
    }

    setAnchorEl(null);
  };

  useEffect(() => {
    if (isConnected) {
      setIsSyncing(false);
    }
  }, [isConnected]);

  const CommandBarSections = styled(Grid)`
    display: flex;
    align-items: center;
  `;

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          minHeight: 'auto',
          borderTop: (theme) => `2px solid ${theme.palette.grey[800]}`,
          p: 1,
          '& > :not(:last-child)': {
            marginRight: '1rem',
            borderRight: (theme) => `1px solid ${theme.palette.grey[800]}`,
            paddingRight: '1rem'
          }
        }}
      >
        <CommandBarSections>
          <Tooltip title="Socket Connection Status">
            <IndicatorLight
              isError={!isConnected}
              colorFlash={true}
              size={20}
            ></IndicatorLight>
          </Tooltip>
        </CommandBarSections>
        <CommandBarSections>
          <Button
            disabled={isConnected}
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSync}
            sx={{
              mr: 1,
              '& svg': {
                animation: isSyncing ? 'spin 1s linear infinite' : 'none'
              },
              '@keyframes spin': {
                from: {
                  transform: 'rotate(0deg)'
                },
                to: {
                  transform: 'rotate(360deg)'
                }
              }
            }}
          >
            <SyncIcon />
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickPlayStop}
            sx={{ mr: 1 }}
          >
            {isRunning ? <StopIcon /> : <PlayArrowIcon />}
          </Button>
        </CommandBarSections>
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            id="layout-change-button"
            size="small"
            aria-controls="layout-change-menu"
            aria-haspopup="true"
            onClick={handleLayoutChangeClick}
            sx={{ mr: 1 }}
          >
            Layout
          </Button>
          <Menu
            id="layout-change-menu"
            aria-labelledby="layout-change-button"
            color="primary"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleLayoutChangeMenuClose('none')}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            PaperProps={{
              sx: {
                maxHeight: 'auto'
              }
            }}
          >
            <MenuItem
              onClick={() => handleLayoutChangeMenuClose('show-connections')}
            >
              Show Connections
            </MenuItem>
            <MenuItem onClick={() => handleLayoutChangeMenuClose('fill-space')}>
              Fill Space
            </MenuItem>
          </Menu>
        </Grid>
        <CommandBarSections sx={{ flex: 1 }}></CommandBarSections>
        <CommandBarSections sx={{ justifySelf: 'flex-end' }}>
          Token Count
        </CommandBarSections>
      </Toolbar>
    </AppBar>
  );
};

export default memo(CommandBar);
