import { Message } from '../../types/message';
import { capitalizeFirstLetter } from '../strings';

export const createTitle = (message: Message) => {
  const source =
    message.source.type === 'agent' && message.source.id === '0'
      ? 'Control'
      : `${capitalizeFirstLetter(message.source.type)} ${
          message.source.id || ''
        }`;

  return `${source} >>> ${message.targetAgentIds
    .map((id: string) => (id === '0' ? 'Control' : `Agent ${id}`))
    .join(', ')}`;
};
