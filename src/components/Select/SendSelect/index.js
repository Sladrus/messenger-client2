import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  Menu,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import styled, { css } from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { observer } from "mobx-react-lite";

const SelectContainer = styled.div`
  height: 40px;
  // width: 350px;
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

const InputContainer = styled.input`
  outline: none;
  border: none;
  background: transparent;
  padding: 8px;
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: #031022;
  text-align: right;
`;

const FormContainer = styled.form`
  display: flex;
  width: 100%;
`;

const SendSelect = observer(
  ({
    label = "label",
    values,
    defaultValue,
    onChange,
    inputChange,
    onFocus,
    onBlur,
    value,
    setValue,
    inputValue,
    setInputValue,
    onSubmit,
    checked,
    checkType,
    handleChecked,
    setFocused,
  }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleChange = (value) => {
      if (onChange) onChange(value);
      handleClose();
    };

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    var formatter = new Intl.NumberFormat("en-US");
    console.log(formatter.format(inputValue?.toString()?.replace(/,/g, "")));
    console.log(formatter.format(inputValue?.toString()));

    return (
      <Box sx={{ gap: "6px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography fontSize={"12px"} fontWeight={"400"} color={"#647081"}>
            Зафиксировать сумму
          </Typography>
          <Radio
            sx={{ p: 0 }}
            size="small"
            checked={checked === checkType}
            onClick={() => handleChecked(checkType)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            borderRadius: "20px",
            padding: "14px",
            background: "#F3F4F6",
          }}
        >
          <SelectContainer>
            <Box
              sx={{
                width: "28px",
                height: "28px",
                backgroundColor: "#fff",
                borderRadius: "50px",
              }}
            >
              <img src={value?.logo} alt={value?.logo} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                fontSize={"12px"}
                fontWeight={"400"}
                color={"#647081"}
              >
                Сумма
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                }}
                onClick={handleClick}
              >
                <SelectLabelButton>
                  {value?.currency !== "" ? value?.currency : label}
                </SelectLabelButton>
                <KeyboardArrowDownIcon sx={{ cursor: "pointer" }} />
              </Box>
            </Box>
            <Menu
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              PaperProps={{
                style: {
                  maxHeight: 45 * 4.5,
                  width: "20ch",
                },
              }}
            >
              {values?.map((item) => (
                <MenuItem
                  key={item?.currency}
                  selected={item?.currency === value?.currency}
                  onClick={() => handleChange(item)}
                >
                  {item?.currency}
                </MenuItem>
              ))}
            </Menu>

            {/* <DropdownStyle isVisible={open} >
            {values?.map((item, index) => (
              <DropdownItem
                onClick={() => handleChange(item)}
                active={item?.currency === value?.currency}
                key={item?.currency}
              >
                {item?.currency}
              </DropdownItem>
            ))}
          </DropdownStyle> */}
          </SelectContainer>
          <FormContainer onSubmit={(e) => e.preventDefault()}>
            <InputContainer
              value={formatter.format(
                inputValue?.toString()?.replace(/,/g, "")
              )}
              onSubmit={(e) => e.preventDefault()}
              onChange={(e) => {
                e.preventDefault();
                inputChange();
                setInputValue(e.target.value);
              }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </FormContainer>
        </Box>
      </Box>
    );
  }
);

export default SendSelect;
