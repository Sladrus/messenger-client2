import io from 'socket.io-client';
import { createContext } from 'react';
import env from 'react-dotenv';
import { getLocalItem } from '../utils/localStorage';

const getSocket = () => {
  const token = getLocalItem('token');
  if (token) {
    return io(env.SERVER_URL, {
      transports: ['websocket', 'polling'],
      auth: { token },
      path: '/socket',
      reconnection: true,
    });
  }
  return io(env.SERVER_URL, {
    transports: ['websocket', 'polling'],
    path: '/socket',
    reconnection: true,
  });
};

export const socket = getSocket();

export const registerUserHandlers = (
  socket,
  userStore,
  enqueueSnackbar,
  navigate
) => {
  const setUserData = (userData) => {
    console.log(userData);
    userStore.setUserData(userData);
    enqueueSnackbar(`${userData.user.username} успешно авторизован`, {
      variant: 'success',
    });
    userStore.setLoading(false);

    navigate('/messenger');
  };

  const setUsers = ({ users }) => {
    userStore.setUsers(users);
  };

  socket.on('user', setUserData);
  socket.on('users', setUsers);
};

export const registerConversationHandlers = (
  socket,
  conversationStore,
  stageStore,
  enqueueSnackbar
) => {
  const updateConversation = ({ conversation }) => {
    conversationStore.updateConversation(conversation); // stage Store.setConversations(updatedConversations);
    stageStore.setConversations(
      conversationStore.conversations,
      conversationStore.filter.type
    );
    conversationStore.setUserLoading(false);
    conversationStore.setStageLoading(false);
    conversationStore.setTagsLoading(false);
    conversationStore.setTaskLoading(false);
    conversationStore.setMessageLoading(false);
    conversationStore.setMoneysendLoading(false);
    conversationStore.setUnreadLoading(false);
    conversationStore.setSendChatLoading(false);
  };

  const setConversations = ({ conversations }) => {
    conversationStore.setConversations(conversations);
    conversationStore.setLoading(false);
    stageStore.setConversations(conversations);
  };

  const setConversation = ({ conversation }) => {
    conversationStore.setSelectedConversation(conversation);
    conversationStore.setSelectedLoading(false);
    conversationStore.setUserLoading(false);
    conversationStore.setStageLoading(false);
    conversationStore.setTagsLoading(false);
    conversationStore.setCommentLoading(false);
    conversationStore.setMessageLoading(false);
    conversationStore.setMoneysendLoading(false);
    conversationStore.setUnreadLoading(false);
    conversationStore.setSendChatLoading(false);
  };

  const setSearchConversations = ({ conversations }) => {
    conversationStore.setSearchedConversations(conversations);
    conversationStore.setLoading(false);
  };

  socket.on('conversation:update', updateConversation);

  socket.on('conversations:set', setConversations);
  socket.on('conversations:setSearch', setSearchConversations);
  socket.on('conversations:setOne', setConversation);
};

export const registerStageHandlers = (socket, stageStore) => {
  const setStages = ({ stages }) => {
    stageStore.setStages(stages);
    stageStore.setLoading(false);
  };

  socket.on('stages:set', setStages);
};

export const registerTagsHandlers = (socket, tagsStore) => {
  const setTags = ({ tags }) => {
    tagsStore.setTags(tags);
    tagsStore.setLoading(false);
  };

  socket.on('tags:set', setTags);
};

export const registerTaskHandlers = (socket, taskStore) => {
  const setTaskTypes = ({ types }) => {
    taskStore.setTaskTypes(types);
    taskStore.setTypesLoading(false);
  };

  socket.on('taskTypes:set', setTaskTypes);
};

export const registerErrorHandlers = (
  socket,
  userStore,
  conversationStore,
  tagsStore,
  enqueueSnackbar
) => {
  socket.on('jwt_error', (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: 'warning' });
    userStore.setLoading(false);
    // userStore.logout();
  });

  socket.on('error', (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: 'warning' });

    //TODO: СДЕЛАТЬ НОРМАЛЬНУЮ СИСТЕМУ ОБРАБОТКИ ОШИБОК
    userStore.setLoading(false);
    conversationStore.setSelectedLoading(false);
    conversationStore.setUserLoading(false);
    conversationStore.setStageLoading(false);
    conversationStore.setTagsLoading(false);
    conversationStore.setCommentLoading(false);
    conversationStore.setMessageLoading(false);
    conversationStore.setMoneysendLoading(false);
    conversationStore.setSendChatLoading(false);
    tagsStore.setLoading(false);
  });

  socket.on('connect_error', (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: 'error' });
    userStore.setLoading(false);
  });

  socket.on('reconnect', (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: 'warning ' });
    userStore.setLoading(false);
  });
};

export const SocketContext = createContext();
