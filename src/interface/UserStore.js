import { makeAutoObservable, action } from 'mobx';
import {
  getLocalItem,
  removeLocalItem,
  setLocalItem,
} from '../utils/localStorage';

class UserStore {
  constructor() {
    this.isLoading = getLocalItem('token') ? true : false;
    this.user = null;
    this.users = [];
    this.isLoggedIn = false;
    makeAutoObservable(this, { setLoading: action, setLoggedIn: action });
  }

  setLoading(value) {
    this.isLoading = value;
  }

  setLoggedIn(value) {
    this.isLoggedIn = value;
  }

  setUserData(userData) {
    this.user = userData.user;
    this.setLoggedIn(true);
    this.setLoading(false);
    setLocalItem('token', userData.token);
  }

  setUsers(users) {
    this.users = users;
  }

  async login(socket, userData) {
    this.setLoading(true);
    socket.emit('user:login', userData);
  }

  async getUsers(socket) {
    this.setLoading(true);

    socket.emit('user:get');
  }

  async logout() {
    removeLocalItem('token');
    this.user = null;
    this.isLoggedIn = false;
    this.setLoading(false);
  }
}

export default UserStore;
