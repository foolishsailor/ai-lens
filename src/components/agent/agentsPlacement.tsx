import { memo } from 'react';
import Agent from './agent';

type Props = {
  agents: string[];
  parentSize: { width: number; height: number };
  gap: number;
};

const AgentsPlacement = ({ agents, parentSize, gap }: Props) => {
  const numItems = agents.length;
  const ratio = parentSize.width / parentSize.height;
  const numCols = Math.ceil(Math.sqrt(numItems / ratio));
  const numRows = Math.ceil(numItems / numCols);
  const divWidth = (parentSize.width - gap * (numCols + 1)) / numCols;
  const divHeight = (parentSize.height - gap * (numRows + 1)) / numRows;

  const newAgentsState = agents.map((agent, index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;
    const initialPosition = {
      y: row * (divHeight + gap) + gap,
      x: col * (divWidth + gap) + gap
    };

    const size = { width: divWidth, height: divHeight };

    return { id: agent, position: initialPosition, size };
  });

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
