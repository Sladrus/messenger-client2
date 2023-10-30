import React, { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Card,
  Chip,
  CircularProgress,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import env from 'react-dotenv';
import { StoreContext } from '../../../context/store';

const CustomizedAccordion = styled(Accordion)`
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
`;

const ConversationCourse = observer(() => {
  const { conversationStore } = useContext(StoreContext);

  const [ways, setWays] = useState([]);
  const [fromValues, setFromValues] = useState([]);
  const PERCENT_STEP = 0.1;
  const inputRef = useRef();
  const finalAmountRef = useRef();
  const [amount, setAmount] = useState(0);
  const [toCity, setToCity] = useState({});
  const [fromCity, setFromCity] = useState({});

  const [finalAmount, setFinalAmount] = useState(0);
  const [percentage, setPercentage] = useState();
  const [difPercentage, setDifPercentage] = useState(0);
  const [selectedFromWay, setSelectedFromWay] = useState(null);
  const [selectedWay, setSelectedWay] = useState(null);
  const [isAmountUpdating, setIsAmountUpdating] = useState(false);
  const [isFinalAmountUpdating, setIsFinalAmountUpdating] = useState(false);
  const [isDifUpdating, setIsDifUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        'https://api.moneyport.world/messenger/calculator'
      );
      setWays(response.data);
      setFromValues(
        Array.from(new Set(response.data.map((item) => item.from)))
      );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  console.log(selectedWay);

  useEffect(() => {
    fetchData().catch((error) => console.log(error));
  }, [conversationStore.selectedConversation]);

  const calculateConvertedAmount = (percent) => {
    if (!selectedWay) return 0;

    const toCourse =
      selectedWay.to_course === '1'
        ? parseFloat(selectedWay.to_course / selectedWay.from_course)
        : parseFloat(selectedWay.to_course);

    if (isNaN(toCourse)) return 0;

    let convertedAmount = toCourse;

    if (!isNaN(percent)) {
      convertedAmount +=
        (convertedAmount * (parseFloat(percent) * -1 || 0)) / 100;
    }

    if (toCity?.city) {
      convertedAmount +=
        (convertedAmount * (parseFloat(toCity?.commission) || 0)) / 100;
    }

    if (fromCity?.city) {
      convertedAmount +=
        (convertedAmount * (parseFloat(fromCity?.commission) || 0)) / 100;
    }

    if (isNaN(convertedAmount)) return 0;

    return convertedAmount;
  };

  const calculateStockPercentage = (stock, client) => {
    const difference = Math.abs(client - stock);
    const percentageDifference = (difference / stock) * 100;
    return percentageDifference.toFixed(2);
  };

  useEffect(() => {
    if (Number.isNaN(finalAmount)) return;

    if (finalAmount !== 0 && !isFinalAmountUpdating && !isDifUpdating) {
      const calculatedAmount = parseFloat(
        finalAmount / calculateConvertedAmount(difPercentage)
      );
      if (amount !== calculatedAmount.toFixed(0)) {
        setAmount(calculatedAmount);
      }
    }
  }, [finalAmount, difPercentage]);

  useEffect(() => {
    if (Number.isNaN(amount)) return;

    if (amount !== 0 && !isAmountUpdating && !isDifUpdating) {
      const calculatedFinalAmount = parseFloat(
        calculateConvertedAmount(difPercentage) * amount
      );
      if (finalAmount !== calculatedFinalAmount.toFixed(0)) {
        setFinalAmount(calculatedFinalAmount);
      }
    }
  }, [amount, difPercentage]);

  useEffect(() => {
    const newFinalAmount = parseFloat(
      calculateConvertedAmount(difPercentage) * amount
    );
    setFinalAmount(newFinalAmount);

    if (isNaN(newFinalAmount / calculateConvertedAmount(difPercentage))) {
      setAmount(0);
    } else {
      const newAmount = parseFloat(
        newFinalAmount / calculateConvertedAmount(difPercentage)
      );
      setAmount(newAmount);
    }
  }, [difPercentage, toCity, fromCity]);

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion defaultExpanded>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: '0px 15px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="subtitle2"
            fontWeight="bold"
          >
            <>Калькулятор курса</>
            {isLoading && (
              <Box
                sx={{
                  pl: '10px',
                }}
              >
                <CircularProgress size={14} />
              </Box>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0 }}>
          <Stack spacing={1} sx={{ p: '10px 0' }}>
            <Box sx={{ display: 'flex', p: '0 15px' }}>
              <TextField
                disabled={isLoading}
                sx={{ width: '100%' }}
                size="small"
                label="Сумма отдачи"
                value={amount}
                onChange={(e) => {
                  setIsAmountUpdating(true);
                  setAmount(e.target.value);
                  setIsAmountUpdating(false);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {amount <
                        parseFloat(
                          selectedWay?.amount_bellow_commission?.from?.bellow
                        ) && amount > 0
                        ? '+' +
                          (
                            parseFloat(
                              selectedWay?.amount_bellow_commission?.from
                                ?.commission
                            ) + parseFloat(selectedWay?.pp_commission || 0)
                          ).toFixed(2)
                        : selectedWay?.pp_commission
                        ? '+' +
                          parseFloat(selectedWay?.pp_commission || 0).toFixed(2)
                        : ''}{' '}
                      {selectedWay?.from_symbol}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', p: '0 15px' }}>
              <Autocomplete
                disabled={isLoading}
                sx={{ width: '100%' }}
                size="small"
                options={fromValues}
                getOptionLabel={(option) => option}
                value={selectedFromWay}
                onChange={(e, newValue) => {
                  setSelectedFromWay(newValue);
                  setSelectedWay();
                  setPercentage(0);
                  setDifPercentage(0);
                  setAmount(0);
                  setFinalAmount(0);
                  setToCity({});
                  setFromCity({});
                  inputRef.current.value = 0;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={isLoading}
                    label="Способ отдачи"
                  />
                )}
              />
            </Box>
            {selectedWay?.citis?.from?.length > 0 && (
              <Box sx={{ display: 'flex', p: '0 15px' }}>
                <Autocomplete
                  disabled={isLoading}
                  sx={{ width: '100%' }}
                  size="small"
                  options={selectedWay?.citis?.from}
                  getOptionLabel={(option) => option.city || ''}
                  value={fromCity}
                  onChange={(e, newValue) => {
                    setFromCity(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      disabled={isLoading}
                      label="Город отдачи"
                    />
                  )}
                />
              </Box>
            )}
            <Box sx={{ display: 'flex', p: '0 15px' }}>
              <Autocomplete
                disabled={isLoading}
                sx={{ width: '100%' }}
                size="small"
                options={ways.filter((way) => way.from === selectedFromWay)}
                getOptionLabel={(option) => option.to}
                value={selectedWay}
                onChange={(e, newValue) => {
                  setSelectedWay(newValue);
                  setAmount(0);
                  setFinalAmount(0);
                  setToCity({});
                  setFromCity({});
                  setPercentage(
                    calculateStockPercentage(
                      newValue?.to_course === '1'
                        ? newValue?.to_course / newValue?.from_course
                        : newValue?.to_course,
                      newValue?.referense_course
                    )
                  );
                  inputRef.current.value = calculateStockPercentage(
                    newValue?.to_course === '1'
                      ? newValue?.to_course / newValue?.from_course
                      : newValue?.to_course,
                    newValue?.referense_course
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={isLoading}
                    label="Способ получения"
                  />
                )}
              />
            </Box>
            {selectedWay?.citis?.to?.length > 0 && (
              <Box sx={{ display: 'flex', p: '0 15px' }}>
                <Autocomplete
                  disabled={isLoading}
                  sx={{ width: '100%' }}
                  size="small"
                  options={selectedWay?.citis?.to}
                  getOptionLabel={(option) => option?.city || ''}
                  value={toCity}
                  onChange={(e, newValue) => {
                    setToCity(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      disabled={isLoading}
                      label="Город получения"
                    />
                  )}
                />
              </Box>
            )}
            <Box sx={{ display: 'flex', p: '0 15px' }}>
              <TextField
                ref={finalAmountRef}
                disabled={isLoading}
                sx={{ width: '100%' }}
                size="small"
                label="Сумма получения"
                value={finalAmount}
                onChange={(e) => {
                  setIsFinalAmountUpdating(true);
                  setFinalAmount(e.target.value);
                  setIsFinalAmountUpdating(false);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {finalAmount <
                        parseFloat(
                          selectedWay?.amount_bellow_commission?.to?.bellow
                        ) &&
                        finalAmount > 0 &&
                        `-${selectedWay?.amount_bellow_commission?.to?.commission} `}
                      {selectedWay?.to_symbol}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'left', p: '0 15px' }}>
              <Typography fontWeight="400" fontSize="14px">
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Базовый курс</div>
                  <div>
                    {calculateConvertedAmount(0).toFixed(4)}{' '}
                    {selectedWay?.to_symbol}
                  </div>
                </Box>
              </Typography>
              {selectedWay?.pp_commission && (
                <Typography fontWeight="500" fontSize="14px">
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <div>Комиссия: ПП (100 USD)</div>
                    <div>
                      {parseFloat(selectedWay?.pp_commission).toFixed(2)}{' '}
                      {selectedWay?.from_symbol}
                    </div>
                  </Box>
                </Typography>
              )}
              {amount <
                parseFloat(
                  selectedWay?.amount_bellow_commission?.from?.bellow
                ) && (
                <Typography fontWeight="500" fontSize="14px">
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <div>
                      Комиссия: отдача ({'<'}{' '}
                      {selectedWay?.amount_bellow_commission.from.bellow})
                    </div>
                    <div>
                      {selectedWay?.amount_bellow_commission.from.commission}{' '}
                      {selectedWay.from_symbol}
                    </div>
                  </Box>
                </Typography>
              )}
              {finalAmount <
                parseFloat(
                  selectedWay?.amount_bellow_commission?.to?.bellow
                ) && (
                <Typography fontWeight="500" fontSize="14px">
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <div>
                      Комиссия: получение ({'<'}{' '}
                      {selectedWay?.amount_bellow_commission.to.bellow})
                    </div>
                    <div>
                      {selectedWay?.amount_bellow_commission.to.commission}{' '}
                      {selectedWay.to_symbol}
                    </div>
                  </Box>
                </Typography>
              )}
              {fromCity?.city && (
                <Typography fontWeight="500" fontSize="14px">
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>Комиссия: {fromCity?.city}</div>
                    <div>{fromCity?.commission}%</div>
                  </Box>
                </Typography>
              )}
              {toCity?.city && (
                <Typography fontWeight="500" fontSize="14px">
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>Комиссия: {toCity?.city}</div>
                    <div>{toCity?.commission}%</div>
                  </Box>
                </Typography>
              )}
              <Typography variant="subtitle2" fontWeight="400">
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Эталонный курс</div>
                  <div>
                    {parseFloat(selectedWay?.referense_course).toFixed(4)}{' '}
                    {selectedWay?.to_symbol}
                  </div>
                </Box>
              </Typography>
              <Typography variant="subtitle2" fontWeight="400">
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Курс для клиента</div>
                  <div>
                    {calculateConvertedAmount(difPercentage).toFixed(4)}{' '}
                    {selectedWay?.to_symbol}
                  </div>
                </Box>
              </Typography>
              <Typography variant="subtitle2" fontWeight="400">
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Процент к бирже</div>
                  <div>
                    {selectedWay?.to_course === '1'
                      ? (
                          selectedWay?.to_course_exchange /
                          selectedWay?.from_course_exchange
                        ).toFixed(4)
                      : parseFloat(selectedWay?.to_course_exchange).toFixed(4)}
                    {' -> '}
                    {calculateStockPercentage(
                      selectedWay?.to_course === '1'
                        ? selectedWay?.to_course_exchange /
                            selectedWay?.from_course_exchange
                        : parseFloat(selectedWay?.to_course_exchange),
                      calculateConvertedAmount(difPercentage)
                    )}
                    %
                  </div>
                </Box>
              </Typography>
              <Typography variant="subtitle2" fontWeight="400">
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Разница в процентах</div>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      size="small"
                      variant="outlined"
                      label="-"
                      onClick={(e) => {
                        setIsDifUpdating(true);

                        inputRef.current.value = (
                          parseFloat(percentage) +
                          difPercentage -
                          PERCENT_STEP
                        ).toFixed(2);
                        setDifPercentage((prev) => prev - PERCENT_STEP);
                        setIsDifUpdating(false);
                      }}
                    />
                    <Box sx={{ p: '0 5px' }}>
                      <input
                        ref={inputRef}
                        style={{
                          border: 0,
                          width: '40px',
                          textAlign: 'center',
                        }}
                        onChange={(e) => {
                          setIsDifUpdating(true);
                          setDifPercentage((percentage - e.target.value) * -1);
                          setIsDifUpdating(false);
                        }}
                      />
                    </Box>
                    <Chip
                      size="small"
                      variant="outlined"
                      label="+"
                      onClick={(e) => {
                        setIsDifUpdating(true);
                        inputRef.current.value = (
                          parseFloat(percentage) +
                          difPercentage +
                          PERCENT_STEP
                        ).toFixed(2);
                        setDifPercentage((prev) => prev + PERCENT_STEP);
                        setIsDifUpdating(false);
                      }}
                    />
                  </Box>
                </Box>
              </Typography>
            </Box>
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationCourse;
