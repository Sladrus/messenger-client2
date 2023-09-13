import { makeAutoObservable, action } from 'mobx';

class TaskStore {
  constructor() {
    this.isTypesLoading = false;

    this.taskTypes = [];
    makeAutoObservable(this, {
      setTaskTypeLoading: action,
      setTasks: action,
    });
  }

  setTypesLoading(value) {
    this.isTypesLoading = value;
  }

  setTasks(value) {
    this.tasks = value;
  }

  setTaskTypes(value) {
    this.taskTypes = value;
  }

  async getTaskTypes(socket) {
    this.setTypesLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    socket.emit('taskTypes:get');
  }

  async createTaskType(socket, id, value) {
    this.setTypesLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    socket.emit('taskTypes:create', {
      id,
      value: value,
    });
  }
}

export default TaskStore;
