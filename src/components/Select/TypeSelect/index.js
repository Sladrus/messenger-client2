import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import {
  Box,
  CircularProgress,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import { FormControl } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const TypeSelect = ({ type, types, isLoading, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <Box sx={{ p: '0 15px' }}>
      <FormControl variant="standard" sx={{ width: '100%' }}>
        <InputLabel shrink>Тип перевода</InputLabel>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '8px 0 0',
            height: '45px',
          }}
        >
          <CompareArrowsIcon
            sx={{ color: 'black', fontSize: '18px', p: '1px 0 5px' }}
          />
          <Select
            labelId="demo-simple-select-standard-label"
            sx={{
              textAlign: 'left',
              width: 'calc(100% - 30px)',
              fontSize: '14px',
              color: 'grey',
              m: '0px 13px',
            }}
            disabled={isLoading}
            value={type?.name}
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
                  {value ? value : 'Контрагент'}
                </Box>
              );
            }}
          >
            {types.map((item) => (
              <MenuItem key={item.value} value={item.value} sx={{}}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
};

export default TypeSelect;
