/*

  EXAMPLE USAGE

  const commandMessage: SocketMessage<{ action: CommandActions; content: { name: string; type: string } }> = {
  type: 'Command',
  content: {
    action: CommandActions.AddAgent,
    content: { name: 'Agent 1', type: 'test' }
  }
};

const stateMessage: SocketMessage<string> = {
  type: 'State',
  content: 'state content'
};

const commandMessage: SocketMessage<{
  action: CommandActions;
  content: { name: string; type: string };
}> = {
  type: 'Command',
  content: {
    action: CommandActions.AddAgent,
    content: { name: 'Agent 1', type: 'test' }
  }
};

const messageMessage: SocketMessage<{ from: string; message: string }> = {
  type: 'Message',
  content: { from: 'user', message: 'hello' }
};



  executeCommand(CommandActions.Start); // logs "Starting command with message: {"action":"start"}"
  executeCommand(CommandActions.AddAgent, { name: 'Agent 1', type: 'test' }); // logs "Adding agent with message: {"action":"addAgent","content":{"name":"Agent 1","type":"test"}}"
  executeCommand(CommandActions.StopAgent); // logs "Stopping agent with message: {"action":"stopAgent"}"



*/

import socket from './socket';

export enum CommandActions {
  Start = 'start',
  Stop = 'stop',
  AddAgent = 'addAgent',
  RemoveAgent = 'removeAgent',
  StopAgent = 'stopAgent',
  StartAgent = 'startAgent',
  ChangeAgentType = 'changeAgentType',
  ChangeAgentName = 'changeAgentName'
}

export type CommandActionToMessage = {
  [CommandActions.Start]: { action: CommandActions.Start; content: null };
  [CommandActions.Stop]: { action: CommandActions.Stop; content: null };
  [CommandActions.AddAgent]: {
    action: CommandActions.AddAgent;
    content: { id: string; name?: string; type?: string };
  };
  [CommandActions.RemoveAgent]: {
    action: CommandActions.RemoveAgent;
    content: { id: string };
  };
  [CommandActions.StopAgent]: {
    action: CommandActions.StopAgent;
    content: { id: string };
  };
  [CommandActions.StartAgent]: {
    action: CommandActions.StartAgent;
    content: { id: string };
  };
  [CommandActions.ChangeAgentType]: {
    action: CommandActions.ChangeAgentType;
    content: { id: string; type: string };
  };
  [CommandActions.ChangeAgentName]: {
    action: CommandActions.ChangeAgentName;
    content: { id: string; name: string };
  };
};

function isValidCommandAction(action: string): action is CommandActions {
  return Object.values(CommandActions).includes(action as CommandActions);
}

export const useExecuteCommand = <T extends CommandActions>(
  action: T,
  message?: CommandActionToMessage[T]['content']
) => {
  if (!isValidCommandAction(action)) {
    throw new Error(`Unsupported command action: ${action}`);
  }

  if (!socket.connected) {
    socket.connect();
  }
  const messageWithType = message ? { action, content: message } : { action };
  socket.emit('message', { type: 'Command', content: messageWithType });
};
