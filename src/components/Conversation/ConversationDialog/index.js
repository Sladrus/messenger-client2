import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ConversationBar from '../ConversationBar';
import { Box, CircularProgress } from '@mui/material';
import ConversationMessageList from '../CovnersationMessageList';
import ConversationDrawer from '../ConversationDrawer';
import ConversationInput from '../ConversationInput';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../context/store';
import { SocketContext } from '../../../context/socket';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderLeft: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(0),
  height: 'calc(100vh - 65px)',
  textAlign: 'center',
}));

const ConversationDialog = observer(() => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, userStore } = useContext(StoreContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (conversationStore?.selectedChatId)
      conversationStore.getSelectedConversation(socket);
  }, [conversationStore?.selectedChatId]);

  return (
    <Item>
      <ConversationBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <ConversationDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          width: '100%',
          height: 'calc(100% - 65px)',
          backgroundImage:
            'url("https://oir.mobi/uploads/posts/2022-08/1661337097_1-oir-mobi-p-fon-dlya-telegram-oboi-1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Keeps the background image fixed
        }}
      >
        {conversationStore.selectedIsLoading ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ConversationMessageList />
        )}
        {conversationStore?.selectedChatId !== null &&
          !conversationStore.selectedIsLoading && <ConversationInput />}
      </Box>
    </Item>
  );
});

export default ConversationDialog;
