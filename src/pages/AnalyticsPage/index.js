import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import GeneralMetrics from '../../components/Analytics/GeneralMetrics';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import TagMetrics from '../../components/Analytics/TagMetrics';

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
      const today = dayjs();
      const start = dayjs('1999-01-01');
      return [start, today];
    },
  },
];

const AnalyticsPage = observer(() => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  return (
    <Box sx={{ flexGrow: 1, width: { marginLeft: `65px`, marginTop: `65px` } }}>
      <Stack spacing={2} sx={{ p: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              actionBar: { actions: [] },
            }}
            calendars={2}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            localeText={{ start: 'Стартовая дата', end: 'Конечная дата' }}
          />
        </LocalizationProvider>

        <GeneralMetrics dateRange={dateRange} />
        <TagMetrics dateRange={dateRange} />
      </Stack>
    </Box>
  );
});

export default AnalyticsPage;
