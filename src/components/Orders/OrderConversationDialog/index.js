import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import ConversationBar from "../../Conversation/ConversationBar";
import ConversationDrawer from "../../Conversation/ConversationDrawer";
import { SocketContext } from "../../../context/socket";
import { StoreContext } from "../../../context/store";
import ConversationMessageList from "../../Conversation/CovnersationMessageList";
import ConversationInput from "../../Conversation/ConversationInput";

const drawerWidth = 400;

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  borderLeft: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(0),
  height: "calc(100vh - 65px)",
  textAlign: "center",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: `${drawerWidth}px`,
    }),
  })
);

const OrderConversationDialog = observer(() => {
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
      <ConversationBar open={open} handleDrawerOpen={handleDrawerOpen} close={true}/>
      <ConversationDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Main
        sx={{
          display: "flex",
          flexDirection: "column",
          // zIndex: 1000,
          // width: "100%",
          height: "calc(100% - 65px)",
          backgroundImage:
            'url("https://oir.mobi/uploads/posts/2022-08/1661337097_1-oir-mobi-p-fon-dlya-telegram-oboi-1.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Keeps the background image fixed
        }}
        open={open}
      >
        {conversationStore.selectedIsLoading ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          // <Main open={open}>
            <ConversationMessageList />
          // </Main>
        )}
        {conversationStore?.selectedChatId !== null &&
          !conversationStore.selectedIsLoading && <ConversationInput />}
      </Main>
    </Item>
  );
});

export default OrderConversationDialog;
