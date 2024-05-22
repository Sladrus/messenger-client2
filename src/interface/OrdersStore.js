import { makeAutoObservable, action } from "mobx";

class OrdersStore {
  constructor() {
    this.selectedOrder = null;
    this.isLoading = false;
    this.stageLoading = false;
    this.userLoading = false;
    this.orderStages = null;
    this.orders = null;
    this.filteredOrders = null;
    this.fullStages = {};
    makeAutoObservable(this, {
      setLoading: action,
      setOrderStages: action,
    });
  }

  setSelectedOrder(value) {
    this.selectedOrder = value;
  }

  setLoading(value) {
    this.isLoading = value;
  }

  setStageLoading(value) {
    this.stageLoading = value;
  }

  setUserLoading(value) {
    this.userLoading = value;
  }

  setOrderStages(value) {
    this.orderStages = value;
  }

  setOrders(value) {
    this.orders = value;
  }

  async getOrderStages(socket) {
    this.setLoading(true);
    socket.emit("orders:get");
  }

  async createOrderStage(socket, stage) {
    this.setLoading(true);
    socket.emit("orders:createStatus", stage);
  }

  async moveStage(socket, id, position) {
    this.setLoading(true);
    socket.emit("orders:moveStage", {
      id,
      position,
    });
  }

  async setFullStages(orders) {
    this.fullStages = [];
    orders.forEach((order) => {
      const stageValue = order?.stage?.value;

      if (!this.fullStages[stageValue]) {
        this.fullStages[stageValue] = [];
      }

      this.fullStages[stageValue].push(order);
    });
  }

  async filterOrders(chat_id) {
    if (chat_id === 0) {
      this.setFullStages(this.orders);
    } else {
      this.filteredOrders = this.orders?.filter(
        (order) => order?.order?.chat_id === chat_id
      );
      this.setFullStages(this.filteredOrders);
    }
  }

  async updateOrder(order) {
    const updatedOrders = this.orders?.map((item) => {
      if (item?._id === order?._id) {
        return order;
      } else {
        return item;
      }
    });
    if (!updatedOrders?.includes(order)) {
      updatedOrders.push(order);
    }

    this.orders = updatedOrders;
    if (order?._id === this.selectedOrder?._id) this.selectedOrder = order;

    this.setFullStages(this.orders);
  }

  async changeStage(socket, id, stageId) {
    this.setStageLoading(true);
    socket.emit("order:updateStage", {
      id,
      stageId,
    });
  }

  async changeUser(socket, id, userId) {
    this.setUserLoading(true);
    socket.emit("order:updateUser", {
      id,
      userId,
    });
  }
}

export default OrdersStore;
