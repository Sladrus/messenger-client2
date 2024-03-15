import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import env from "react-dotenv";

import { observer } from "mobx-react-lite";
import { GridToolbar, gridClasses } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import axios from "axios";
import { StoreContext, stageStore, userStore } from "../../../context/store";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import styled from "@emotion/styled";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

const shortcutsItems = [
  {
    label: "Эта неделя",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Прошлая неделя",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Последние 7 дней",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Текущий месяц",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Следующий месяц",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  {
    label: "За все время",
    getValue: () => {
      const start = dayjs("1999-01-01");
      const today = dayjs();
      return [start, today];
    },
  },
];

const StripedDataGrid = styled(DataGridPro)(({ theme }) => ({
  [`& .${gridClasses.row}.tag`]: {
    backgroundColor: "#ffffff",
    fontWeight: "500",
  },
  [`& .${gridClasses.row}.user`]: {
    backgroundColor: "#ffffff",
    fontWeight: "400",
  },
  [`& .${gridClasses.row}.chat`]: {
    backgroundColor: "#ffffff",
    fontWeight: "300",
  },
}));

const TagMetrics = observer(() => {
  const { conversationStore, tagsStore, stageStore, userStore } =
    useContext(StoreContext);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tags, setTags] = useState([]);
  const [stages, setStages] = useState([]);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState({ label: "Группа", value: "group" });

  const [isLoading, setIsLoading] = useState(false);

  const [dateRange, setDateRange] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("day"),
  ]);
  useEffect(() => {
    try {
      setIsLoading(true);
      axios
        .post(`${env.SERVER_PHOTO_URL}/api/analytics/dynamic/tags`, {
          tags,
          dateRange: [
            dateRange[0].startOf("day").toDate(),
            dateRange[1].endOf("day").toDate(),
          ],
          stages,
          type,
          users,
        })
        .then((response) => {
          setRows(response.data.rows);
          setColumns(response.data.columns);
          setIsLoading(false);
          return response;
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, [tags, dateRange, stages, type, users]);
  
  function exceljsPreProcess({ workbook, worksheet }) {
    workbook.created = new Date(); // Add metadata
    worksheet.name = "Monthly Results"; // Modify worksheet name

    // Write on first line the date of creation
    worksheet.getCell("A1").value = `Values from the`;
    worksheet.getCell("A2").value = new Date();
  }

  function exceljsPostProcess({ worksheet }) {
    // Add a text after the data
    worksheet.addRow(); // Add empty row

    const newRow = worksheet.addRow();
    newRow.getCell(1).value = "Those data are for internal use only";
  }

  return (
    <Box>
      <Typography variant="title" fontWeight={400} fontSize={30}>
        Метрика по тегам
      </Typography>
      <Box sx={{ p: "10px 0 10px 0" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              textField: { size: "small" },
            }}
            calendars={2}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            localeText={{ start: "Стартовая дата", end: "Конечная дата" }}
          />
        </LocalizationProvider>
      </Box>
      <Autocomplete
        sx={{ p: "0 0 10px 0" }}
        size="small"
        getOptionLabel={(option) => option.label}
        value={type}
        options={[
          { label: "Личка", value: "private" },
          { label: "Группа", value: "group" },
        ]}
        onChange={(e, newValue) => {
          setType(newValue);
        }}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Тип" />
        )}
      />
      <Autocomplete
        sx={{ p: "0 0 10px 0" }}
        size="small"
        disableCloseOnSelect
        multiple
        getOptionLabel={(option) => option.value}
        options={tagsStore.tags || []}
        onChange={(e, newValue) => {
          setTags(newValue);
        }}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Теги" />
        )}
      />
      <Autocomplete
        disableCloseOnSelect
        multiple
        sx={{ p: "0 0 10px 0" }}
        size="small"
        getOptionLabel={(option) => option.label}
        options={
          stageStore.stages.filter((stage) => stage.type === type.value) || []
        }
        onChange={(e, newValue) => {
          setStages(newValue);
        }}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Статус" />
        )}
      />
      <Autocomplete
        disableCloseOnSelect
        multiple
        sx={{ p: "0 0 10px 0" }}
        size="small"
        getOptionLabel={(option) => option.username}
        options={userStore?.users || []}
        onChange={(e, newValue) => {
          setUsers(newValue);
        }}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Менеджеры" />
        )}
      />
      <StripedDataGrid
        excelOptions={{
          exceljsPreProcess,
          exceljsPostProcess,
        }}
        getRowClassName={(params) => {
          if (params.row.path.length === 1) return "tag";
          if (params.row.path.length === 2) return "user";
          return "chat";
        }}
        columnBuffer={30}
        columnThreshold={30}
        density="compact"
        treeData
        autoPageSize
        getTreeDataPath={(row) => row.path}
        rows={rows}
        columns={columns}
        showCellVerticalBorder={true}
        autoHeight
        slots={{
          toolbar: GridToolbar,
          loadingOverlay: LinearProgress,
        }}
        loading={isLoading}
      />
    </Box>
  );
});

export default TagMetrics;
