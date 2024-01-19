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
import ConversationSources from '../ConversationSources';
import InfoModal from '../InfoModal';

const ConversationDetails = observer(() => {
  const { socket } = useContext(SocketContext);
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

  const [selectedMember, setSelectedMember] = useState();

  const { conversationStore, userStore } = useContext(StoreContext);

  const handleClick = () => {
    conversationStore.sendChat(
      socket,
      conversationStore.selectedConversation?._id,
      userStore.user
    );
  };

  const openTaskModal = () => {
    setTaskModalIsOpen(true);
  };

  const closeTaskModal = () => {
    setTaskModalIsOpen(false);
  };

  const openInfoModal = () => {
    setInfoModalIsOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalIsOpen(false);
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
        <ConversationSources
          conversation={conversationStore.selectedConversation}
        />
      )}
      <ConversationCourse />
      {conversationStore.selectedConversation?.type !== 'private' && (
        <ConversationMembers
          members={conversationStore.selectedConversation?.members}
          openModal={openInfoModal}
          setSelectedMember={setSelectedMember}
        />
      )}
      <ConversationTask
        conversation={conversationStore.selectedConversation}
        openModal={openTaskModal}
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

      <CreateTaskModal show={taskModalIsOpen} closeModal={closeTaskModal} />
      <InfoModal
        show={infoModalIsOpen}
        closeModal={closeInfoModal}
        selectedMember={selectedMember}
      />
    </Box>
  );
});

export default ConversationDetails;
