import { Message } from '../../types/message';
import { Agent } from '../../types/agent';

export interface ApplicationState {
  activeAgents: string[];
  messages: Message[];
  agents: Agent[];
}

export const initialState: ApplicationState = {
  activeAgents: [],
  messages: [],
  agents: []
};
