import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

const FilterTask = observer(({ conversationStore }) => {
  const handleChange = (event) => {
    conversationStore.setFilterTask(event.target.value);
  };

  return (
    <Box sx={{ minWidth: '200px', color: 'black' }}>
      <FormControl variant="standard" sx={{ minWidth: '200px' }}>
        <InputLabel
          sx={{ fontSize: '14px' }}
          id="demo-simple-select-standard-label"
        >
          Задачи
        </InputLabel>
        <Select
          sx={{ fontSize: '14px', width: '100%' }}
          value={conversationStore.filter.task}
          onChange={handleChange}
          label="Задачи"
        >
          <MenuItem value={'all'}>Все задачи</MenuItem>
          <MenuItem value={'nobody'}>Без задачи</MenuItem>
          <MenuItem value={'tomorrow'}>Завтра</MenuItem>
          <MenuItem value={'today'}>Сегодня</MenuItem>
          <MenuItem value={'late'}>Просроченная</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
});

export default FilterTask;
