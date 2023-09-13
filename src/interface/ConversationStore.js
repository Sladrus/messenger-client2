import { makeAutoObservable, action, observable } from 'mobx';

class ConversationStore {
  constructor() {
    this.filter = {
      user: 'all',
      unread: 'all',
      stage: 'all',
      tags: [],
      task: 'all',
      dateRange: {
        startDate: null,
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          23,
          59,
          59
        ),
      },
    };

    this.conversations = null;

    this.searchedConversations = null;
    this.searchInput = '';
    this.searchIsLoading = false;

    this.isLoading = false;
    this.selectedIsLoading = false;

    this.stageLoading = false;
    this.userLoading = false;
    this.taskLoading = false;
    this.tagsLoading = false;
    this.commentLoading = false;
    this.taskTypeLoading = false;
    this.messageLoading = false;
    this.moneysendLoading = false;

    this.selectedChatId = null;
    this.selectedConversation = null;
    makeAutoObservable(this, {
      setStageLoading: action,
      setMessageLoading: action,
      setTaskTypeLoading: action,
      setUserLoading: action,
      setTagsLoading: action,
      setTaskLoading: action,
      setCommentLoading: action,
      setLoading: action,
      setSelectedLoading: action,
      setConversations: action,
      setSelectedConversation: action,
      setSelectedChatId: action,
      setDateRange: action,
    });
  }

  //LOADINGS

  setLoading(value) {
    this.isLoading = value;
  }

  setStageLoading(value) {
    this.stageLoading = value;
  }

  setUserLoading(value) {
    this.userLoading = value;
  }

  setTagsLoading(value) {
    this.tagsLoading = value;
  }

  setTaskLoading(value) {
    this.taskLoading = value;
  }

  setCommentLoading(value) {
    this.commentLoading = value;
  }

  setTaskTypeLoading(value) {
    this.taskTypeLoading = value;
  }

  setSelectedLoading(value) {
    this.selectedIsLoading = value;
  }

  setMessageLoading(value) {
    this.messageLoading = value;
  }
  setMoneysendLoading(value) {
    this.moneysendLoading = value;
  }

  setSearchIsLoading(value) {
    this.searchIsLoading = value;
  }

  //MAIN

  setSelectedChatId(value) {
    this.selectedChatId = value;
  }

  setSearchInput(value) {
    this.searchInput = value;
  }

  setSelectedConversation(value) {
    this.selectedConversation = value;
  }

  setConversations(value) {
    this.conversations = value;
  }

  setSearchedConversations(value) {
    this.searchedConversations = value;
  }

  clearSelectedConversation() {
    this.selectedChatId = null;
    this.selectedConversation = null;
  }

  updateConversation(conversation) {
    const updatedConversations = this.conversations?.map((conv) => {
      if (conv?._id === conversation?._id) {
        return conversation;
      } else {
        return conv;
      }
    });

    if (!updatedConversations?.includes(conversation)) {
      updatedConversations.push(conversation);
    }

    this.conversations = updatedConversations;
    console.log(conversation, this.selectedConversation);
    if (
      conversation?._id === this.selectedConversation?._id &&
      conversation?._id &&
      this.selectedConversation?._id
    ) {
      this.selectedConversation.stage = conversation?.stage;
      this.selectedConversation.title = conversation?.title;
      this.selectedConversation.user = conversation?.user;
      this.selectedConversation.tags = conversation?.tags;
      this.selectedConversation.members = conversation?.members;
      if (
        !this.selectedConversation?.messages.find(
          (message) => message._id === conversation?.lastMessage?._id
        )
      ) {
        this.selectedConversation?.messages.push(conversation?.lastMessage);
        if (conversation?.lastMessage?.from.is_bot) {
          this.selectedConversation?.messages.forEach((message) => {
            console.log(message);
            message.unread = false;
          });
        } else {
          this.selectedConversation.messages[
            this.selectedConversation?.messages?.length - 1
          ].unread = true;
        }
      }
    }
    this.conversations?.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }

  //FILTERS

  setFilterDateRange(range) {
    this.filter.dateRange = range;
  }

  setFilterUnread(value) {
    this.filter.unread = value;
  }

  setFilterUser(value) {
    this.filter.user = value;
  }

  setFilterStage(value) {
    this.filter.stage = value;
  }

  setFilterTask(value) {
    this.filter.task = value;
  }

  setFilterTags(value) {
    this.filter.tags = value;
  }

  async changeStage(socket, id, stageId) {
    this.setStageLoading(true);
    socket.emit('conversation:updateStage', {
      id,
      stageId,
    });
  }

  async changeUser(socket, id, userId) {
    this.setUserLoading(true);
    socket.emit('conversation:updateUser', {
      id,
      userId,
    });
  }

  async changeTags(socket, id, value) {
    this.setTagsLoading(true);
    socket.emit('conversation:updateTags', {
      id,
      tags: value,
    });
  }

  async createTag(socket, id, value) {
    this.setTagsLoading(true);
    socket.emit('conversation:createTag', {
      id,
      value: value,
    });
  }

  async createComment(socket, id, value) {
    this.setCommentLoading(true);
    socket.emit('conversation:createComment', {
      id,
      value: value,
    });
  }

  async sendMessage(socket, { id, text, type, user }) {
    this.setMessageLoading(true);
    socket.emit('message:sendMessage', {
      id,
      text,
      type,
      user,
    });
  }

  async createMoneysend(socket, id, data) {
    console.log(id, data);
    this.setMoneysendLoading(true);
    socket.emit('conversation:createMoneysend', {
      id,
      data,
    });
  }

  //

  async getConversations(socket) {
    this.setLoading(true);
    socket.emit('conversations:get', { filter: this.filter });
  }

  async getSelectedConversation(socket) {
    this.setSelectedLoading(true);
    socket.emit('conversations:getOne', {
      selectedChatId: this.selectedChatId,
    });
  }

  async getSearchedConversations(socket) {
    this.setLoading(true);
    socket.emit('conversations:getSearch', { searchInput: this.searchInput });
  }
}

export default ConversationStore;
