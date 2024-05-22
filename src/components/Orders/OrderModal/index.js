import { Box, Card, Modal, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { StoreContext } from "../../../context/store";
import { SocketContext } from "../../../context/socket";
import OrderConversationDialog from "../OrderConversationDialog";
import OrderStatusSelect from "../OrderStatusSelect";
import OrderUserSelect from "../OrderUserSelect";

const types = [
  { name: "Перевод физ лицу ", value: "physical" },
  { name: "Перевод юр лицу ", value: "company" },
  { name: "Прием из-за рубежа ", value: "from_abroad" },
  { name: "Выдача наличных ", value: "cash" },
  { name: "Обмен криптовалюты ", value: "exchange" },
];

const style = {
  position: "absolute",
  //   width: "90%",
  //   height: '80%',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

const OrderModal = observer(({ show, handleClose }) => {
  const { socket } = useContext(SocketContext);
  const { ordersStore, userStore } = useContext(StoreContext);

  const changeStage = (e) => {
    console.log(ordersStore?.selectedOrder);

    ordersStore.changeStage(
      socket,
      ordersStore?.selectedOrder?._id,
      e?.target?.value
    );
  };

  const changeUser = (e) => {
    ordersStore.changeUser(
      socket,
      ordersStore?.selectedOrder?._id,
      e?.target?.value
    );
  };

  const clearUser = (e) => {
    ordersStore.changeUser(socket, ordersStore?.selectedOrder?._id, null);
  };

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ p: 0 }}>
            <Box sx={{ p: 0, ":last-child": { p: 0 } }}>
              {ordersStore?.selectedOrder && (
                <Box sx={{ display: "flex" }}>
                  <Card sx={{ minWidth: "300px" }}>
                    <Box sx={{ borderBottom: "1px solid #ccc" }}>
                      <Box
                        sx={{
                          textAlign: "left",
                          color: "black",
                          height: "44px",
                          p: "10px 16px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box>
                              <Typography
                                whiteSpace={"nowrap"}
                                textOverflow={"ellipsis"}
                                variant="subtitle2"
                                fontWeight="bold"
                              >
                                Заявка: {ordersStore?.selectedOrder?.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {
                                  types?.find(
                                    (item) =>
                                      item.value ===
                                      ordersStore?.selectedOrder?.type
                                  )?.name
                                }
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ p: "0 10px" }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                            ></Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        p: "10px 16px",
                        gap: "2px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Статус заявки
                        </Typography>
                        <OrderStatusSelect
                          stage={ordersStore?.selectedOrder?.stage}
                          stages={ordersStore?.orderStages}
                          isLoading={ordersStore.stageLoading}
                          onChange={changeStage}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Ответственный по заявке
                        </Typography>
                        <OrderUserSelect
                          user={ordersStore?.selectedOrder?.responsible}
                          users={userStore?.users}
                          isLoading={ordersStore.userLoading}
                          onChange={changeUser}
                          onClear={clearUser}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Отдают
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.from || "-"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Получают
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.to || "-"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Объем
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.amount || "-"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Условия
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.conditions || "-"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Дата
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.date || "-"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Регулярность
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.regularity || "-"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Реквизиты
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.requisites || "-"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Комментарий
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ordersStore?.selectedOrder?.conditions || "-"}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                  <Box sx={{ minWidth: "800px" }}>
                    <OrderConversationDialog />
                  </Box>
                </Box>
              )}
            </Box>
          </Card>
        </Box>
      </Modal>
    </>
  );
});

export default OrderModal;
