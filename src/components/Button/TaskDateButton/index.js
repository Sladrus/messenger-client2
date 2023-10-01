import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const TaskDateButton = ({ disabled, onChange }) => {
  return (
    <LocalizationProvider sx={{ height: '40px' }} dateAdapter={AdapterDayjs}>
      <DateTimePicker
        disabled={disabled}
        ampm={false}
        label="Назначьте дату и время"
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default TaskDateButton;
