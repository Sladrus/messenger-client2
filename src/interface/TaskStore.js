import { makeAutoObservable, action } from 'mobx';

class TaskStore {
  constructor() {
    this.isTypesLoading = false;
    this.isTasksLoading = false;
    this.taskTypes = [];
    this.tasks = [];
    makeAutoObservable(this, {
      setTasksLoading: action,
      setTaskTypeLoading: action,
      setTasks: action,
    });
  }

  setTasksLoading(value) {
    this.isTasksLoading = value;
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

  updateTask(task) {
    const updatedTasks = this.tasks?.map((t) => {
      if (t?._id === task?._id) {
        return task;
      } else {
        return t;
      }
    });
    if (!updatedTasks?.includes(task)) {
      updatedTasks.push(task);
    }

    this.tasks = updatedTasks;
  }

  async getTasks(socket) {
    this.setTasksLoading(true);
    socket.emit('tasks:get');
  }

  async getTaskTypes(socket) {
    this.setTypesLoading(true);
    socket.emit('taskTypes:get');
  }

  async createTaskType(socket, value) {
    this.setTypesLoading(true);
    socket.emit('taskTypes:create', {
      value: value,
    });
  }

  // async createTask(socket, data) {
  //   this.setTypesLoading(true);
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 500);
  //   });
  //   socket.emit('taskTypes:create', data);
  // }
}

export default TaskStore;
