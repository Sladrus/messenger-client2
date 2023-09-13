import { Box, FormControl } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { observer } from 'mobx-react-lite';

const FilterDateButton = observer(({ handleOpen, conversationStore }) => {
  const dateRange = conversationStore.filter.dateRange;
  const formattedStartDate = dateRange?.startDate
    ? dateRange?.startDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })
    : 'Early';
  const formattedEndDate = dateRange?.endDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const handleClear = () => {
    conversationStore.setFilterDateRange({
      startDate: null,
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
        59
      ),
    });
  };

  return (
    <Box sx={{ minWidth: '200px', color: 'black', height: '45px' }}>
      <FormControl
        variant="standard"
        sx={{ minWidth: '200px', height: '45px' }}
      >
        <span
          style={{
            fontSize: '12px',
            color: '#00000099',
          }}
        >
          Дата и время
        </span>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #00000099',
          }}
        >
          <span
            onClick={handleOpen}
            style={{
              fontSize: '14px',
              padding: '4px 24px 5px 0',
              cursor: 'pointer',
            }}
          >
            {formattedStartDate} - {formattedEndDate}
          </span>
          {dateRange?.startDate && (
            <CloseIcon cursor="pointer" fontSize="12px" onClick={handleClear} />
          )}
        </Box>
      </FormControl>
    </Box>
  );
});

export default FilterDateButton;
