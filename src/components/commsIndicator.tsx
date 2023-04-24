import { useState, useEffect, memo } from 'react';
import { Message } from '../types/message';
import IndicatorLight from './indicatorLight';

interface CircleProps {
  message: Message | null;
  size?: number;
}

const CommsIndicator = ({ message }: CircleProps) => {
  const [colorFlash, setColorFlash] = useState(false);

  useEffect(() => {
    if (message) {
      setColorFlash(true);
      const timeoutId = setTimeout(() => {
        setColorFlash(false);
      }, 400);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <IndicatorLight
      isError={message?.type === 'error' ? true : false}
      colorFlash={colorFlash}
    ></IndicatorLight>
  );
};

export default memo(CommsIndicator);
