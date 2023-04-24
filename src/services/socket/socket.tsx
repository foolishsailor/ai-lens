import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { setIsConnected } from '@/store/applicationSlice';

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
      dispatch(setIsConnected(true));
    });

    socket.on('disconnect', () => {
      dispatch(setIsConnected(false));
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
