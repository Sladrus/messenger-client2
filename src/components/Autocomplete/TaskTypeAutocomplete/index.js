import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';

const TaskTypeAutocomplete = ({ types, onChange, isLoading, value }) => {
  // const [value, setValue] = useState({ title: '' });

  // const handleChange = (e, value, reason, details) => {
  //   if (reason === 'createOption') {
  //     setValue({ title: details.option });
  //   }
  //   onChange(e, value, reason, details);
  // };

  return (
    <Autocomplete
      sx={{
        p: '0px 15px',
      }}
      freeSolo
      onChange={onChange}
      size={'small'}
      value={value}
      options={types}
      getOptionLabel={(option) => option.title || ''}
      renderInput={(params) => (
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
          variant="body2"
          color="textSecondary"
        >
          <TextField
            {...params}
            variant="outlined"
            placeholder="Выберите тип задачи"
            sx={{
              height: '40px',
              border: 'none',
              '& input::placeholder': {
                fontSize: '14px',
              },
            }}
          />
        </Box>
      )}
    />
  );
};

export default TaskTypeAutocomplete;
