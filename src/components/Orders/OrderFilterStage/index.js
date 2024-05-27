import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

const OrderFilterStage = observer(({ stages, ordersStore }) => {
  const handleChange = (event) => {
    ordersStore.setFilterStage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "200px", color: "black", height: "45px" }}>
      <FormControl
        variant="standard"
        sx={{ minWidth: "200px", height: "45px" }}
      >
        <InputLabel
          sx={{ fontSize: "14px" }}
          id="demo-simple-select-standard-label"
        >
          Статус
        </InputLabel>

        <Select
          sx={{ fontSize: "14px", width: "100%" }}
          value={ordersStore.filter.stage}
          onChange={handleChange}
          label="Статус"
        >
          <MenuItem value={"all"}>Все статусы</MenuItem>
          {stages?.map((stage) => {
            return (
              <MenuItem key={stage._id} value={stage._id}>
                {stage.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
});

export default OrderFilterStage;
