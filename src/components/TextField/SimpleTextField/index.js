import { Box, CircularProgress, TextField } from '@mui/material';
import React from 'react';

const SimpleTextField = ({
  placeholder,
  Icon,
  onChange,
  value,
  loading,
  error,
  errorText,
  labelText,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: '0px 15px',
        minHeight: '40px',
      }}
      variant="body2"
      color="textSecondary"
    >
      <Icon
        sx={{
          fontSize: '18px',
          color: error ? 'red' : value ? 'green' : '',
        }}
      />
      <TextField
        error={error}
        multiline
        variant="outlined"
        // placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoFocus={true}
        onFocus={(event) => {
          event.target.select();
        }}
        label={
          loading
            ? 'Загрузка'
            : error
            ? errorText
            : labelText && value
            ? labelText
            : placeholder
        }
        InputLabelProps={{
          sx: {
            // p: '6px',
            fontSize: '14px',
            textAlign: 'center',
            // '&.MuiOutlinedInput-notchedOutline': { fontSize: '14px' },
            shrink: value ? true : false,
            transform: value
              ? 'translate(-18px, -4px) scale(0.9)'
              : 'translate(13px, 20px) scale(1)',
          },
        }}
        sx={{
          p: 0,
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
