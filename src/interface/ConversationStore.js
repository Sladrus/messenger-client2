import { makeAutoObservable, action } from 'mobx';

class ConversationStore {
  constructor() {
    this.filter = {
      user: 'all',
      type: 'all',
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
    this.page = 1;
    this.limit = 100;
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
    this.unreadLoading = false;

    this.selectedChatId = null;
    this.selectedConversation = null;
    makeAutoObservable(this, {
      setStageLoading: action,
      setUnreadLoading: action,
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

  setUnreadLoading(value) {
    this.unreadLoading = value;
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
    console.log(this.conversations);
  }

  setSearchedConversations(value) {
    this.searchedConversations = value;
  }

  clearSelectedConversation() {
    this.selectedChatId = null;
    this.selectedConversation = null;
  }

  isConversationMatchingFilter(conversation) {
    // Check user
    if (
      this.filter.user !== 'all' &&
      conversation?.user?._id !== this.filter.user
    ) {
      return false;
    }

    // Check unread
    if (
      this.filter.unread !== 'all' &&
      conversation?.unread !== this.filter.unread
    ) {
      return false;
    }

    // Check stage
    if (
      this.filter.stage !== 'all' &&
      conversation?.stage._id !== this.filter.stage
    ) {
      return false;
    }

    // Check type
    if (this.filter.type !== 'all' && conversation?.type !== this.filter.type) {
      return false;
    }

    // Check tags
    if (
      this.filter.tags.length > 0 &&
      !conversation?.tags?.some((tag) => this.filter.tags.includes(tag))
    ) {
      return false;
    }

    // Check dateRange
    const startDate = this.filter.dateRange.startDate;
    const endDate = this.filter.dateRange.endDate;
    const conversationDate = conversation?.workAt;

    if (
      startDate &&
      new Date(startDate).getTime() > new Date(conversationDate)?.getTime()
    ) {
      return false;
    }

    if (
      endDate &&
      new Date(endDate).getTime() < new Date(conversationDate)?.getTime()
    ) {
      return false;
    }

    return true;
  }

  updateConversation(conversation) {
    const updatedConversations = this.conversations?.map((conv) => {
      if (conv?._id === conversation?._id) {
        return conversation;
      } else {
        return conv;
      }
    });

    if (
      !updatedConversations?.includes(conversation) &&
      this.isConversationMatchingFilter(conversation)
    ) {
      updatedConversations.push(conversation);
    }

    this.conversations = updatedConversations;
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
      this.selectedConversation.unreadCount = conversation?.unreadCount;
      if (this.selectedConversation.unreadCount === 0) {
        this.selectedConversation?.messages?.map((message) => {
          message.unread = false;
          return message;
        });
      }
      if (
        !this.selectedConversation?.messages.find(
          (message) => message._id === conversation?.lastMessage?._id
        )
      ) {
        this.selectedConversation?.messages.push(conversation?.lastMessage);
        if (conversation?.lastMessage?.from.is_bot) {
          this.selectedConversation?.messages.forEach((message) => {
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

  setFilterType(value) {
    this.filter.type = value;
  }

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

  async readConversation(socket, id) {
    this.setUnreadLoading(true);
    socket.emit('conversation:read', {
      id,
    });
  }

  async createMoneysend(socket, id, data) {
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
