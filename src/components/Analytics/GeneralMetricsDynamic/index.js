import React, { useContext, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import env from 'react-dotenv';

import { observer } from 'mobx-react-lite';
import { GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import axios from 'axios';
import { StoreContext } from '../../../context/store';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

const tz = 'Europe/Moscow';

const shortcutsItems = [
  {
    label: 'Эта неделя',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Прошлая неделя',
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, 'day');
      return [prevWeek.startOf('week'), prevWeek.endOf('week')];
    },
  },
  {
    label: 'Последние 7 дней',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'Текущий месяц',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'Следующий месяц',
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf('month').add(1, 'day');
      return [startOfNextMonth, startOfNextMonth.endOf('month')];
    },
  },
  {
    label: 'За все время',
    getValue: () => {
      const start = dayjs('1999-01-01');
      const today = dayjs();
      return [start, today];
    },
  },
];

const GeneralMetricsDynamic = observer(() => {
  const { conversationStore } = useContext(StoreContext);

  const [dateRange, setDateRange] = useState([
    dayjs('1999-01-01'),
    dayjs().endOf('day'),
  ]);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState({ label: 'Группа', value: 'group' });

  useEffect(() => {
    try {
      setIsLoading(true);
      console.log(dateRange);

      axios
        .post(`${env.SERVER_PHOTO_URL}/api/analytics/dynamic/users`, {
          dateRange: [
            dateRange[0].startOf('day').toDate(),
            dateRange[1].endOf('day').toDate(),
          ],
          type,
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
  }, [dateRange, type]);
  // console.log(rows);
  // console.log(columns);

  return (
    <Box>
      <Typography variant="title" fontWeight={400} fontSize={30}>
        Основной отчет (по входу в чат)
      </Typography>
      <Box sx={{ p: '10px 0 10px 0' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              textField: { size: 'small' },
            }}
            calendars={2}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            localeText={{ start: 'Стартовая дата', end: 'Конечная дата' }}
          />
        </LocalizationProvider>
      </Box>
      <Autocomplete
        sx={{ p: '0 0 10px 0' }}
        size="small"
        getOptionLabel={(option) => option.label}
        value={type}
        options={[
          { label: 'Личка', value: 'private' },
          { label: 'Группа', value: 'group' },
        ]}
        onChange={(e, newValue) => {
          setType(newValue);
        }}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Тип" />
        )}
      />
      <DataGridPro
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

export default GeneralMetricsDynamic;
