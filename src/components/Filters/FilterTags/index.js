import Autocomplete from '@mui/material/Autocomplete';
import React, { useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';

const FilterTags = observer(({ tags, conversationStore }) => {
  const { socket } = useContext(SocketContext);
  const { tagsStore } = useContext(StoreContext);

  const handleChange = (event, newValue) => {
    conversationStore.setFilterTags(newValue);
  };

  const handleButtonClick = (e, option) => {
    e.stopPropagation();
    tagsStore.setLoading(true);
    conversationStore.removeTag(socket, option._id);
  };
  console.log(tagsStore.isLoading);
  return (
    <Autocomplete
      disabled={tagsStore.isLoading}
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
          disabled={tagsStore.isLoading}
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
      renderOption={(props, option, state) => (
        <Box {...props}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {option.value}
            <CloseIcon
              sx={{ fontSize: '18px', textAlign: 'right' }}
              onClick={(e) => handleButtonClick(e, option)}
            />
          </Box>
        </Box>
      )}
    />
  );
});

export default FilterTags;
