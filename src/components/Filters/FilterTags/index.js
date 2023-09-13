import Autocomplete from '@mui/material/Autocomplete';
import React from 'react';
import { TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

const FilterTags = observer(({ tags, conversationStore }) => {
  const handleChange = (event, newValue) => {
    console.log(newValue);
    conversationStore.setFilterTags(newValue);
  };

  return (
    <Autocomplete
      multiple
      sx={{ minWidth: '200px', height: '45px' }}
      size="small"
      limitTags={1}
      options={tags}
      onChange={handleChange}
      getOptionLabel={(option) => option.value}
      value={conversationStore.filter.tags}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Теги"
          placeholder="Выберите теги"
          autoComplete="on"
          sx={{
            border: 'none',
            '& fieldset': { border: 'none' },
            '& input::placeholder': {
              fontSize: '12px',
            },
            '& label': {
              fontSize: '14px',
            },
          }}
          required
        />
      )}
    />
  );
});

export default FilterTags;
