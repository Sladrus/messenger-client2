import React, { useContext } from 'react';
import ConversationInfo from '../ConversationInfo';
import ConversationMembers from '../ConversationMembers';
import ConversationNotes from '../ConversationNotes';
import ConversationInstruments from '../ConversationInstruments';
import ConversationTask from '../ConversationTask';
import ConversationMoneysend from '../ConversationMoneysend';
import { Box } from '@mui/material';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';

const ConversationDetails = observer(() => {
  const { conversationStore } = useContext(StoreContext);

  return (
    <Box>
      <ConversationInfo conversation={conversationStore.selectedConversation} />
      <ConversationMembers
        members={conversationStore.selectedConversation?.members}
      />
      <ConversationNotes
        conversation={conversationStore.selectedConversation}
      />
      <ConversationInstruments
        conversation={conversationStore.selectedConversation}
      />
      <ConversationMoneysend
        conversation={conversationStore.selectedConversation}
      />
      <ConversationTask conversation={conversationStore.selectedConversation} />
    </Box>
  );
});

export default ConversationDetails;
