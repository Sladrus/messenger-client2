import { Box } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';

const TaskButton = ({ text, Icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '0px 15px',
        height: '40px',
      }}
      variant="body2"
      color="textSecondary"
    >
      <Button
        type="submit"
        startIcon={<Icon sx={{ fontSize: '18px' }} />}
        size="small"
        variant="contained"
        sx={{
          width: '100%',
          border: 'none',
          fontSize: '14px',
        }}
      >
        {text}
      </Button>
    </Box>
  );
};

export default TaskButton;
