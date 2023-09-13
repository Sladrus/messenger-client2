import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

const FilterUser = observer(({ users, conversationStore }) => {
  const handleChange = (event) => {
    conversationStore.setFilterUser(event.target.value);
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
          Ответственный
        </InputLabel>

        <Select
          sx={{ fontSize: '14px', width: '100%' }}
          value={conversationStore.filter.user}
          onChange={handleChange}
          label="Ответственный"
        >
          <MenuItem value={'all'}>Все менеджеры</MenuItem>
          <MenuItem value={'nobody'}>Нет менеджера</MenuItem>
          {users?.map((user) => {
            return (
              <MenuItem key={user._id} value={user._id}>
                {user.username}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
});

export default FilterUser;
