/*
  USAGE EXAMPLE
  
  function MyComponent() {
    const { loading, error, data, executeStateAction } = useExecuteStateAction();

    function handleGetClick() {
      const action = { action: 'get', store: 'application', properties: ['name'] };
      executeStateAction(action);
    }

    function handleSetClick() {
      const action = { action: 'set', store: 'application', properties: { name: 'New Name' } };
      executeStateAction(action);
    }

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <div>
        <button onClick={handleGetClick}>Get State</button>
        <button onClick={handleSetClick}>Set State</button>
        {data && <p>{JSON.stringify(data)}</p>}
      </div>
    );
  }

*/

import { useState } from 'react';
import socket from './socket';

export type Stores = 'application' | 'agents';

export interface StateGetAction {
  action: 'get';
  store: Stores;
  properties?: string[];
}

export interface StateSetAction {
  action: 'set';
  store: Stores;
  properties: Record<string, unknown>;
}

export type StateActions = StateGetAction | StateSetAction;

export type StateGetMessage = {
  properties?: string[];
  result: Record<string, unknown>;
};

export type StateSetMessage = {
  result: Record<string, unknown>;
};

export type StateActionToMessage = {
  [K in StateActions['action']]: {
    content: StateActions extends { action: K }
      ? K extends 'get'
        ? StateGetMessage
        : StateSetMessage
      : never;
  };
};

export const useExecuteStateAction = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  function executeStateAction<T extends StateActions>(action: T) {
    setLoading(true);
    setError(null);
    setData(null);

    if (!socket.connected) {
      socket.connect();
    }

    const messageWithType = { action };

    socket.emit('message', { type: 'State', content: messageWithType });

    socket.on('message', ({ type, content }) => {
      if (type === 'State' && content.action === action.action) {
        setLoading(false);

        const result = (content as StateActionToMessage[T['action']]['content'])
          .result;

        setData(result);
      }
    });

    socket.on('error', (err) => {
      setLoading(false);
      setError(err.message);
    });
  }

  return { loading, error, data, executeStateAction };
};
