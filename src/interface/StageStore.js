import { makeAutoObservable, action } from 'mobx';

class StageStore {
  constructor() {
    this.isLoading = false;
    this.stages = null;
    this.fullStages = {};
    makeAutoObservable(this, {
      setLoading: action,
      setStages: action,
    });
  }

  setLoading(value) {
    this.isLoading = value;
  }
  setStages(value) {
    this.stages = value;
  }

  async getStages(socket) {
    this.setLoading(true);
    socket.emit('stages:get');
  }

  async createStage(socket, stage) {
    this.setLoading(true);
    socket.emit('stage:create', stage);
  }

  async setConversations(conversations) {
    this.fullStages = [];
    conversations?.forEach((conversation) => {
      const stageValue = conversation?.stage?.value;

      if (!this.fullStages[stageValue]) {
        this.fullStages[stageValue] = [];
      }

      this.fullStages[stageValue].push(conversation);
    });
  }
}

export default StageStore;
