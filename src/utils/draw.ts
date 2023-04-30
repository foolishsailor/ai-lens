import { AgentInterface } from '../types/agent';

export const generateRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
};

export const getCenterPointOfAgent = (agent: AgentInterface) => {
  if (agent.position && agent.size) {
    const centerX = agent.position.x + agent.size.width / 2;
    const centerY = agent.position.y + agent.size.height / 2;

    return { x: centerX, y: centerY };
  }

  return null;
};
