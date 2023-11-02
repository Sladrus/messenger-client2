import {
  AppBar,
  Box,
  CircularProgress,
  Fab,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../context/store';
import { chatCount } from '../../../utils/text';
import ClearIcon from '@mui/icons-material/Clear';
import { SocketContext } from '../../../context/socket';

const ConversationBar = observer(({ handleDrawerOpen, open }) => {
  const { socket } = useContext(SocketContext);

  const { conversationStore, userStore } = useContext(StoreContext);

  const length =
    conversationStore.searchedConversations &&
    conversationStore.searchInput !== ''
      ? conversationStore.searchedConversations?.length
      : conversationStore.conversations?.length;

  const clearSelectedConversation = () => {
    conversationStore.clearSelectedConversation();
  };

  const handleReadConversation = () => {
    conversationStore.readConversation(
      socket,
      conversationStore.selectedConversation._id,
      userStore.user
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{ height: '64px', background: 'white' }}
        open={open}
      >
        <Toolbar>
          {conversationStore.isLoading ||
          conversationStore.selectedIsLoading ? (
            <Box
              sx={{
                textAlign: 'left',
                color: 'black',
                width: '100%',
              }}
            >
              <LinearProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ textAlign: 'left', color: 'black', width: '100%' }}>
                {conversationStore.selectedConversation ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ClearIcon
                        sx={{ pr: '25px', cursor: 'pointer' }}
                        onClick={clearSelectedConversation}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {conversationStore.selectedConversation.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Кол-во сообщений:{' '}
                          {
                            conversationStore.selectedConversation.messages
                              ?.length
                          }
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ p: '0 10px' }}>
                      {conversationStore?.selectedChatId !== null &&
                        conversationStore.selectedConversation?.unreadCount >
                          0 && (
                          <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            onClick={handleReadConversation}
                            sx={{ width: '250px' }}
                          >
                            {!conversationStore.unreadLoading ? (
                              'Пометить как прочитано'
                            ) : (
                              <CircularProgress
                                sx={{ color: 'white' }}
                                size={16}
                              />
                            )}
                          </Fab>
                        )}
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="subtitle2" fontWeight="bold">
                    {conversationStore.searchedConversations
                      ? 'Найдено'
                      : 'Загружено'}{' '}
                    {length} {chatCount(length)}
                  </Typography>
                )}
              </Box>
            </>
          )}
          {!conversationStore.selectedIsLoading &&
            conversationStore.selectedConversation && (
              <IconButton
                color="textSecondary"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default ConversationBar;
