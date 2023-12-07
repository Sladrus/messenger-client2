import React, { useEffect, useRef, useState } from 'react';
import { Box, FormControl, Radio, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import styled, { css } from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { observer } from 'mobx-react-lite';

const SelectContainer = styled.div`
  height: 40px;

  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SelectLabelButton = styled.span`
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  border: none;
  color: #031022;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s ease;
  &:hover {
    cursor: pointer;
  }
`;

const DropdownStyle = styled.div`
  position: absolute;
  z-index: 9999;
  top: 45px;
  left: 18px;
  max-height: 40vmax;
  // min-width: 20px;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #fafafa;
  border: 1.5px solid slategrey;
  transition: max-height 0.2s ease;
  overflow: hidden;
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;

const DropdownItem = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  align-items: center;
  width: 35px;
  // width: 90%;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
  border-radius: 0.3rem;
  cursor: pointer;
  background: #fafafa;
  ${(p) =>
    p.active &&
    css`
      color: #166edc;
      font-weight: 500;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #166edc;
    color: #fafafa;
    outline: none;
  }
`;

const InputContainer = styled.input`
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: #031022;
  text-align: right;
`;

const FormContainer = styled.form`
  display: flex;
`;

const SendSelect = observer(
  ({
    label = 'label',
    values,
    defaultValue,
    onChange,
    value,
    setValue,
    inputValue,
    setInputValue,
    onSubmit,
    checked,
    checkType,
    handleChecked,
  }) => {
    const [open, setOpen] = useState(false);
    const popupRef = useRef();
    const buttonRef = useRef();

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleChange = (value) => {
      if (onChange) onChange(value);
      handleToggle();
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        // Check if the click is outside the button as well
        setOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);

    return (
      <Box
        sx={{
          display: 'flex',
          borderRadius: '20px',
          padding: '14px',
          background: '#F3F4F6',
          gap: '24px',
        }}
      >
        <SelectContainer>
          <Radio
            sx={{ p: 0 }}
            size="small"
            checked={checked === checkType}
            onClick={() => handleChecked(checkType)}
          />
          {/* <Box
            sx={{
              width: '39px',
              height: '39px',
              backgroundColor: '#fff',
              borderRadius: '50px',
            }}
          ></Box> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Typography fontSize={'12px'} fontWeight={'400'} color={'#647081'}>
              Сумма
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'start',
              }}
              onClick={handleToggle} ref={buttonRef}
            >
              <SelectLabelButton >
                {value?.currency !== '' ? value?.currency : label}
              </SelectLabelButton>
              <KeyboardArrowDownIcon
                sx={{ cursor: 'pointer' }}
                // onClick={handleToggle}
                // ref={buttonRef}
              />
            </Box>
          </Box>
          <DropdownStyle isVisible={open} ref={popupRef}>
            {values?.map((item, index) => (
              <DropdownItem
                onClick={() => handleChange(item)}
                active={item?.currency === value?.currency}
                key={item?.currency}
              >
                {item?.currency}
              </DropdownItem>
            ))}
          </DropdownStyle>
        </SelectContainer>
        <FormContainer onSubmit={onSubmit}>
          <InputContainer
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </FormContainer>
      </Box>
    );
  }
);

export default SendSelect;
