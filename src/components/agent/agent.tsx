import { Typography, Grid, useTheme } from '@mui/material';
import CommsIndicator from '@/components/commsIndicator';

import { memo, useEffect, useRef, useState } from 'react';

import 'react-resizable/css/styles.css';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addUpdateAgents } from '@/store/applicationSlice';

import { RootState } from '@/store';

import { generateRandomColor } from '@/utils/draw';
import MessageList from '@/components/lists/messageList';
import DragAndResizeContainer from '@/components/containers/DragAndResizeContainer';
import { Point, Size } from '@/types/draw';
import {
  AgentCard,
  AgentCardContent,
  AgentCardHeader,
  AgentCardHeaderLeft,
  AgentCardHeaderTitle
} from '@/components/cards/agentCard';

interface AgentProps {
  agentId: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
}

const Agent = ({ agentId, initialPosition, initialSize }: AgentProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { messages } = useSelector(
    (state: RootState) => ({
      messages: state.application.messages
    }),
    shallowEqual
  );

  const [commsLineColor] = useState(generateRandomColor());
  const filteredMessages = messages.filter((message) =>
    message.targetAgentIds.includes(agentId)
  );

  useEffect(() => {
    dispatch(
      addUpdateAgents([
        {
          id: agentId,
          position: initialPosition,
          size: initialSize,
          commsLineColor
        }
      ])
    );
  }, []);

  const dragHandler = (position: Point) => {
    dispatch(
      addUpdateAgents([
        {
          id: agentId,
          position
        }
      ])
    );
  };

  const resizeHandler = (size: Size) => {
    dispatch(
      addUpdateAgents([
        {
          id: agentId,
          size
        }
      ])
    );
  };

  return (
    <DragAndResizeContainer
      initialPosition={initialPosition}
      initialSize={initialSize}
      dragHandler={dragHandler}
      resizeHandler={resizeHandler}
    >
      <AgentCard>
        <AgentCardHeader>
          <AgentCardHeaderLeft>
            <CommsIndicator message={filteredMessages[0]} />
          </AgentCardHeaderLeft>
          <AgentCardHeaderTitle>
            <Typography
              variant="overline"
              display="block"
              sx={{
                flex: 1,
                m: 0,
                p: 0,
                cursor: 'move'
              }}
            >
              {agentId === '0' ? 'Control' : `Agent ${agentId}`}
            </Typography>
          </AgentCardHeaderTitle>
        </AgentCardHeader>

        <AgentCardContent>
          <MessageList messages={filteredMessages} />
        </AgentCardContent>
      </AgentCard>
    </DragAndResizeContainer>
  );
};

export default memo(
  Agent,
  (prevProps, nextProps) =>
    prevProps.agentId === nextProps.agentId &&
    prevProps.initialPosition.x === nextProps.initialPosition.x &&
    prevProps.initialPosition.y === nextProps.initialPosition.y &&
    prevProps.initialSize.width === nextProps.initialSize.width &&
    prevProps.initialSize.height === nextProps.initialSize.height
);
