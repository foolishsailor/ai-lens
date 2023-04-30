import {
  CommandActionToMessage,
  CommandActionsEnum
} from '@/services/socket/useCommandActions';
import { StateActions } from './state';

/**
 * Enum representing the type of a message.
 * @readonly
 * @property {string} State - The message is a state update..
 * @property {string} Command - The message is a command to be executed.
 * @property {string} Message - The message is a regular message to be processes and sent.

 */
export enum MessageType {
  State = 'State',
  Command = 'Command',
  Message = 'Message'
}

/**
 * The type of content for a message after it has been processes
 * Error - the message back from AI is not proceesed into anything
 * Action - the message is a command to be executed
 * Decision - the message is a decision that ahs been reached
 * Response - unprocesses response from AI
 */
export type MessageContentType = 'error' | 'action' | 'decision' | 'response';

/**
 * Who the message is from
 * Agent - the message has been processed from one agetn to be sent to another or group
 * System - the message is a general message such as an error message to be sent to an agent or gorup of agents
 * Control - the message is from the user intervening in the system
 */
export type MessageSource = 'agent' | 'system' | 'control';

export interface StateMessage<T> {
  type: MessageType.State;
  content: T;
}

export interface CommandMessage<T> {
  type: MessageType.Command;
  content: T;
}

export interface CommsMessage {
  type: MessageType.Message;
  content: {
    type: MessageContentType;
    sourceType: MessageSource;
    source?: string; // agentId
    destination: string[]; //agentId
    content: string;
  };
}

export type Message =
  | StateMessage<StateActions>
  | CommandMessage<CommandActionToMessage[CommandActionsEnum]>
  | CommsMessage;
