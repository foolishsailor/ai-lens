import { RootState } from '@/store';
import { AgentInterface } from '@/types/agent';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Agent from './agent';

type Props = {
  agents: AgentInterface[];
  parentSize: { width: number; height: number };
};

type AgentState = {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

const AgentsPlacement = ({ agents, parentSize }: Props) => {
  const agentsLayout = useSelector(
    (state: RootState) => state.application.agentsLayout
  );

  const [newAgentsState, setNewAgentsState] = useState<AgentState[]>([]);

  useEffect(() => {
    const numItems = agents.length;
    const ratio = parentSize.height / parentSize.width;
    const numCols = Math.ceil(Math.sqrt(numItems / ratio));
    const numRows = Math.ceil(numItems / numCols);
    const divWidth =
      (parentSize.width -
        agentsLayout.gap * (numCols - 1) -
        agentsLayout.padding * 2) /
      numCols;
    const divHeight =
      (parentSize.height -
        agentsLayout.gap * (numRows - 1) -
        agentsLayout.padding * 2) /
      numRows;

    const newAgentsState: AgentState[] = agents.map((agent, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      const initialPosition = {
        y: row * (divHeight + agentsLayout.gap) + agentsLayout.padding,
        x: col * (divWidth + agentsLayout.gap) + agentsLayout.padding
      };

      const size = { width: divWidth, height: divHeight };

      return { id: agent.id, position: initialPosition, size };
    });

    setNewAgentsState(newAgentsState);
  }, [agents, parentSize, agentsLayout]);

  const ComponentElements = newAgentsState.map((agent) => {
    return (
      <Agent
        key={agent.id}
        agentId={agent.id}
        initialSize={agent.size}
        initialPosition={agent.position}
      />
    );
  });

  return <>{ComponentElements}</>;
};

export default AgentsPlacement;
