import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

const FilterType = observer(({ conversationStore }) => {
  const handleChange = (event) => {
    conversationStore.setFilterType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: '200px', color: 'black', height: '45px' }}>
      <FormControl
        variant="standard"
        sx={{ minWidth: '200px', height: '45px' }}
      >
        <InputLabel
          sx={{ fontSize: '14px' }}
          id="demo-simple-select-standard-label"
        >
          Тип
        </InputLabel>

        <Select
          sx={{ fontSize: '14px', width: '100%' }}
          value={conversationStore.filter.type}
          onChange={handleChange}
          label="Тип"
        >
          <MenuItem value={'all'}>Все чаты</MenuItem>
          <MenuItem value={'private'}>Личные</MenuItem>
          <MenuItem value={'group'}>Группы</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
});

export default FilterType;
