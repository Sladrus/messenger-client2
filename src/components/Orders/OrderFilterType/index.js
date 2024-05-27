import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";

const types = [
  { name: "Перевод физ лицу ", value: "physical" },
  { name: "Перевод юр лицу ", value: "company" },
  { name: "Прием из-за рубежа ", value: "from_abroad" },
  { name: "Выдача наличных ", value: "cash" },
  { name: "Обмен криптовалюты ", value: "exchange" },
];

const OrderFilterType = observer(({ ordersStore }) => {
  const handleChange = (event) => {
    ordersStore.setFilterType(event.target.value);
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
          Тип
        </InputLabel>

        <Select
          sx={{ fontSize: "14px", width: "100%" }}
          value={ordersStore.filter.type}
          onChange={handleChange}
          label="Тип"
        >
          <MenuItem value={"all"}>Все завки</MenuItem>
          <MenuItem value={"physical"}>Перевод физ лицу</MenuItem>
          <MenuItem value={"company"}>Перевод юр лицу</MenuItem>
          <MenuItem value={"from_abroad"}>Прием из-за рубежа</MenuItem>
          <MenuItem value={"cash"}>Выдача наличных</MenuItem>
          <MenuItem value={"exchange"}>Обмен криптовалюты </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
});

export default OrderFilterType;
