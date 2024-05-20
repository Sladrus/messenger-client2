import { Box, Stack, Typography } from "@mui/material";
import React, { useRef, useEffect, useContext } from "react";
import { AutoSizer, List } from "react-virtualized";
import StageOrderCard from "../StageOrderCard";
import { StoreContext } from "../../../context/store";

const StageOrdersList = ({ orders, handleOpenOrder, setSelectedOrder }) => {
  const { conversationStore } = useContext(StoreContext);
  const listRef = useRef(null);

  const filteredOrders = orders?.reverse();
  console.log(filteredOrders);

  return (
    <Box sx={{ height: "calc(100% - 59px)", overflow: "auto" }}>
      {filteredOrders?.length > 0 ? (
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              height={height}
              rowCount={filteredOrders?.length}
              rowHeight={130}
              rowRenderer={({ key, index, style }) => {
                const order = filteredOrders[index];
                return (
                  <div
                    key={key}
                    style={style}
                    onClick={() => {
                      conversationStore?.setSelectedChatId(
                        order?.conversation?.chat_id
                      );
                      handleOpenOrder(order);
                    }}
                  >
                    <StageOrderCard order={order} />
                  </div>
                );
              }}
              width={width}
              // onScroll={saveScrollPosition} // Save scroll position while scrolling
              // onMount={restoreScrollPosition} // Restore scroll position when the component mounts
            />
          )}
        </AutoSizer>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="body2"
          color="textSecondary"
        >
          Заявки отсутствуют
        </Typography>
      )}
    </Box>
  );
};

export default StageOrdersList;
