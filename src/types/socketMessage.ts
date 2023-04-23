import {
  CommandActionToMessage,
  CommandActions
} from '@/services/socket/useCommandActions';

interface SocketMessageState<T> {
  type: 'State';
  content: T;
}

interface SocketMessageCommand<T> {
  type: 'Command';
  content: T;
}

interface SocketMessageMessage<T> {
  type: 'Message';
  content: T;
}

export type SocketMessage<T> =
  | SocketMessageState<T>
  | SocketMessageCommand<CommandActionToMessage[CommandActions]>
  | SocketMessageMessage<T>;
