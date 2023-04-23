import Agent from './agent';

type Props = {
  agents: string[];
  parentSize: { width: number; height: number };
  gap: number;
  padding: number;
};

const AgentsPlacement = ({ agents, parentSize, gap, padding }: Props) => {
  const numItems = agents.length;
  const ratio = parentSize.height / parentSize.width;
  const numCols = Math.ceil(Math.sqrt(numItems / ratio));
  const numRows = Math.ceil(numItems / numCols);
  const divWidth =
    (parentSize.width - gap * (numCols - 1) - padding * 2) / numCols;
  const divHeight =
    (parentSize.height - gap * (numRows - 1) - padding * 2) / numRows;

  const newAgentsState = agents.map((agent, index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;
    const initialPosition = {
      y: row * (divHeight + gap) + padding,
      x: col * (divWidth + gap) + padding
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
