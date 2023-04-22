import { PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './state';
import { Agent } from '../../types/agent';
import { Message } from '../../types/message';

export const reducers = {
  setActiveAgents(state: ApplicationState, action: PayloadAction<string[]>) {
    state.activeAgents = action.payload;
  },

  addUpdateAgents(
    state: ApplicationState,
    action: PayloadAction<Partial<Agent[]>>
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
    state.messages = [...state.messages, action.payload];
  }

  // addMessages(state: ApplicationState, action: PayloadAction<Message>) {
  //   const messages = [...state.messages, action.payload];
  //   state.messages = messages.slice(-100);
  // }
};