import React, { useContext } from "react";
import "./OrdersPage.css";
import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../context/store";
import StageList from "../../components/Stage/StageList";
import { styled } from "@mui/material/styles";
import EmptyStageList from "../../components/Stage/EmptyStageList";
import CreateStageModal from "../../components/Stage/CreateStageModal";
import EditStageModal from "../../components/Stage/EditStageModal";
import OrdersList from "../../components/Orders/OrdersList";
import ConversationList from "../../components/Conversation/ConversationList";
import OrderModal from "../../components/Orders/OrderModal";
import CreateOrderStageModal from "../../components/Orders/CreateOrderStageModal";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(0),
  height: "calc(100% - 66px)",
  textAlign: "left",
}));

const OrdersPage = observer(() => {
  const { ordersStore } = useContext(StoreContext);
  const filteredStages = ordersStore.orderStages;
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);

  const [selectedStage, setSelectedStage] = React.useState("");

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenEdit = (value) => {
    setSelectedStage(value);
    setOpenEdit(true);
  };

  const handleOpenOrder = (value) => {
    ordersStore.setSelectedOrder(value);
    setOpenOrder(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseOrder = () => setOpenOrder(false);

  return (
    <Item>
      <Box
        sx={{
          display: "flex",
          width: { marginLeft: `65px`, marginTop: `65px`, height: "100%" },
          overflow: "hidden",
        }}
      >
        <Box sx={{ minWidth: "300px", borderTop: "1px solid #ccc" }}>
          <ConversationList isOrderFilter={true} />
        </Box>
        <Box
          container
          component="main"
          sx={{
            borderLeft: "1px solid #ccc",
            overflow: "scroll",
            position: "relative",
            flexWrap: "nowrap",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {filteredStages?.map((stage) => {
            return (
              <OrdersList
                key={stage._id}
                stage={stage}
                orders={ordersStore?.fullStages[stage.value]}
                handleOpenEdit={handleOpenEdit}
                handleOpenOrder={handleOpenOrder}
                setSelectedOrder={ordersStore.setSelectedOrder}
              />
            );
          })}
          <EmptyStageList handleOpen={handleOpenCreate} />
        </Box>
      </Box>
      <CreateOrderStageModal
        show={openCreate}
        handleClose={handleCloseCreate}
      />
      <EditStageModal
        show={openEdit}
        handleClose={handleCloseEdit}
        selectedStage={selectedStage}
      />
      <OrderModal show={openOrder} handleClose={handleCloseOrder} />
    </Item>
  );
});

export default OrdersPage;
