import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  Tooltip,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import env from 'react-dotenv';
import SendSelect from '../../Select/SendSelect';
import SendMethodSelect from '../../Select/SendMethodSelect';
import { percentageDifference } from '../../../utils/percentageDifference';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import { debounce } from '../../../utils/time';
import makeCancelable from 'makecancelable';

const CustomizedAccordion = styled(Accordion)`
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
`;

const ConversationCourse = observer(() => {
  const [methods, setMethods] = useState([]);

  const [fromValue, setFromValue] = useState(null);
  const [fromMethod, setFromMethod] = useState(null);
  const [fromAmount, setFromAmount] = useState(0);
  const [fromServices, setFromServices] = useState(null);

  const [fromCash, setFromCash] = useState(null);
  const [toCash, setToCash] = useState(null);

  const [toValue, setToValue] = useState(null);
  const [toMethod, setToMethod] = useState(null);
  const [toAmount, setToAmount] = useState(0);
  const [toServices, setToServices] = useState(null);

  const [course, setCourse] = useState(null);
  const [settlementCur, setSettlementCur] = useState(null);

  const [services, setServices] = useState(0);

  const [markup, setMarkup] = useState(null);
  const [defaultMarkup, setDefaultMarkup] = useState(null);
  const [referensePercent, setReferensePercent] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [markupIsLoading, setMarkupIsLoading] = useState(false);

  const [toFocused, setToFocused] = useState(false);
  const [fromFocused, setFromFocused] = useState(false);

  const onFromFocus = () => setFromFocused(true);
  const onFromBlur = () => setFromFocused(false);

  const onToFocus = () => setToFocused(true);
  const onToBlur = () => setToFocused(false);

  const [error, setError] = useState(null);

  const [checked, setChecked] = useState('from');

  const prevMarkup = useRef(markup);
  const cancelTokenSource = useRef();

  const getMethods = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        'https://api.moneyport.world/messenger/methods',
        {
          headers: {
            'X-Api-Key': `${env.API_TOKEN}`,
          },
        }
      );
      setMethods(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculate = async (data, signal) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://api.moneyport.world/messenger/calculation',
        data,
        {
          signal,
          headers: {
            'X-Api-Key': `${env.API_TOKEN}`,
          },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') return;
      setIsLoading(false);
      console.log(error);
      return { error: error?.message };
    }
  };

  useEffect(() => {
    getMethods();
  }, []);

  const debouncedSubmitFromAmount = debounce(async (signal) => {
    if (!fromAmount) return setIsLoading(false);
    try {
      const data = await calculate(
        {
          from: {
            currency: fromValue?.currency,
            method: fromCash ? fromCash?.code : fromMethod?.code,
            amount: fromAmount,
          },
          to: {
            currency: toValue?.currency,
            method: toCash ? toCash?.code : toMethod?.code,
          },
        },
        signal
      );
      if (data?.error || !data?.courses) return setError(data?.error);
      console.log(data);
      setCourse(data?.courses);
      setMarkup(data?.default_markup);
      setDefaultMarkup(data?.default_markup);
      setToAmount(parseFloat(data?.result?.toFixed(4)));
      setToServices(data?.to?.services);
      setFromServices(data?.from?.services);
      setServices(data?.services_result);
      setSettlementCur(data?.settlement_currency);
      setReferensePercent(data?.referense_percent);
      setMarkupIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  });

  const debouncedSubmitToAmount = debounce(async (signal) => {
    if (!toAmount) return setIsLoading(false);
    try {
      const data = await calculate(
        {
          from: {
            currency: fromValue?.currency,
            method: fromCash ? fromCash?.code : fromMethod?.code,
          },
          to: {
            currency: toValue?.currency,
            method: toCash ? toCash?.code : toMethod?.code,
            amount: toAmount,
          },
        },
        signal
      );
      if (data?.error || !data?.courses) return setError(data?.error);
      console.log(data);
      setCourse(data?.courses);
      setMarkup(data?.default_markup);
      setDefaultMarkup(data?.default_markup);
      setFromAmount(parseFloat(data?.result?.toFixed(4)));
      setToServices(data?.to?.services);
      setFromServices(data?.from?.services);
      setServices(data?.services_result);
      setSettlementCur(data?.settlement_currency);
      setReferensePercent(data?.referense_percent);
      setMarkupIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    if (fromFocused) {
      setError('');
      debouncedSubmitFromAmount();
    }
  }, [fromAmount]);

  useEffect(() => {
    if (toFocused) {
      setError('');
      debouncedSubmitToAmount();
    }
  }, [toAmount]);

  useEffect(() => {
    if (toFocused || fromFocused) return;
    if (checked === 'from') {
      debouncedSubmitFromAmount();
    } else {
      debouncedSubmitToAmount();
    }
  }, [checked]);

  // useEffect(() => {
  //   setMarkupIsLoading(true);
  //   if (prevMarkup.current !== null) {
  //     if (markup) {
  //       const newAmount =
  //         checked === 'to'
  //           ? toAmount *
  //             calculateClientCourse(
  //               course?.basic,
  //               course?.basic > course?.referense ? -markup : markup
  //             )
  //           : fromAmount *
  //             calculateClientCourse(
  //               course?.basic,
  //               course?.basic > course?.referense ? -markup : markup
  //             );
  //       checked === 'to'
  //         ? setFromAmount((newAmount + services)?.toFixed(4))
  //         : setToAmount((newAmount - services)?.toFixed(4));
  //     }
  //     setIsLoading(false);
  //   }
  //   prevMarkup.current = markup;
  // }, [markup]);

  const handleChecked = (value) => {
    setChecked(value);
  };

  const handleFromChange = (value) => {
    setFromValue(value);
    setFromAmount(0);
    setToAmount(0);
    setMarkup(null);
    setDefaultMarkup(null);
    setCourse(null);
    setToServices(null);
    setFromServices(null);
    setError(null);
    setFromCash(null);
    setServices(0);
  };

  const handleFromInputChange = (value) => {
    setChecked('from');
  };

  const handleToInputChange = (value) => {
    setChecked('to');
  };

  const handleToChange = (value) => {
    setToValue(value);
    setFromAmount(0);
    setToAmount(0);
    setMarkup(null);
    setDefaultMarkup(null);
    setCourse(null);
    setToServices(null);
    setFromServices(null);
    setError(null);
    setToCash(null);
    setServices(0);
  };

  const calculateClientCourse = (course, markup) => {
    const clientCourse = course + (markup * course) / 100;
    return clientCourse;
  };

  console.log(toMethod);
  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion defaultExpanded>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: '0px 12px', zIndex: '10' }}
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
        <AccordionDetails sx={{ p: 0, borderRadius: 0, zIndex: '10' }}>
          <Stack
            spacing={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '10px 0',
              gap: '6px',
            }}
          >
            {error && (
              <Typography
                sx={{ p: '0px 12px' }}
                fontWeight={'500'}
                fontSize={'14px'}
                textAlign={'left'}
                color={'red'}
              >
                <span>{error}</span>
              </Typography>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '0 12px',
                gap: '6px',
              }}
            >
              <Typography
                fontWeight={'500'}
                fontSize={'14px'}
                textAlign={'left'}
                color={'#031022'}
              >
                Клиент отправляет:
              </Typography>
              <Box>
                <SendSelect
                  value={fromValue}
                  onChange={handleFromChange}
                  inputChange={handleFromInputChange}
                  onFocus={onFromFocus}
                  onBlur={onFromBlur}
                  setValue={setFromValue}
                  values={methods?.FROM || []}
                  defaultValue={methods?.FROM && methods?.FROM[0]}
                  inputValue={fromAmount}
                  setInputValue={setFromAmount}
                  // onSubmit={handleSubmitFromAmount}
                  checked={checked}
                  checkType={'from'}
                  handleChecked={handleChecked}
                  setFocused={setFromFocused}
                />
              </Box>
              {checked === 'to' && !isLoading && (
                <Typography
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  fontWeight={'400'}
                  fontSize={'12px'}
                  textAlign={'left'}
                  color={'#647081'}
                >
                  <span>Расчет произведен по рекомендованному курсу</span>
                </Typography>
              )}
              <SendMethodSelect
                label={'Способ отправления'}
                value={fromMethod}
                setValue={setFromMethod}
                values={
                  fromValue?.cash?.length > 0
                    ? [
                        ...fromValue?.methods,
                        { name: 'Наличные', code: 'cash' },
                      ]
                    : fromValue?.methods
                }
                defaultValue={fromValue?.methods && fromValue?.methods[0]}
              />
              {fromMethod?.code === 'cash' && (
                <Autocomplete
                  size={'small'}
                  options={fromValue?.cash}
                  onChange={(e, value) => setFromCash(value)}
                  groupBy={(option) => option.country}
                  getOptionLabel={(option) => option.city}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      label="Город"
                      size={'small'}
                    />
                  )}
                />
              )}
              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                fontWeight={'400'}
                fontSize={'12px'}
                textAlign={'left'}
                color={'#647081'}
              >
                <span>
                  {fromMethod?.min &&
                    `Минимальная сумма: ${fromMethod?.min} ${fromMethod?.symbol}`}
                </span>
                <span>
                  {fromMethod?.max &&
                    `Максимальная сумма: ${fromMethod?.max} ${fromMethod?.symbol}`}
                </span>
                <span>
                  {fromValue?.partner_rate &&
                    `Комиссия за перевод безнала: ${fromMethod?.partner_rate?.percent}%`}
                </span>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '0 12px',
                gap: '6px',
              }}
            >
              <Typography
                fontWeight={'500'}
                fontSize={'14px'}
                textAlign={'left'}
                color={'#031022'}
              >
                Клиент получает:
              </Typography>
              <Box>
                <SendSelect
                  value={toValue}
                  setValue={setToValue}
                  onChange={handleToChange}
                  inputChange={handleToInputChange}
                  onFocus={onToFocus}
                  onBlur={onToBlur}
                  values={methods?.TO || []}
                  defaultValue={methods?.TO && methods?.TO[0]}
                  inputValue={toAmount}
                  setInputValue={setToAmount}
                  // onSubmit={handleSubmitToAmount}
                  checked={checked}
                  checkType={'to'}
                  handleChecked={handleChecked}
                  setFocused={setToFocused}
                />
              </Box>
              {checked === 'from' && !isLoading && (
                <Typography
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  fontWeight={'400'}
                  fontSize={'12px'}
                  textAlign={'left'}
                  color={'#647081'}
                >
                  <span>Расчет произведен по рекомендованному курсу</span>
                </Typography>
              )}
              <SendMethodSelect
                label={'Способ получения'}
                value={toMethod}
                setValue={setToMethod}
                values={
                  toValue?.cash?.length > 0
                    ? [...toValue?.methods, { name: 'Наличные', code: 'cash' }]
                    : toValue?.methods
                }
                defaultValue={toValue?.methods && toValue?.methods[0]}
              />
              {toMethod?.code === 'cash' && (
                <Autocomplete
                  size={'small'}
                  options={toValue?.cash}
                  onChange={(e, value) => setToCash(value)}
                  groupBy={(option) => option.country}
                  getOptionLabel={(option) => option.city}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      label="Город"
                      size={'small'}
                    />
                  )}
                />
              )}

              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                fontWeight={'400'}
                fontSize={'12px'}
                textAlign={'left'}
                color={'#647081'}
              >
                <span>
                  {toMethod?.min &&
                    `Минимальная сумма: ${toMethod?.min} ${toMethod?.symbol}`}
                </span>
                <span>
                  {toMethod?.max &&
                    `Максимальная сумма: ${toMethod?.max} ${toMethod?.symbol}`}
                </span>
                <span>
                  {toMethod?.partner_rate &&
                    `Комиссия за перевод безнала: ${toMethod?.partner_rate?.percent}%`}
                </span>
              </Typography>
            </Box>
            {fromServices?.length > 0 || toServices?.length > 0 ? (
              <>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // gap: '8px',
                    p: '0 12px',
                    textAlign: 'left',
                  }}
                >
                  <Typography
                    fontWeight={'700'}
                    fontSize={'14px'}
                    color={'#031022'}
                  >
                    Платные доп. услуги
                  </Typography>

                  <Typography
                    fontWeight={'400'}
                    fontSize={'12px'}
                    color={'#647081'}
                  >
                    {fromServices?.map((item, index) => {
                      return (
                        <span key={index}>
                          {item?.name} {item?.price} {item?.symbol}
                        </span>
                      );
                    })}
                  </Typography>
                  <Typography
                    fontWeight={'400'}
                    fontSize={'12px'}
                    color={'#647081'}
                  >
                    {toServices?.map((item, index) => {
                      return (
                        <span key={index}>
                          {item?.name} {item?.price} {item?.symbol}
                        </span>
                      );
                    })}
                  </Typography>
                </Box>
              </>
            ) : (
              ''
            )}
            {course && (
              <>
                <Divider />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    p: '0 12px',
                    textAlign: 'left',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                    fontWeight={'400'}
                    fontSize={'12px'}
                    textAlign={'left'}
                    color={'#647081'}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                        }}
                      >
                        <span>Стандартный курс</span>
                        <Tooltip title="Наш стандартный курс.">
                          <InfoIcon
                            sx={{
                              width: '20px',
                              height: '20px',
                              color: '#A8B1BE',
                            }}
                          />
                        </Tooltip>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          justifyContent: 'center',
                        }}
                      >
                        {course?.referense > 1 / course?.referense ? (
                          <>
                            <span style={{ color: '#408EF6' }}>
                              % к бирже:{' '}
                              {course?.exchange > course?.referense ? '-' : '+'}
                              {Math.abs(referensePercent)?.toFixed(1)}%
                            </span>
                            <span>
                              1 {settlementCur?.from} ={' '}
                              {course?.referense?.toFixed(4)}{' '}
                              {settlementCur?.to}
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ color: '#408EF6' }}>
                              % к бирже:{' '}
                              {1 / course?.exchange > 1 / course?.referense
                                ? '-'
                                : '+'}
                              {Math.abs(referensePercent)?.toFixed(1)}%
                            </span>
                            <span>
                              1 {settlementCur?.to} ={' '}
                              {(1 / course?.referense)?.toFixed(4)}{' '}
                              {settlementCur?.from}
                            </span>
                          </>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                        }}
                      >
                        <span>Рекомендованный курс</span>
                        <Tooltip title="Рекомендованный курс MoneyPort с учетом всех комиссий, спреда и нашей рекомендованной наценки.">
                          <InfoIcon
                            sx={{
                              width: '20px',
                              height: '20px',
                              color: '#A8B1BE',
                            }}
                          />
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          justifyContent: 'center',
                        }}
                      >
                        {course?.basic > 1 / course?.basic ? (
                          <>
                            <span style={{ color: '#408EF6' }}>
                              % к бирже:{' '}
                              {course?.exchange > course?.basic ? '-' : '+'}
                              {percentageDifference(
                                course?.exchange,
                                course?.basic
                              )}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.from} ={' '}
                              {course?.basic?.toFixed(4)} {settlementCur?.to}
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ color: '#408EF6' }}>
                              % к бирже:{' '}
                              {1 / course?.exchange > 1 / course?.basic
                                ? '-'
                                : '+'}
                              {percentageDifference(
                                1 / course?.exchange,
                                1 / course?.basic
                              )}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.to} ={' '}
                              {(1 / course?.basic)?.toFixed(4)}{' '}
                              {settlementCur?.from}
                            </span>
                          </>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                        }}
                      >
                        <span>Минимальный курс</span>
                        <Tooltip title="Минимальный курс MoneyPort. Ниже минимального курса нельзя опускать курс для клиента! Рассчитывается с учетом всех комиссий, спреда и нашей минимальной наценки.">
                          <InfoIcon
                            sx={{
                              width: '20px',
                              height: '20px',
                              color: '#A8B1BE',
                            }}
                          />
                        </Tooltip>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          justifyContent: 'center',
                        }}
                      >
                        {course?.minimum > 1 / course?.minimum ? (
                          <>
                            <span style={{ color: '#408EF6' }}>
                              % к бирже:{' '}
                              {course?.exchange > course?.minimum ? '-' : '+'}
                              {percentageDifference(
                                course?.exchange,
                                course?.minimum
                              )}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.from} ={' '}
                              {course?.minimum?.toFixed(4)} {settlementCur?.to}
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ color: '#408EF6' }}>
                              % к бирже:{' '}
                              {1 / course?.exchange > 1 / course?.minimum
                                ? '-'
                                : '+'}
                              {percentageDifference(
                                1 / course?.exchange,
                                1 / course?.minimum
                              )}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.to} ={' '}
                              {(1 / course?.minimum)?.toFixed(4)}{' '}
                              {settlementCur?.from}
                            </span>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Typography>
                  <Typography
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                    fontWeight={'400'}
                    fontSize={'12px'}
                    textAlign={'left'}
                    color={'#647081'}
                  >
                    {/* <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                        }}
                      >
                        <span>Курс для клиента</span>
                        <Tooltip title="Базовый курс + Наценка в процентах.">
                          <InfoIcon
                            sx={{
                              width: '20px',
                              height: '20px',
                              color: '#A8B1BE',
                            }}
                          />
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          justifyContent: 'center',
                        }}
                      >
                        <span style={{ color: '#408EF6', fontWeight: '500' }}>
                          1 {settlementCur?.from} ={' '}
                          {calculateClientCourse(
                            course?.basic,
                            course?.basic > course?.referense ? -markup : markup
                          ).toFixed(4)}{' '}
                          {settlementCur?.to}
                        </span>
                        <span style={{ color: '#408EF6', fontWeight: '500' }}>
                          1 {settlementCur?.to} ={' '}
                          {calculateClientCourse(
                            1 / course?.basic,
                            course?.basic > course?.referense ? markup : -markup
                          ).toFixed(4)}{' '}
                          {settlementCur?.from}
                        </span>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                        }}
                      >
                        <span>% к бирже</span>
                        <Tooltip title="Курс для клиента относительно курса биржи.">
                          <InfoIcon
                            sx={{
                              width: '20px',
                              height: '20px',
                              color: '#A8B1BE',
                            }}
                          />
                        </Tooltip>
                      </Box>
                      <div
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'end',
                          justifyContent: 'center',
                        }}
                      >
                        <span>
                          {course?.exchange?.toFixed(4)}{' '}
                          {checked === 'from' ? '-' : '+'}{' '}
                          {percentageDifference(
                            calculateClientCourse(
                              course?.basic,
                              course?.basic > course?.referense
                                ? -markup
                                : markup
                            ),
                            course?.exchange
                          )}
                          %
                        </span>
                      </div>
                    </Box> */}
                  </Typography>
                  {/* <Typography
                    fontWeight={'400'}
                    fontSize={'12px'}
                    textAlign={'left'}
                    color={'#647081'}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'start',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                          }}
                        >
                          <span>Наценка в %</span>
                          <Tooltip title="Разница в % эталонного и базового курса.">
                            <InfoIcon
                              sx={{
                                width: '20px',
                                height: '20px',
                                color: '#A8B1BE',
                              }}
                            />
                          </Tooltip>
                        </Box>
                        <span
                          style={{
                            cursor: 'pointer',
                            color: '#408EF6',
                            fontWeight: '500',
                          }}
                          onClick={() => setMarkup(defaultMarkup)}
                        >
                          Наценка по умолчанию
                        </span>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <RemoveCircleOutlineIcon
                          sx={{ color: '#408EF6', cursor: 'pointer' }}
                          onClick={() => setMarkup((prev) => prev - 0.1)}
                        />
                        <Typography
                          fontWeight={'400'}
                          fontSize={'14px'}
                          color={'#031022'}
                        >
                          <span>{markup?.toFixed(1)}%</span>
                        </Typography>

                        <AddCircleOutlineIcon
                          sx={{ color: '#408EF6', cursor: 'pointer' }}
                          onClick={() => setMarkup((prev) => prev + 0.1)}
                        />
                      </Box>
                    </Box>
                  </Typography> */}
                </Box>
              </>
            )}
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationCourse;
