import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ConversationSearch from '../ConversationSearch';
import { Box, CircularProgress, Typography } from '@mui/material';
import ConversationItem from '../ConversationItem';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';
import { List, AutoSizer } from 'react-virtualized';

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
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height - 65}
              rowCount={conversations.length}
              rowHeight={60} // Высота каждого элемента списка
              rowRenderer={({ index, key, style }) => (
                <div key={key} style={style}>
                  {/* Рендеринг элемента списка */}
                  <ConversationItem
                    conversation={conversations[index]}
                    onClick={() =>
                      handleSelectConversation(conversations[index].chat_id)
                    }
                    dataChatId={conversations[index].chat_id}
                  />
                </div>
              )}
              overscanRowCount={10} // Количество предварительно отображаемых элементов сверху и снизу
              width={width}
            />
          )}
        </AutoSizer>
      )}
    </Item>
  );
});

export default ConversationList;
