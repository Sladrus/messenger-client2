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

const FilterBar = observer(() => {
  const { userStore, stageStore, conversationStore } = useContext(StoreContext);
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
