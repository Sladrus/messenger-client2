import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, FormControl, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import styled, { css } from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const SelectContainer = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const SelectLabelButton = styled.span`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  border: none;
  color: #031022;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s ease;
  &:hover {
    // cursor: pointer;
  }
`;

const SendMethodSelect = ({
  label,
  values,
  defaultValue,
  onChange,
  value,
  setValue,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleValueChange = (value) => {
    setValue(value);
    setAnchorEl(null);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '20px',
        padding: '14px',
        background: '#F3F4F6',
      }}
    >
      <SelectContainer>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
          }}
          onClick={handleClick}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: '28px',
                height: '28px',
                backgroundColor: '#fff',
                borderRadius: '50px',
              }}
              src={value?.logo}
              alt={value?.logo}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              textAlign: 'left',
            }}
          >
            <Typography fontSize={'12px'} fontWeight={'400'} color={'#647081'}>
              {label}
            </Typography>
            <SelectLabelButton>{value?.name}</SelectLabelButton>
          </Box>
        </Box>

        {values?.length > 1 && (
          <KeyboardArrowDownIcon
            sx={{ cursor: 'pointer' }}
            onClick={handleClick}
          />
        )}

        <Menu
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {values?.map((item) => (
            <MenuItem
              key={item?.code}
              selected={item === value?.name}
              onClick={() => handleValueChange(item)}
            >
              {item?.name}
            </MenuItem>
          ))}
        </Menu>

        {/* <DropdownStyle isVisible={open} ref={popupRef}>
          {values?.map((item, index) => (
            <DropdownItem
              onClick={() => handleChange(item)}
              active={item === value?.name}
              key={item?.code}
            >
              {item?.name}
            </DropdownItem>
          ))}
        </DropdownStyle> */}
      </SelectContainer>
      {/* <InputContainer /> */}
    </Box>
  );
};

export default SendMethodSelect;
