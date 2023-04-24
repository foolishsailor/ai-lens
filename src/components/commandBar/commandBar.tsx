// ButtonBar.tsx
import React, { memo, useState } from 'react';
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
import IndicatorLight from '../indicatorLight';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import {
  useCommandActions,
  CommandActions
} from '@/services/socket/useCommandActions';

type LayoutChangeMenu = 'none' | 'show-connections' | 'fill-space';

const CommandBar: React.FC = () => {
  const { executeCommand } = useCommandActions();

  const isConnected = useSelector(
    (state: RootState) => state.application.isConnected
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [layoutChange, setLayoutChange] = useState<LayoutChangeMenu>('none');

  const handleClickPlayStop = async () => {
    try {
      const response = await executeCommand(CommandActions.Stop);
      console.log('Agent added:', response);
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  const handleLayoutChangeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLayoutChangeMenuClose = (option: LayoutChangeMenu) => {
    setLayoutChange(option);
    setAnchorEl(null);
  };

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
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickPlayStop}
            sx={{ mr: 1 }}
          >
            {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
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
