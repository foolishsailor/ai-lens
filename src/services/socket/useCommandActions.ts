/*

  USAGE

  import { useExecuteCommand, CommandActions } from './useExecuteCommand';

  function AddAgentForm() {
    const { loading, error, data, executeCommand } = useExecuteCommand();

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

export const useExecuteCommand = <T extends CommandActions>() => {
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
