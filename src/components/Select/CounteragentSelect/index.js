import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Box, CircularProgress, InputLabel } from '@mui/material';
import { FormControl } from '@mui/base';

const CounteragentSelect = ({ counteragent, options, isLoading, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <Box sx={{ p: '0 15px' }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          sx={{
            textAlign: 'left',
            width: '100%',
            fontSize: '14px',
            // p: '0px 5px',
          }}
          disabled={isLoading}
          value={counteragent?.name}
          onChange={handleChange}
          size="small"
          startAdornment={
            isLoading ? (
              <Box
                sx={{
                  p: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CircularProgress size={16} />
              </Box>
            ) : (
              ''
            )
          }
          renderValue={(value) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {value ? value : 'Тип перевода'}
              </Box>
            );
          }}
        >
          {options?.map((item) => (
            <MenuItem key={item.id} value={item.name} sx={{}}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CounteragentSelect;
