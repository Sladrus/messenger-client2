import { makeAutoObservable, action } from "mobx";

class OrdersStore {
  constructor() {
    this.filter = {
      responsible: "all",
      type: "all",
      unread: "all",
      stage: "all",
      tags: [],
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
    this.filter.responsible = value;
  }

  setFilterStage(value) {
    this.filter.stage = value;
  }

  setFilterTags(value) {
    this.filter.tags = value;
  }

  async getOrderStages(socket) {
    this.setLoading(true);
    socket.emit("orders:get", { filter: this.filter });
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
    console.log(chat_id);
    if (chat_id === 0) {
      this.setFullStages(this.orders);
    } else {
      this.filteredOrders = this.orders?.filter((order) => {
        console.log(order);
        return order?.conversation?.chat_id === chat_id;
      });
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
