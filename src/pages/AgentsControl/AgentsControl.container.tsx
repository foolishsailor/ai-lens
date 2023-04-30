import { useEffect, useCallback } from 'react';
import { useSocket } from '@/services/socket/socket';

import { Message } from '@/types/message';
import AgentsControl from './AgentsControl';

import { useDispatch } from 'react-redux';

import { addMessages, setActiveAgents } from '@/store/applicationSlice';

const AgentsControlContainer = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const handleNewMessage = useCallback(
    (message: Message) => {
      console.log('messages', message);
      // dispatch(addMessages(message));
      // message.activeAgents && dispatch(setActiveAgents(message.activeAgents));
    },
    [dispatch]
  );

  useEffect(() => {
    if (socket.connected) {
      socket.on('message', handleNewMessage);
    } else {
      socket.connect();
      socket.on('message', handleNewMessage);
    }
  }, [handleNewMessage]);

  return <AgentsControl />;
};

export default AgentsControlContainer;
