import { useContext, useEffect } from 'react';
import {
  SocketContext,
  registerConversationHandlers,
  registerErrorHandlers,
  registerStageHandlers,
  registerTagsHandlers,
  registerTaskHandlers,
  registerUserHandlers,
} from '../context/socket';
import { StoreContext } from '../context/store';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export const useChat = () => {
  const { socket } = useContext(SocketContext);
  const { userStore, conversationStore, stageStore, tagsStore, taskStore } =
    useContext(StoreContext);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    registerErrorHandlers(
      socket,
      userStore,
      conversationStore,
      tagsStore,
      enqueueSnackbar
    );
    registerUserHandlers(socket, userStore, enqueueSnackbar, navigate); // eslint-disable-next-line
    registerConversationHandlers(
      socket,
      conversationStore,
      stageStore,
      enqueueSnackbar
    ); // eslint-disable-next-line
    registerStageHandlers(socket, stageStore); // eslint-disable-next-line
    registerTagsHandlers(socket, tagsStore); // eslint-disable-next-line
    registerTaskHandlers(socket, taskStore); // eslint-disable-next-line
    // conversationStore.getConversations(socket);
    userStore.getUsers(socket);
    stageStore.getStages(socket); // eslint-disable-next-line
    tagsStore.getTags(socket); // eslint-disable-next-line
    taskStore.getTaskTypes(socket); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    conversationStore.getConversations(socket); // eslint-disable-next-line
  }, [
    conversationStore.filter.unread,
    conversationStore.filter.user,
    conversationStore.filter.type,
    conversationStore.filter.stage,
    conversationStore.filter.tags,
    conversationStore.filter.task,
    conversationStore.filter.dateRange,
  ]);

  return { userStore };
};
