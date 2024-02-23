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
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
const CounteragentSelect = ({ counteragent, options, isLoading, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  const getStatusIcon = (status) => {
    if (status === 'CHECK')
      return <AccessTimeIcon sx={{ color: 'blue', fontSize: '18px' }} />;
    if (status === 'RECHECK')
      return <FeedbackIcon sx={{ color: 'orange', fontSize: '18px' }} />;
    if (status === 'ACTIVE')
      return <CheckBoxIcon sx={{ color: 'green', fontSize: '18px' }} />;
    if (status === 'FAIL')
      return <CloseIcon sx={{ color: 'red', fontSize: '18px' }} />;

    return <FeedbackIcon sx={{ color: 'black', fontSize: '18px' }} />;
  };

  const counteragentStatus = getStatusIcon(counteragent?.status);

  return (
    <Box sx={{ p: '0 15px' }}>
      <FormControl variant="standard" sx={{ width: '100%' }}>
        <InputLabel sx={{ mb: '12px ' }} shrink>
          Отправитель
        </InputLabel>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '8px 0 0',
            height: '45px',
          }}
        >
          {counteragentStatus}
          {options?.length > 0 ? (
            <Select
              disableUnderline
              labelId="demo-simple-select-standard-label"
              sx={{
                textAlign: 'left',
                width: 'calc(100% - 43px)',
                fontSize: '14px',
                color: 'grey',
                m: '0px 13px',
                pt: '5px',
              }}
              disabled={isLoading}
              defaultValue={'Выберите контрагента'}
              value={counteragent}
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
                console.log(value);
                return value?.name ? value?.name : 'Выберите контрагента';
              }}
            >
              {options?.map((item) => (
                <MenuItem key={item.id} value={item} sx={{ gap: '12px' }}>
                  {getStatusIcon(item?.status)}
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Box
              sx={{
                textAlign: 'left',
                fontSize: '14px',
                color: 'grey',
                m: '0px 13px',
                // pt: '5px',
              }}
            >
              <span>Нет контрагентов</span>
            </Box>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};

export default CounteragentSelect;
