import { Message } from '../../types/message';
import { AgentContainer } from '../../types/agent';

export interface AgentsLayout {
  gap: number;
  padding: number;
}
export interface ApplicationState {
  activeAgents: string[];
  messages: Message[];
  agents: AgentContainer[];
  isConnected: boolean;
  agentsLayout: AgentsLayout;
}

export const initialState: ApplicationState = {
  activeAgents: [],
  messages: [],
  agents: [],
  isConnected: false,
  agentsLayout: {
    gap: 0,
    padding: 0
  }
};
