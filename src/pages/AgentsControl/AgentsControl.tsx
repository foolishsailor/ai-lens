import { Grid, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ControlInput from '../../components/forms/textInput';
import { ControlContainer } from '../../layout/controlContainer';
import { PageContainer } from '../../layout/pageContainer';
import AgentsPlacement from '../../components/agent/agentsPlacement';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store';
import CommsLines from '../../components/commsLines';
import MessageList from '../../components/lists/messageList';
import { AgentsContainer } from '@/layout/agentsContainer';
import {
  AgentCardHeader,
  AgentCardHeaderLeft,
  AgentCardHeaderTitle
} from '@/components/cards/agentCard';
import CommsIndicator from '@/components/commsIndicator';
import { ButtonBarContainer } from '@/layout/buttonBarContainer';
import CommandBar from '@/components/commandBar';
import ConnectionStatus from '@/components/noConnectionOrAgents';

const AgentsControl = () => {
  const { agents, activeAgents, messages, isConnected } = useSelector(
    (state: RootState) => ({
      agents: state.application.agents,
      activeAgents: state.application.activeAgents,
      messages: state.application.messages,
      isConnected: state.application.isConnected
    }),
    shallowEqual
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentSize, setParentSize] = useState<{
    width: number;
    height: number;
  }>();

  const gap = 100;
  const padding = 40;

  useEffect(() => {
    if (parentRef.current) {
      const height = parentRef.current.offsetHeight;
      const width = parentRef.current.offsetWidth;
      setParentSize({ width, height });
    }
  }, [parentRef]);

  return (
    <PageContainer>
      <Grid item container sx={{ flex: 1 }}>
        <ControlContainer>
          <AgentCardHeader>
            <AgentCardHeaderLeft>
              <CommsIndicator message={messages[0]} />
            </AgentCardHeaderLeft>
            <AgentCardHeaderTitle>
              <Typography
                variant="overline"
                display="block"
                sx={{
                  flex: 1,
                  m: 0,
                  p: 0
                }}
              >
                Message Stream
              </Typography>
            </AgentCardHeaderTitle>
          </AgentCardHeader>
          <Grid item container sx={{ flex: 8 }}>
            <MessageList messages={messages} />
          </Grid>

          <Grid
            item
            container
            sx={{
              flex: 1,
              minHeight: 225
            }}
          >
            <ControlInput />
          </Grid>
        </ControlContainer>
        {!isConnected || activeAgents.length === 0 ? (
          <AgentsContainer parentRef={parentRef}>
            <ConnectionStatus />
          </AgentsContainer>
        ) : (
          <AgentsContainer parentRef={parentRef}>
            {messages?.length > 0 && (
              <CommsLines message={messages[0]} agents={agents} />
            )}
            {parentSize && (
              <AgentsPlacement
                agents={activeAgents}
                parentSize={parentSize}
                gap={gap}
                padding={padding}
              />
            )}
          </AgentsContainer>
        )}
      </Grid>
      <ButtonBarContainer>
        <CommandBar />
      </ButtonBarContainer>
    </PageContainer>
  );
};

export default AgentsControl;
