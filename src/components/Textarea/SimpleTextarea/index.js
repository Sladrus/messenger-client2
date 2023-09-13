import { Textarea } from '@mui/joy';
import { Box } from '@mui/material';
import React from 'react';

const SimpleTextarea = ({ placeholder }) => {
  return (
    <Box sx={{ p: '0 15px' }}>
      <Textarea
        sx={{
          minHeight: '50px',
          p: '12px 15px',

          '& input::placeholder': {},
        }}
        placeholder={placeholder}
        size="sm"
        minRows={1}
        variant="outlined"
      />
    </Box>
  );
};

export default SimpleTextarea;
