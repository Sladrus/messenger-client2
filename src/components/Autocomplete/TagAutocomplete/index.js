import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import TagIcon from '@mui/icons-material/Tag';

const TagAutocompelte = ({ tags, convTags, onChange, isLoading }) => {
  function filterOptions(options, { inputValue }) {

    return tags
      ? options?.filter((option) => {
          for (const tag of tags) {
            if (tag._id === option._id) return false;
          }
          if (option.value.toLowerCase().includes(inputValue.toLowerCase()))
            return true;
          return false;
        })
      : [];
  }

  return (
    <Autocomplete
      freeSolo
      onChange={onChange}
      sx={{ p: '0px 15px' }}
      multiple
      limitTags={2}
      size={'small'}
      id="multiple-limit-tags"
      value={tags || []}
      options={convTags || []}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.value}
      renderInput={(params) => (
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
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
            <TagIcon sx={{ fontSize: '18px' }} />
          )}
          <TextField
            {...params}
            variant="outlined"
            placeholder="Введите тег"
            sx={{
              border: 'none',
              '& fieldset': { border: 'none' },
              '& input::placeholder': {
                fontSize: '14px',
              },
            }}
            onKeyDown={(event) => {
              if (event.key === 'Backspace') {
                event.stopPropagation();
              }
            }}
          />
        </Box>
      )}
    />
  );
};

export default TagAutocompelte;
