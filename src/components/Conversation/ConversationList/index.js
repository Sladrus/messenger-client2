import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import ConversationSearch from "../ConversationSearch";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import ConversationItem from "../ConversationItem";
import { StoreContext } from "../../../context/store";
import { observer } from "mobx-react-lite";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import { SocketContext } from "../../../context/socket";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(0),
  height: "calc(100vh - 65px)",
  textAlign: "center",
}));

const ConversationList = observer(() => {
  const scrollRef = useRef(null);
  const { conversationStore } = useContext(StoreContext);
  const { socket } = useContext(SocketContext);

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
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }
    }
  }, [conversationStore.selectedChatId, conversationStore.selectedIsLoading]);

  const rowCount =
    conversationStore.searchedConversations && conversationStore.searchInput
      ? conversationStore.searchedConversations?.length || 0
      : conversationStore.conversations?.length || 0;

  const rowRenderer = ({ index, key, style }) => {
    if (
      index === rowCount - 1 &&
      rowCount !== conversationStore?.metadata?.total && !conversationStore.searchInput
    )
      return (
        <div key={key} style={style}>
          <Card
            data-chat-id={key}
            onClick={() => conversationStore.loadNextPage(socket)}
            sx={{
              background: "white",
              padding: "10px",
              borderRadius: 0,
              height: "44px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            <Button variant="contained" disabled={conversationStore.isLoading}>
              Загрузить еще
            </Button>
          </Card>
        </div>
      );
    return (
      <div key={key} style={style}>
        <ConversationItem
          conversation={conversations[index]}
          onClick={() =>
            handleSelectConversation(conversations[index]?.chat_id)
          }
          dataChatId={conversations[index]?.chat_id}
        />
      </div>
    );
  };

  return (
    <Item>
      <ConversationSearch />
      <Box sx={{ height: "calc(100% - 65px)" }}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              rowCount={rowCount}
              rowHeight={60} // Высота каждого элемента списка
              rowRenderer={rowRenderer}
              overscanRowCount={10} // Количество предварительно отображаемых элементов сверху и снизу
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      </Box>
    </Item>
  );
});

export default ConversationList;
