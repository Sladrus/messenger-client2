import { flexibleCompare } from "@fullcalendar/core/internal";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Card, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

const ConversationSendChat = ({ conversation, isLoading, onClick }) => {
  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <Box sx={{ p: "15px", display: "flex", justifyContent: "end" }}>
        <LoadingButton
          onClick={onClick}
          loading={isLoading}
          sx={{ width: "50%" }}
          variant="contained"
        >
          Выдать чат
        </LoadingButton>
      </Box>
      <Divider />
    </Card>
  );
};
export default ConversationSendChat;
