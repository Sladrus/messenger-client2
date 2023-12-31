import React, { useContext, useState } from 'react';
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
import CreateTaskModal from '../CreateTaskModal';
import ConversationCourse from '../ConversationCourse';

const ConversationDetails = observer(() => {
  const { socket } = useContext(SocketContext);
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);

  const { conversationStore, userStore } = useContext(StoreContext);

  const handleClick = () => {
    conversationStore.sendChat(
      socket,
      conversationStore.selectedConversation?._id,
      userStore.user
    );
  };

  const openModal = () => {
    setTaskModalIsOpen(true);
  };

  const closeModal = () => {
    setTaskModalIsOpen(false);
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
      <ConversationCourse />
      {conversationStore.selectedConversation?.type !== 'private' && (
        <ConversationMembers
          members={conversationStore.selectedConversation?.members}
        />
      )}
      <ConversationTask
        conversation={conversationStore.selectedConversation}
        openModal={openModal}
        isLoading={conversationStore.taskLoading}
      />
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

      <CreateTaskModal show={taskModalIsOpen} closeModal={closeModal} />
    </Box>
  );
});

export default ConversationDetails;
