import { Box, TextField } from '@mui/material';
import React from 'react';

const SimpleTextField = ({ placeholder, Icon, onChange, value }) => {
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
      <Icon sx={{ fontSize: '18px' }} />
      <TextField
        variant="outlined"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        sx={{
          width: '100%',
          border: 'none',
          '& fieldset': { border: 'none' },
          '& input::placeholder': {
            fontSize: '14px',
          },
        }}
      />
    </Box>
  );
};

export default SimpleTextField;
