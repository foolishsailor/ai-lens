import { Message } from '../types/message'; // Assuming types are in a separate file
import { AgentContainer } from '../types/agent'; // Assuming types are in a separate file
import { Connection } from '../types/draw';

export const createConnectionList = (
  message: Message,
  agents: AgentContainer[],
  steps: number
): Connection[] => {
  const positionsArray: Connection[] = [];

  if (!message.source.id) return positionsArray;

  const sourceAgent = agents.find((agent) => agent.id === message.source.id);

  if (sourceAgent?.position)
    message.targetAgentIds.forEach((targetAgentId) => {
      const targetAgent = agents.find((agent) => agent.id === targetAgentId);

      if (targetAgent?.position && targetAgent.id !== sourceAgent.id)
        positionsArray.push({
          startAgent: sourceAgent,
          endAgent: targetAgent,
          steps
        });
    });

  return positionsArray;
};
