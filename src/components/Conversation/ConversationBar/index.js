import {
  AppBar,
  Box,
  CircularProgress,
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

const ConversationBar = observer(({ handleDrawerOpen, open }) => {
  const { conversationStore } = useContext(StoreContext);

  const length =
    conversationStore.searchedConversations &&
    conversationStore.searchInput !== ''
      ? conversationStore.searchedConversations?.length
      : conversationStore.conversations?.length;

  const clearSelectedConversation = () => {
    conversationStore.clearSelectedConversation();
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
            <Box sx={{ textAlign: 'left', color: 'black', width: '100%' }}>
              {conversationStore.selectedConversation ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <ClearIcon
                    sx={{ pr: '25px', cursor: 'pointer' }}
                    onClick={clearSelectedConversation}
                  /> */}
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {conversationStore.selectedConversation.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Кол-во сообщений:{' '}
                      {conversationStore.selectedConversation.messages?.length}
                    </Typography>
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
