import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const StatusSelect = ({ type, stage, stages, isLoading, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <Box sx={{ p: '0 15px' }}>
      <Select
        sx={{
          textAlign: 'left',
          width: '100%',
          fontSize: '14px',
          p: '0px 5px',
        }}
        disabled={isLoading}
        value={stage?.label}
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
            <BookmarkIcon
              sx={{ fontSize: '18px', p: '5px', color: stage?.color }}
            />
          )
        }
        renderValue={(value) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {value ? value : 'Ответственный'}
            </Box>
          );
        }}
      >
        {stages
          ?.filter((item) =>
            type === 'private'
              ? item.type === 'private' || item.type === 'all'
              : item.type !== 'private' || item.type === 'all'
          )
          .map((item) => (
            <MenuItem key={item._id} value={item._id} sx={{ p: '5px' }}>
              <BookmarkIcon
                sx={{ fontSize: '18px', p: '5px', color: item?.color }}
              />
              {item.label}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
};

export default StatusSelect;
