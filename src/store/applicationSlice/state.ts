import { Message } from '../../types/message';
import { AgentInterface } from '../../types/agent';

export interface AgentsLayout {
  gap: number;
  padding: number;
}
export interface ApplicationState {
  activeAgents: string[];
  messages: Message[];
  agents: AgentInterface[];
  isConnected: boolean;
  isRunning: boolean;
  agentsLayout: AgentsLayout;
}

export const initialState: ApplicationState = {
  activeAgents: [],
  messages: [],
  agents: [],
  isConnected: false,
  isRunning: false,
  agentsLayout: {
    gap: 0,
    padding: 0
  }
};
