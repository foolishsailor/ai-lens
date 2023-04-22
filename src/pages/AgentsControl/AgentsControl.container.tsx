import { useEffect, useCallback } from 'react';
import socket from '../../services/socket';

import { Message } from '../../types/message';
import AgentsControl from './AgentsControl';

import { useDispatch } from 'react-redux';

import { addMessages, setActiveAgents } from '../../store/applicationSlice';

const AgentsControlContainer = () => {
  const dispatch = useDispatch();

  const handleNewMessage = useCallback(
    (message: Message) => {
      dispatch(addMessages(message));
      message.activeAgents && dispatch(setActiveAgents(message.activeAgents));
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
