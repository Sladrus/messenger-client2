import { makeAutoObservable, action } from 'mobx';

class TagsStore {
  constructor() {
    this.isLoading = false;
    this.tags = [];
    makeAutoObservable(this, {
      setLoading: action,
      setTags: action,
    });
  }

  setLoading(value) {
    this.isLoading = value;
  }

  setTags(value) {
    this.tags = value;
  }

  async getTags(socket) {
    this.setLoading(true);
    socket.emit('tags:get');
  }
}

export default TagsStore;
