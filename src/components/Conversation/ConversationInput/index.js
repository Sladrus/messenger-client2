import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import { Divider } from '@mui/material';
import { StoreContext } from '../../../context/store';
import { SocketContext } from '../../../context/socket';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(0),
  position: 'relative',
}));

const ConversationInput = ({}) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, userStore } = useContext(StoreContext);

  const [value, setValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (value.trim() !== '') {
      conversationStore.sendMessage(socket, {
        id: conversationStore?.selectedConversation?._id,
        text: value,
        type: 'text',
        user: userStore?.user,
      });
      setValue('');
    }
  };

  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <Item>
      <Divider />
      <form>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Textarea
            autoFocus={true}
            sx={{
              width: 'calc(100% - 1px)',
              border: 0,
            }}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleTextareaKeyDown}
            placeholder="Напишите сообщение"
            minRows={1}
            endDecorator={
              <Box
                sx={{
                  display: 'flex',
                  gap: 'var(--Textarea-paddingBlock)',
                  pt: 'var(--Textarea-paddingBlock)',
                  flex: 'auto',
                }}
              ></Box>
            }
          />
          {/* <Button onClick={handleSendMessage} sx={{}}>
            Отправить
          </Button> */}
        </Box>
      </form>
    </Item>
  );
};

export default ConversationInput;
