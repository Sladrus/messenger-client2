import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import FilterUnread from "../Filters/FilterUnread";
import FilterUser from "../Filters/FilterUser";
import { StoreContext, tagsStore } from "../../context/store";
import { observer } from "mobx-react-lite";
import FilterStage from "../Filters/FilterStage";
import FilterTask from "../Filters/FilterTask";
import FilterTags from "../Filters/FilterTags";
import FilterDate from "../Filters/FilterDate";
import FilterDateButton from "../Filters/FilterDateButton";
import FilterType from "../Filters/FilterType";
import { useLocation } from "react-router-dom";
import OrderFilterType from "../Orders/OrderFilterType";
import OrderFilterUnread from "../Orders/OrderFilterUnread";
import OrderFilterUser from "../Orders/OrderFilterUser";
import OrderFilterStage from "../Orders/OrderFilterStage";
import OrderFilterTags from "../Orders/OrderFilterTags";
import OrderFilterDateButton from "../Orders/OrderFilterDateButton";
import OrderFilterDate from "../Orders/OrderFilterDate";

const FilterBar = observer(() => {
  const { userStore, stageStore, conversationStore, ordersStore } =
    useContext(StoreContext);
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (location?.pathname === "/orders")
    return (
      <Box sx={{ ml: "64px" }}>
        <AppBar
          sx={{
            left: "64px",
            position: "fixed",
            height: "64px",
            width: "100%",
            background: "white",
            boxShadow: "none",
            color: "black",
            overflow: "auto", // Измените на overflow: auto
          }}
        >
          <Toolbar>
            <Stack direction="row" spacing={2} sx={{ height: "45px" }}>
              <OrderFilterType ordersStore={ordersStore} />
              {/* <OrderFilterUnread ordersStore={ordersStore} /> */}
              <OrderFilterUser users={userStore.users} ordersStore={ordersStore} />
              <OrderFilterStage
                stages={ordersStore.orderStages}
                ordersStore={ordersStore}
              />
              {/* <OrderFilterTags tags={tagsStore.tags} ordersStore={ordersStore} /> */}
              <OrderFilterDateButton
                handleOpen={handleOpen}
                ordersStore={ordersStore}
              />
            </Stack>
          </Toolbar>
        </AppBar>
        <OrderFilterDate
          show={open}
          handleClose={handleClose}
          ordersStore={ordersStore}
        />
      </Box>
    );
  else
    return (
      <Box sx={{ ml: "64px" }}>
        <AppBar
          sx={{
            left: "64px",
            position: "fixed",
            height: "64px",
            width: "100%",
            background: "white",
            boxShadow: "none",
            color: "black",
            overflow: "auto", // Измените на overflow: auto
          }}
        >
          <Toolbar>
            <Stack direction="row" spacing={2} sx={{ height: "45px" }}>
              <FilterType conversationStore={conversationStore} />
              <FilterUnread conversationStore={conversationStore} />
              <FilterUser
                users={userStore.users}
                conversationStore={conversationStore}
              />
              <FilterStage
                stages={stageStore.stages}
                conversationStore={conversationStore}
              />
              <FilterTags
                tags={tagsStore.tags}
                conversationStore={conversationStore}
              />
              <FilterTask conversationStore={conversationStore} />
              <FilterDateButton
                handleOpen={handleOpen}
                conversationStore={conversationStore}
              />
            </Stack>
          </Toolbar>
        </AppBar>
        <FilterDate
          show={open}
          handleClose={handleClose}
          conversationStore={conversationStore}
        />
      </Box>
    );
});

export default FilterBar;
