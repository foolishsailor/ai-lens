import { Message } from '../../types/message';
import { AgentContainer } from '../../types/agent';

export interface ApplicationState {
  activeAgents: string[];
  messages: Message[];
  agents: AgentContainer[];
}

export const initialState: ApplicationState = {
  activeAgents: [],
  messages: [],
  agents: []
};
