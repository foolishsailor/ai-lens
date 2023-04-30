import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import {
  setIsConnected,
  setIsRunning,
  updateState
} from '@/store/applicationSlice';
import { Message, MessageType } from '@/types/message';

interface SocketContextProps {
  socket: Socket;
}

const SocketContext = createContext<SocketContextProps>({ socket: io() });

interface Props {
  url?: string;
  children: React.ReactNode;
}

const SocketProvider = ({ children, url = 'http://localhost:4331' }: Props) => {
  const dispatch = useDispatch();

  const socket = io(url, {
    transports: ['websocket']
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');
      dispatch(setIsConnected(true));
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
      dispatch(setIsConnected(false));
      dispatch(setIsRunning(false));
    });

    socket.on('message', (message: Message) => {
      console.log('socket container messages', message);

      if (
        message.type === MessageType.State &&
        message.content.action === 'set' &&
        message.content.properties
      ) {
        dispatch(updateState(message.content.properties));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};
