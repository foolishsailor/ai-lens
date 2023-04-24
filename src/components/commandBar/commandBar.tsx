// ButtonBar.tsx
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  SwapVert as SwapVertIcon
} from '@mui/icons-material';
import SyncIcon from '@mui/icons-material/Sync';
import IndicatorLight from '../indicatorLight';
import { RootState } from '@/store';
import { useSelector, shallowEqual } from 'react-redux';
import { useSocket } from '@/services/socket/socket';

type LayoutChangeMenu = 'none' | 'show-connections' | 'fill-space';

const ButtonBar: React.FC = () => {
  const socket = useSocket();
  const { isConnected } = useSelector(
    (state: RootState) => ({
      isConnected: state.application.isConnected
    }),
    shallowEqual
  );

  const [isSyncing, setIsSyncing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [layoutChange, setLayoutChange] = useState<LayoutChangeMenu>('none');

  const handleSync = () => {
    if (socket) {
      if (!isConnected) {
        setIsSyncing(true);
        socket.connect();
      }
    }
  };
  const handleClickPlayStop = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLayoutChangeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLayoutChangeMenuClose = (option: LayoutChangeMenu) => {
    setLayoutChange(option);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isConnected) {
      setIsSyncing(false);
    }
  }, [isConnected]);

  const CommandBarSections = styled(Box)`
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
            {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
          </Button>
          <Button
            size="small"
            variant="contained"
            aria-controls="layout-change-menu"
            aria-haspopup="true"
            onClick={handleLayoutChangeClick}
            sx={{ mr: 1 }}
          >
            <SwapVertIcon />
          </Button>
          <Menu
            id="layout-change-menu"
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
        </CommandBarSections>
        <CommandBarSections sx={{ flex: 1 }}></CommandBarSections>
        <CommandBarSections sx={{ justifySelf: 'flex-end' }}>
          Token Count
        </CommandBarSections>
      </Toolbar>
    </AppBar>
  );
};

export default ButtonBar;
