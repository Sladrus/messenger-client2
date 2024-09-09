import ClearIcon from "@mui/icons-material/Clear";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  // AppBar,
  Box,
  CircularProgress,
  Fab,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { SocketContext } from "../../../context/socket";
import { StoreContext } from "../../../context/store";
import { chatCount } from "../../../utils/text";
const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const ConversationBar = observer(({ handleDrawerOpen, open, close }) => {
  const { socket } = useContext(SocketContext);

  const { conversationStore, userStore } = useContext(StoreContext);

  const length =
    conversationStore.searchedConversations &&
    conversationStore.searchInput !== ""
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

  const handleLoadNewMessages = () => {
    conversationStore.selectedConversation?.type === "supergroup" ||
    conversationStore.selectedConversation?.type === "group"
      ? conversationStore.createNewMessagesFromChat(
          socket,
          conversationStore.selectedConversation._id
        )
      : conversationStore.createNewMessagesFromPrivate(
          socket,
          conversationStore.selectedConversation._id
        );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{ height: "64px", background: "white" }}
        open={open}
      >
        <Toolbar>
          {conversationStore.isLoading ||
          conversationStore.selectedIsLoading ? (
            <Box
              sx={{
                textAlign: "left",
                color: "black",
                width: "100%",
              }}
            >
              <LinearProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ textAlign: "left", color: "black", width: "100%" }}>
                {conversationStore.selectedConversation ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {!close && (
                        <ClearIcon
                          sx={{ pr: "25px", cursor: "pointer" }}
                          onClick={clearSelectedConversation}
                        />
                      )}
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {conversationStore.selectedConversation.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Кол-во сообщений:{" "}
                          {
                            conversationStore.selectedConversation.messages
                              ?.length
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ pl: "25px" }}>
                        {conversationStore?.selectedChatId !== null && (
                          <Box>
                            {!conversationStore.unreadLoading ? (
                              <IconButton onClick={handleLoadNewMessages}>
                                <CloudDownloadOutlinedIcon fontSize="medium" />
                              </IconButton>
                            ) : (
                              <CircularProgress
                                sx={{ color: "white" }}
                                size={16}
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ p: "0 10px" }}>
                      {conversationStore?.selectedChatId !== null &&
                        conversationStore.selectedConversation?.unreadCount >
                          0 && (
                          <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            onClick={handleReadConversation}
                            sx={{ width: "250px" }}
                          >
                            {!conversationStore.unreadLoading ? (
                              "Пометить как прочитано"
                            ) : (
                              <CircularProgress
                                sx={{ color: "white" }}
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
                      ? "Найдено"
                      : `Загружено`}{" "}
                    {length} {chatCount(length)} из{" "}
                    {conversationStore?.metadata?.total || 0}
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
                sx={{ ...(open && { display: "none" }) }}
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
