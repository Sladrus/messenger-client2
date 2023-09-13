import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const UserSelect = ({ user, users, isLoading, onChange, onClear }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  const handleClearClick = (event) => {
    onClear(event);
  };

  return (
    <Box sx={{ p: '0 15px' }}>
      <Select
        sx={{
          p: '0 5px',
          textAlign: 'left',
          width: '100%',
          fontSize: '14px',
          '& .MuiSelect-iconOutlined': {
            display: user?.username ? 'none' : '',
          },
        }}
        disabled={isLoading}
        value={user?.username || 'Назначить ответственного'}
        onChange={handleChange}
        size="small"
        startAdornment={
          isLoading && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CircularProgress
                sx={{
                  p: '6px',
                }}
                size={16}
              />
            </Box>
          )
        }
        endAdornment={
          <IconButton
            sx={{ display: user?.username ? '' : 'none' }}
            onClick={handleClearClick}
          >
            <ClearIcon />
          </IconButton>
        }
        renderValue={(value) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {value ? value : 'Ответственный'}
            </Box>
          );
        }}
      >
        {users?.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.username}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default UserSelect;
