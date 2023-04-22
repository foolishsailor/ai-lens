import { List, ListItem, ListItemText, Grid, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { createTitle } from '../../utils/messages/createTitle';
import { Message } from '../../types/message';
import { useRef, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface Props {
  messages: Message[];
}

const MessageList = ({ messages }: Props) => {
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem
        key={index}
        alignItems="flex-start"
        sx={{
          backgroundColor:
            messages[index].type === 'error' ? '#300105' : '#222',
          borderRadius: 1,
          marginBottom: 1,
          p: 1,
          boxShadow: 1
        }}
      >
        <ListItemText
          primary={
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Typography sx={{ flex: 1, fontSize: 14, color: '#fff' }}>
                {createTitle(messages[index])}
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#fff' }}>
                {`Type: ${messages[index].type}`}
              </Typography>
            </Grid>
          }
          secondary={<ReactMarkdown>{messages[index].content}</ReactMarkdown>}
          secondaryTypographyProps={{
            fontSize: 14,
            color: '#ddd'
          }}
        />
      </ListItem>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={typeof height === 'number' ? height : 0}
          width={typeof width === 'number' ? width : 0}
          itemCount={messages.length}
          itemSize={50}
          style={{
            backgroundColor: '#1a1a1a'
          }}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default MessageList;
