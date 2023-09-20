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
import ConversationSendChat from '../ConversationSendChat';
import { SocketContext } from '../../../context/socket';

const ConversationDetails = observer(() => {
  const { socket } = useContext(SocketContext);

  const { conversationStore, userStore } = useContext(StoreContext);

  const handleClick = () => {
    console.log('CLICK');
    conversationStore.sendChat(
      socket,
      conversationStore.selectedConversation?._id,
      userStore.user
    );
  };

  return (
    <Box>
      {conversationStore.selectedConversation?.type === 'private' && (
        <ConversationSendChat
          conversation={conversationStore.selectedConversation}
          isLoading={conversationStore.sendChatIsLoading}
          onClick={handleClick}
        />
      )}
      {conversationStore.selectedConversation?.type !== 'private' && (
        <ConversationInfo
          conversation={conversationStore.selectedConversation}
        />
      )}
      {conversationStore.selectedConversation?.type !== 'private' && (
        <ConversationMembers
          members={conversationStore.selectedConversation?.members}
        />
      )}

      <ConversationNotes
        conversation={conversationStore.selectedConversation}
      />
      <ConversationInstruments
        conversation={conversationStore.selectedConversation}
      />
      {conversationStore.selectedConversation?.type !== 'private' && (
        <ConversationMoneysend
          conversation={conversationStore.selectedConversation}
        />
      )}

      <ConversationTask conversation={conversationStore.selectedConversation} />
    </Box>
  );
});

export default ConversationDetails;
