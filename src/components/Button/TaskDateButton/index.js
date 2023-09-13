import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const TaskDateButton = () => {
  return (
    <LocalizationProvider sx={{ height: '40px' }} dateAdapter={AdapterDayjs}>
      <DateTimePicker
        sx={{
          fontSize: '14px',
          p: '0 15px',
          '& .MuiInputBase-input': {
            p: '5px',
          },
          '& .MuiInputBase-formControl': {
            fontSize: '14px',
            p: '10px 10px',
          },
          '& .MuiFormLabel-root': {
            p: '0 15px ',
            fontSize: '14px',
          },
        }}
        ampm={false}
        label="Назначьте дату и время"
      />
    </LocalizationProvider>
  );
};

export default TaskDateButton;
