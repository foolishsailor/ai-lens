import { Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ControlInput from '../../components/forms/textInput';
import { ControlContainer } from '../../layout/controlContainer';
import { PageContainer } from '../../layout/pageContainer';
import AgentsPlacement from '../../components/agent/agentsPlacement';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store';
import CommsLines from '../../components/commsLines';
import MessageList from '../../components/lists/messageList';

const AgentsControl = () => {
  const { agents, activeAgents, messages } = useSelector(
    (state: RootState) => ({
      agents: state.application.agents,
      activeAgents: state.application.activeAgents,
      messages: state.application.messages.slice(-20)
    }),
    shallowEqual
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentSize, setParentSize] = useState<{
    width: number;
    height: number;
  }>();

  const gap = 100;

  const filteredMessages = messages
    .filter((message) => message.targetAgentIds.includes('0'))
    .slice(-20);

  useEffect(() => {
    if (parentRef.current) {
      const height = parentRef.current.offsetHeight;
      const width = parentRef.current.offsetWidth;
      setParentSize({ width, height });
    }
  }, [parentRef]);

  return (
    <PageContainer>
      <ControlContainer>
        <Grid item container sx={{ flex: 8 }}>
          <MessageList
            messages={filteredMessages}
            height={'calc(100vh - 225px)'}
          />
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
      <div
        ref={parentRef}
        style={{
          flex: 4,
          position: 'relative',
          overflow: 'auto'
        }}
      >
        {messages?.length > 0 && (
          <CommsLines message={messages[messages.length - 1]} agents={agents} />
        )}
        {parentSize && (
          <AgentsPlacement
            agents={activeAgents}
            parentSize={parentSize}
            gap={gap}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default AgentsControl;
