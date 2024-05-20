import React, { useContext, useState, useLayoutEffect } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { StoreContext } from "../../../context/store";
import { observer } from "mobx-react-lite";
import OrderCard from "../OrderCard";
import StageOrdersList from "../StageOrdersList";

const OrdersList = observer(
  ({ stage, orders, handleOpenEdit, handleOpenOrder, setSelectedOrder }) => {
    const { ordersStore } = useContext(StoreContext);
    return (
      <Grid
        sx={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRight: "1px solid #ccc",
          borderTop: "1px solid #ccc",
          minWidth: "350px",
        }}
        item
        key={stage._id}
      >
        <OrderCard
          stage={stage}
          orders={orders}
          handleOpenEdit={handleOpenEdit}
        />
        {ordersStore.isLoading ? (
          <Box
            sx={{
              height: "calc(100% - 60px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <StageOrdersList
            orders={orders}
            handleOpenOrder={handleOpenOrder}
            setSelectedOrder={setSelectedOrder}
          />
        )}
      </Grid>
    );
  }
);

export default OrdersList;
