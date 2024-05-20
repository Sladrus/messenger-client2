import { makeAutoObservable, action } from "mobx";

class OrdersStore {
  constructor() {
    this.isLoading = false;
    this.orderStages = null;
    this.orders = null;
    this.filteredOrders = null;
    this.fullStages = {};
    makeAutoObservable(this, {
      setLoading: action,
      setOrderStages: action,
    });
  }

  setLoading(value) {
    this.isLoading = value;
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
        (order) => order?.conversation?.chat_id === chat_id
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
    this.setFullStages(this.orders);
  }
}

export default OrdersStore;
