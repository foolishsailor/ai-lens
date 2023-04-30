import { Message } from '../../types/message';
import { AgentInterface } from '../../types/agent';

export interface AgentsLayout {
  gap: number;
  padding: number;
}
export interface ApplicationState {
  messages: Message[];
  agents: AgentInterface[];
  isConnected: boolean;
  isRunning: boolean;
  modelType: string;
  openAIKey: string;
  tokensUsed: number;
  agentsLayout: AgentsLayout;
}

export const initialState: ApplicationState = {
  messages: [],
  agents: [],
  isConnected: false,
  isRunning: false,
  modelType: '',
  openAIKey: '',
  tokensUsed: 0,
  agentsLayout: {
    gap: 0,
    padding: 0
  }
};
