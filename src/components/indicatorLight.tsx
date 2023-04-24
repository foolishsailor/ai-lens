import { Box } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

interface IndicatorLightProps {
  size?: string;
  isError: boolean;
  colorFlash: boolean;
}

const IndicatorLight = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isError' && prop !== 'colorFlash' && prop !== 'size'
})<IndicatorLightProps>(
  ({
    isError,
    colorFlash,
    size,
    theme
  }: IndicatorLightProps & { theme: Theme }) => ({
    width: size || 10,
    height: size || 10,
    border: '1px solid gray',
    borderRadius: '50%',
    backgroundColor: colorFlash
      ? isError
        ? theme.palette.error.light
        : theme.palette.success.light
      : 'transparent'
  })
);

export default IndicatorLight;
