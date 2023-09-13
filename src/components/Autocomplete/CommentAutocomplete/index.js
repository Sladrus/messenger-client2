import { Box, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';

const CommentAutocomplete = ({ isLoading, onSubmit }) => {
  const [value, setValue] = useState('');
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: '0px 15px',
        height: '40px',
      }}
      variant="body2"
      color="textSecondary"
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            sx={{
              p: '1px',
            }}
            size={16}
          />
        </Box>
      ) : (
        <CommentIcon sx={{ fontSize: '18px' }} />
      )}
      <form
        onSubmit={(e) => {
          onSubmit(e, value);
          setValue('');
        }}
        type="submit"
      >
        <TextField
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          variant="outlined"
          placeholder="Введите комментарий"
          sx={{
            width: '100%',
            border: 'none',
            '& fieldset': { border: 'none' },
            '& input::placeholder': {
              fontSize: '14px',
            },
          }}
        />
      </form>
    </Box>
  );
};

export default CommentAutocomplete;
