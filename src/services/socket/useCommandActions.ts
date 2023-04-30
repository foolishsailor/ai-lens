/*

  USAGE

  import { useCommandActions, CommandActions } from './useExecuteCommand';

  function AddAgentForm() {
    const { loading, error, data, executeCommand } = useCommandActions();

    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await executeCommand(CommandActions.AddAgent, { name, type });
        console.log('Agent added:', response);
      } catch (error) {
        console.error('Error adding agent:', error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <label>
          Type:
          <input type="text" value={type} onChange={event => setType(event.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding agent...' : 'Add agent'}
        </button>
        {error && <div>Error: {error.message}</div>}
        {data && <div>Agent added: {data.name} ({data.type})</div>}
      </form>
    );
  }
*/

import { useState } from 'react';
import { useSocket } from '@/services/socket/socket';

export enum CommandActionsEnum {
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
  [CommandActionsEnum.Start]: {
    action: CommandActionsEnum.Start;
    content: null;
  };
  [CommandActionsEnum.Stop]: { action: CommandActionsEnum.Stop; content: null };
  [CommandActionsEnum.AddAgent]: {
    action: CommandActionsEnum.AddAgent;
    content: { id: string; name?: string; type?: string };
  };
  [CommandActionsEnum.RemoveAgent]: {
    action: CommandActionsEnum.RemoveAgent;
    content: { id: string };
  };
  [CommandActionsEnum.StopAgent]: {
    action: CommandActionsEnum.StopAgent;
    content: { id: string };
  };
  [CommandActionsEnum.StartAgent]: {
    action: CommandActionsEnum.StartAgent;
    content: { id: string };
  };
  [CommandActionsEnum.ChangeAgentType]: {
    action: CommandActionsEnum.ChangeAgentType;
    content: { id: string; type: string };
  };
  [CommandActionsEnum.ChangeAgentName]: {
    action: CommandActionsEnum.ChangeAgentName;
    content: { id: string; name: string };
  };
};

function isValidCommandAction(action: string): action is CommandActionsEnum {
  return Object.values(CommandActionsEnum).includes(
    action as CommandActionsEnum
  );
}

export const useCommandActions = <T extends CommandActionsEnum>() => {
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);

  const executeCommand = (
    action: T,
    message?: CommandActionToMessage[T]['content']
  ) => {
    setLoading(true);
    setError(null);
    setData(null);

    return new Promise((resolve, reject) => {
      if (!isValidCommandAction(action)) {
        reject(new Error(`Unsupported command action: ${action}`));
      }

      if (!socket.connected) {
        socket.connect();
      }

      const messageWithType = message
        ? { action, content: message }
        : { action };

      socket.emit(
        'message',
        { type: 'Command', content: messageWithType },
        (response: any) => {
          setLoading(false);

          if (response.error) {
            setError(response.error);
            reject(response.error);
          } else {
            setData(response.data);
            resolve(response.data);
          }
        }
      );
    });
  };

  return { loading, error, data, executeCommand };
};
