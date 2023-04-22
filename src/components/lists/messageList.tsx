import { List, ListItem, ListItemText, Grid, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { createTitle } from '../../utils/messages/createTitle';
import { Message } from '../../types/message';
import { useRef, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

interface Props {
  messages: Message[];
  height?: string | number;
}

const MessageList = ({ messages, height }: Props) => {
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div style={{ flex: '1 1 auto', height: '100%', backgroundColor: 'green' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            sx={{
              flex: 1,
              overflowX: 'auto',
              backgroundColor: '#1a1a1a',
              height: height || '100%',
              width: width || '100%'
            }}
          >
            {messages.map((message, idx) => (
              <ListItem
                key={idx}
                alignItems="flex-start"
                sx={{
                  backgroundColor:
                    message.type === 'error' ? '#300105' : '#222',
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
                        {createTitle(message)}
                      </Typography>
                      <Typography sx={{ fontSize: 14, color: '#fff' }}>
                        {`Type: ${message.type}`}
                      </Typography>
                    </Grid>
                  }
                  secondary={<ReactMarkdown>{message.content}</ReactMarkdown>}
                  secondaryTypographyProps={{
                    fontSize: 14,
                    color: '#ddd'
                  }}
                />
              </ListItem>
            ))}
            <div ref={lastItemRef}></div>
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default MessageList;
