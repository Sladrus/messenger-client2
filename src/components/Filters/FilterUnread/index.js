import { Box, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

const FilterUnread = observer(({ conversationStore }) => {

  const handleChange = (event) => {
    conversationStore.setFilterUnread(event.target.value);
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
          Прочитанные/Непрочитанные
        </InputLabel>
        <Select
          sx={{ fontSize: '14px', width: '100%' }}
          value={conversationStore.filter.unread}
          onChange={handleChange}
          label="Прочитанные/Непрочитанные"
        >
          <MenuItem value={'all'}>Все</MenuItem>
          <MenuItem value={false}>Прочитанные</MenuItem>
          <MenuItem value={true}>Непрочитанные</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
});
export default FilterUnread;
