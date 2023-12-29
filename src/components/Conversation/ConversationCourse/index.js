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
import { sleep } from '../../../utils/time';

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
  const [reverseCourse, setReverseCourse] = useState(null);

  const [reverse, setReverse] = useState(null);

  const [markup, setMarkup] = useState(null);
  const [defaultMarkup, setDefaultMarkup] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [markupIsLoading, setMarkupIsLoading] = useState(false);

  const [toFocused, setToFocused] = useState(false);
  const [fromFocused, setFromFocused] = useState(false);

  const [error, setError] = useState(null);

  const [checked, setChecked] = useState('from');

  const prevMarkup = useRef(markup);

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

  const calculate = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://api.moneyport.world/messenger/calculation',
        data,
        {
          headers: {
            'X-Api-Key': `${env.API_TOKEN}`,
          },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return { error: error?.message };
    }
  };

  useEffect(() => {
    getMethods();
  }, []);

  // useEffect(() => {
  //   setMarkupIsLoading(true);
  //   if (prevMarkup.current !== null) {
  //     if (markup) {
  //       const newAmount =
  //         checked === 'to'
  //           ? toAmount /
  //             calculateClientCourse(
  //               !reverse
  //                 ? parseFloat(course?.referense?.toFixed(5))
  //                 : parseFloat(course?.basic?.toFixed(5)),
  //               -markup
  //             )
  //           : fromAmount *
  //             calculateClientCourse(
  //               reverse
  //                 ? parseFloat(course?.referense?.toFixed(5))
  //                 : parseFloat(course?.basic?.toFixed(5)),
  //               -markup
  //             );
  //       checked === 'to'
  //         ? setFromAmount(parseFloat(newAmount?.toFixed(4)))
  //         : setToAmount(parseFloat(newAmount?.toFixed(4)));
  //     }
  //     setIsLoading(false);
  //   }
  //   prevMarkup.current = markup;
  // }, [markup]);

  useEffect(() => {
    // setChecked('from');
    if (!toFocused) handleSubmitFromAmount();
  }, [fromAmount]);

  useEffect(() => {
    // setChecked('to');
    if (!fromFocused) handleSubmitToAmount();
  }, [toAmount]);

  const handleSubmitFromAmount = async (e) => {
    e?.preventDefault();
    setError('');
    const data = await calculate({
      from: {
        currency: fromValue?.currency,
        method: fromCash ? fromCash?.code : fromMethod?.code,
        amount: fromAmount,
      },
      to: {
        currency: toValue?.currency,
        method: toCash ? toCash?.code : toMethod?.code,
      },
    });
    console.log(data);

    if (data?.error || !data?.courses) return setError(data?.error);
    setCourse(data?.courses);
    setReverseCourse(data?.courses_reverse);

    setReverse(data?.reverse);

    setMarkup(data?.default_markup);
    setDefaultMarkup(data?.default_markup);
    setToAmount(parseFloat(data?.result?.toFixed(4)));
    setToServices(data?.to?.services);
    setFromServices(data?.from?.services);
    setMarkupIsLoading(false);
  };

  const handleSubmitToAmount = async (e) => {
    e?.preventDefault();
    setError('');
    const data = await calculate({
      from: {
        currency: fromValue?.currency,
        method: fromCash ? fromCash?.code : fromMethod?.code,
      },
      to: {
        currency: toValue?.currency,
        method: toCash ? toCash?.code : toMethod?.code,
        amount: toAmount,
      },
    });
    console.log(data);

    if (data?.error || !data?.courses) return setError(data?.error);

    setCourse(data?.courses);
    setReverseCourse(data?.courses_reverse);

    setReverse(data?.reverse);

    setMarkup(data?.default_markup);
    setDefaultMarkup(data?.default_markup);

    setFromAmount(parseFloat(data?.result?.toFixed(4)));
    setToServices(data?.to?.services);
    setFromServices(data?.from?.services);
    setMarkupIsLoading(false);
  };

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
  };

  const calculateClientCourse = (course, markup) => {
    const clientCourse = course + (markup * course) / 100;
    return clientCourse;
  };

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
                  setValue={setFromValue}
                  values={methods?.FROM || []}
                  defaultValue={methods?.FROM && methods?.FROM[0]}
                  inputValue={fromAmount}
                  setInputValue={setFromAmount}
                  onSubmit={handleSubmitFromAmount}
                  checked={checked}
                  checkType={'from'}
                  handleChecked={handleChecked}
                  setFocused={setFromFocused}
                />
              </Box>
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
              {(fromMethod?.min || fromMethod?.max) && (
                <Typography
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  fontWeight={'400'}
                  fontSize={'12px'}
                  textAlign={'left'}
                  color={'#647081'}
                >
                  <span>
                    {fromMethod?.min !== null &&
                      `Минимальная сумма ${fromMethod?.min} ${fromMethod?.symbol}`}
                  </span>
                  <span>
                    {fromMethod?.max !== null &&
                      `Максимальная сумма ${fromMethod?.max} ${fromMethod?.symbol}`}
                  </span>
                </Typography>
              )}
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
                  values={methods?.TO || []}
                  defaultValue={methods?.TO && methods?.TO[0]}
                  inputValue={toAmount}
                  setInputValue={setToAmount}
                  onSubmit={handleSubmitToAmount}
                  checked={checked}
                  checkType={'to'}
                  handleChecked={handleChecked}
                  setFocused={setToFocused}
                />
              </Box>
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
              {(toMethod?.min || toMethod?.max) && (
                <Typography
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  fontWeight={'400'}
                  fontSize={'12px'}
                  textAlign={'left'}
                  color={'#647081'}
                >
                  <span>
                    {toMethod?.min !== null &&
                      `Минимальная сумма ${toMethod?.min} ${toMethod?.symbol}`}
                  </span>
                  <span>
                    {toMethod?.max !== null &&
                      `Максимальная сумма ${toMethod?.max} ${toMethod?.symbol}`}
                  </span>
                </Typography>
              )}
            </Box>
            {fromServices !== null || toServices !== null ? (
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
                  {fromServices && (
                    <Typography
                      fontWeight={'700'}
                      fontSize={'14px'}
                      color={'#031022'}
                    >
                      Платные доп. услуги: Отправляете
                    </Typography>
                  )}
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

                  {toServices && (
                    <Typography
                      fontWeight={'700'}
                      fontSize={'14px'}
                      color={'#031022'}
                    >
                      Платные доп. услуги: Получаете
                    </Typography>
                  )}
                  {toServices?.map((item, index) => {
                    return (
                      <Typography
                        key={index}
                        fontWeight={'400'}
                        fontSize={'12px'}
                        color={'#647081'}
                      >
                        {item?.name} {item?.price} {item?.symbol}
                      </Typography>
                    );
                  })}
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
                        <span>Базовый курс</span>
                        <Tooltip title="Курс с учетом себестоисмоти и всех комиссий (минимальный курс).">
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
                        <span>
                          1 {fromMethod?.symbol} = {course?.basic?.toFixed(4)}{' '}
                          {toMethod?.symbol}
                        </span>
                        <span>
                          1 {toMethod?.symbol} ={' '}
                          {reverseCourse?.basic?.toFixed(4)}{' '}
                          {fromMethod?.symbol}
                        </span>
                      </Box>
                    </Box>
                    <Box
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
                        <span>Эталонный курс</span>
                        <Tooltip title="Курс биржи + макс % (эталонный курс).">
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
                        <span>
                          1 {fromMethod?.symbol} ={' '}
                          {course?.referense?.toFixed(4)} {toMethod?.symbol}
                        </span>
                        <span>
                          1 {toMethod?.symbol} ={' '}
                          {reverseCourse?.referense?.toFixed(4)}{' '}
                          {fromMethod?.symbol}
                        </span>
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
                    <Box
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
                          1 {fromMethod?.symbol} ={' '}
                          {calculateClientCourse(
                            !reverse ? course?.referense : course?.basic,
                            -markup
                          ).toFixed(5)}{' '}
                          {toMethod?.symbol}
                        </span>
                        <span style={{ color: '#408EF6', fontWeight: '500' }}>
                          1 {toMethod?.symbol} ={' '}
                          {calculateClientCourse(
                            !reverse
                              ? reverseCourse?.basic
                              : reverseCourse?.referense,
                            markup
                          ).toFixed(5)}{' '}
                          {fromMethod?.symbol}
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
                      <span>
                        {course?.exchange?.toFixed(4)} +{' '}
                        {percentageDifference(
                          calculateClientCourse(course?.basic, markup),
                          course?.exchange
                        )}
                        %
                      </span>
                    </Box>
                  </Typography>
                  <Typography
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
                  </Typography>
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
