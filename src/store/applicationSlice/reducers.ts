import { PayloadAction } from '@reduxjs/toolkit';

import { AgentsLayout, ApplicationState } from './state';
import { AgentInterface } from '../../types/agent';
import { Message } from '../../types/message';

export const reducers = {
  setIsConnected(state: ApplicationState, action: PayloadAction<boolean>) {
    state.isConnected = action.payload;
  },
  setActiveAgents(state: ApplicationState, action: PayloadAction<string[]>) {
    state.activeAgents = action.payload;
  },

  addUpdateAgents(
    state: ApplicationState,
    action: PayloadAction<Partial<AgentInterface[]>>
  ) {
    action.payload.forEach((newAgent) => {
      if (!newAgent?.id) return;

      const existingAgentIndex = state.agents.findIndex(
        (agent) => agent.id === newAgent.id
      );
      if (existingAgentIndex !== -1) {
        const existingAgent = state.agents[existingAgentIndex];
        state.agents[existingAgentIndex] = { ...existingAgent, ...newAgent };
      } else {
        state.agents.push(newAgent);
      }
    });
  },

  addMessages(state: ApplicationState, action: PayloadAction<Message>) {
    state.messages = [action.payload, ...state.messages];
  },

  changeAgentsLayout(
    state: ApplicationState,
    action: PayloadAction<AgentsLayout>
  ) {
    state.agentsLayout = action.payload;
  }
};
