import { Message } from '../types/message'; // Assuming types are in a separate file
import { Agent } from '../types/agent'; // Assuming types are in a separate file
import { Connection } from '../types/draw';

export const createConnectionList = (
  message: Message,
  agents: Agent[],
  steps: number
): Connection[] => {
  const positionsArray: Connection[] = [];

  if (!message.source.id) return positionsArray;

  const sourceAgent = agents.find((agent) => agent.id === message.source.id);

  if (sourceAgent?.position)
    message.targetAgentIds.forEach((targetAgentId) => {
      const targetAgent = agents.find((agent) => agent.id === targetAgentId);

      if (targetAgent?.position)
        positionsArray.push({
          startAgent: sourceAgent,
          endAgent: targetAgent,
          steps
        });
    });

  return positionsArray;
};