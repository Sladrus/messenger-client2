import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ConversationSearch from '../ConversationSearch';
import { Box, CircularProgress, Typography } from '@mui/material';
import ConversationItem from '../ConversationItem';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(0),
  height: 'calc(100vh - 65px)',
  textAlign: 'center',
}));

const ConversationList = observer(() => {
  const scrollRef = useRef(null);
  const { conversationStore } = useContext(StoreContext);

  const conversations =
    conversationStore.searchedConversations && conversationStore.searchInput
      ? conversationStore.searchedConversations
      : conversationStore.conversations;

  const handleSelectConversation = (chat_id) => {
    conversationStore.setSelectedChatId(chat_id);
  };

  useEffect(() => {
    if (scrollRef.current && conversationStore.selectedIsLoading) {
      const selectedConversation = scrollRef.current.querySelector(
        `[data-chat-id="${conversationStore.selectedChatId}"]`
      );

      if (selectedConversation) {
        const rect = selectedConversation.getBoundingClientRect();

        if (
          rect.bottom > window.innerHeight ||
          rect.top < 0 ||
          rect.right > window.innerWidth ||
          rect.left < 0
        ) {
          selectedConversation.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }
    }
  }, [conversationStore.selectedChatId, conversationStore.selectedIsLoading]);


  return (
    <Item>
      <ConversationSearch />
      {conversationStore.isLoading ? (
        <Box
          sx={{
            height: 'calc(100% - 65px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          ref={scrollRef}
          sx={{ height: 'calc(100% - 65px)', overflowY: 'scroll' }}
        >
          {conversations?.length > 0 ? (
            conversations?.map((conversation) => (
              <ConversationItem
                key={conversation?._id}
                conversation={conversation}
                onClick={() => handleSelectConversation(conversation?.chat_id)}
                dataChatId={conversation?.chat_id}
              />
            ))
          ) : (
            <Typography
              sx={{
                textOveralow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
                p: '25px 0',
              }}
              variant="body2"
              color="textSecondary"
            >
              По данному запросу чаты отсутствуют
            </Typography>
          )}
        </Box>
      )}
    </Item>
  );
});

export default ConversationList;
