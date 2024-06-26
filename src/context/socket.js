import io from "socket.io-client";
import { createContext } from "react";
import env from "react-dotenv";
import { getLocalItem } from "../utils/localStorage";

const getSocket = () => {
  const token = getLocalItem("token");
  if (token) {
    return io(env.SERVER_URL, {
      transports: ["websocket", "polling"],
      auth: { token },
      path: "/socket",
      reconnection: true,
    });
  }
  return io(env.SERVER_URL, {
    transports: ["websocket", "polling"],
    path: "/socket",
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
    userStore.setUserData(userData);
    enqueueSnackbar(`${userData.user.username} успешно авторизован`, {
      variant: "success",
    });
    userStore.setLoading(false);

    navigate("/messenger");
  };

  const setUsers = ({ users }) => {
    userStore.setUsers(users);
  };

  socket.on("user", setUserData);
  socket.on("users", setUsers);
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
    conversationStore.setSendGradeLoading(false);
  };

  const setConversations = ({ conversations }) => {
    conversationStore.setMetadata(conversations?.metadata[0]);
    conversationStore.setPage(conversations?.metadata[0]?.page || 1);
    conversationStore.setConversations(conversations?.data);
    conversationStore.setLoading(false);
    stageStore.setConversations(conversations.data);
  };

  const setConversation = ({ conversation }) => {
    conversationStore.setSelectedConversation(conversation);
    conversationStore.setSelectedLoading(false);
    conversationStore.setUserLoading(false);
    conversationStore.setStageLoading(false);
    conversationStore.setTagsLoading(false);
    conversationStore.setCommentLoading(false);
    conversationStore.setTaskLoading(false);

    conversationStore.setMessageLoading(false);
    conversationStore.setMoneysendLoading(false);
    conversationStore.setUnreadLoading(false);
    conversationStore.setSendChatLoading(false);
    conversationStore.setSendGradeLoading(false);
  };

  const setSearchConversations = ({ conversations }) => {
    conversationStore.setSearchedConversations(conversations);
    conversationStore.setLoading(false);
  };

  socket.on("conversation:update", updateConversation);

  socket.on("conversations:set", setConversations);
  socket.on("conversations:setSearch", setSearchConversations);
  socket.on("conversations:setOne", setConversation);
};

export const registerStageHandlers = (socket, stageStore) => {
  const setStages = ({ stages }) => {
    stageStore.setStages(stages);
    stageStore.setLoading(false);
  };

  socket.on("stages:set", setStages);
};

export const registerOrdersHandlers = (socket, ordersStore) => {
  const setOrderStages = ({ stages, orders }) => {
    ordersStore.setOrders(orders);
    ordersStore.setOrderStages(stages);
    ordersStore.setFullStages(orders);
    ordersStore.setLoading(false);
  };

  const updateOrder = ({ order }) => {
    ordersStore.updateOrder(order);
    ordersStore.setUserLoading(false);
    ordersStore.setStageLoading(false);
  };

  socket.on("orders:set", setOrderStages);
  socket.on("order:update", updateOrder);
};

export const registerTagsHandlers = (socket, tagsStore) => {
  const setTags = ({ tags }) => {
    tagsStore.setTags(tags);
    tagsStore.setLoading(false);
  };

  socket.on("tags:set", setTags);
};

export const registerTaskHandlers = (socket, taskStore) => {
  const setTaskTypes = ({ types }) => {
    taskStore.setTaskTypes(types);
    taskStore.setTypesLoading(false);
  };

  const setTasks = ({ tasks }) => {
    taskStore.setTasks(tasks);
    taskStore.setTasksLoading(false);
  };

  const updateTask = ({ task }) => {
    taskStore.updateTask(task);
    taskStore.setTasksLoading(false);
  };

  socket.on("task:update", updateTask);

  socket.on("taskTypes:set", setTaskTypes);
  socket.on("tasks:set", setTasks);
};

export const registerErrorHandlers = (
  socket,
  userStore,
  conversationStore,
  tagsStore,
  taskStore,
  stageStore,
  enqueueSnackbar
) => {
  socket.on("jwt_error", (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: "warning" });
    userStore.setLoading(false);
    // userStore.logout();
  });

  socket.on("error", (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: "warning" });

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
    conversationStore.setSendGradeLoading(false);
    conversationStore.setTaskLoading(false);

    tagsStore.setLoading(false);

    taskStore.setTypesLoading(false);
    taskStore.setTasksLoading(false);

    stageStore.setLoading(false);
  });

  socket.on("connect_error", (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: "error" });
    userStore.setLoading(false);
  });

  socket.on("reconnect", (error) => {
    console.log(error);
    enqueueSnackbar(error.message, { variant: "warning " });
    userStore.setLoading(false);
  });
};

export const SocketContext = createContext();
