import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
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
  Radio,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import env from "react-dotenv";
import SendSelect from "../../Select/SendSelect";
import SendMethodSelect from "../../Select/SendMethodSelect";
import { percentageDifference } from "../../../utils/percentageDifference";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import { debounce } from "../../../utils/time";
import makeCancelable from "makecancelable";
import { currencyFormat } from "../../../utils/currency";

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
  const [exchangeSource, setExchangeSource] = useState(null);

  const [services, setServices] = useState(0);
  const [result, setResult] = useState(null);

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

  const [checked, setChecked] = useState("from");
  const [courseType, setCourseType] = useState("basic");

  const pairList = [
    "TO_WIRERUB",
    "TO_WIRERUBVAT",
    "FROM_WIRERUB",
    "FROM_WIRERUBVAT",
  ];

  const getMethods = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        "https://api.moneyport.world/messenger/methods",
        {
          headers: {
            "X-Api-Key": `${env.API_TOKEN}`,
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
        "https://api.moneyport.world/messenger/calculation",
        data,
        {
          signal,
          headers: {
            "X-Api-Key": `${env.API_TOKEN}`,
          },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED") return;
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
            method:
              fromMethod?.code === "cash" ? fromCash?.code : fromMethod?.code,
            amount: fromAmount,
          },
          to: {
            currency: toValue?.currency,
            method: toMethod?.code === "cash" ? toCash?.code : toMethod?.code,
          },
        },
        signal
      );
      if (data?.error || !data?.courses) return setError(data?.error);
      setCourse(data?.courses);
      setMarkup(data?.default_markup);
      setDefaultMarkup(data?.default_markup);
      if (courseType === "referense")
        setToAmount(parseFloat(data?.result?.standart?.result?.toFixed(4)));
      if (courseType === "minimum")
        setToAmount(parseFloat(data?.result?.minimum?.result?.toFixed(4)));
      if (courseType === "basic")
        setToAmount(parseFloat(data?.result?.basic?.result?.toFixed(4)));
      setToServices(data?.services_list?.to);
      setFromServices(data?.services_list?.from);
      setServices(data?.services_result);
      setSettlementCur(data?.settlement_currency);
      setReferensePercent(data?.referense_percent);
      setExchangeSource(data?.exchange_source);
      setResult(data?.result);
      setMarkupIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, 100);

  const debouncedSubmitToAmount = debounce(async (signal) => {
    if (!toAmount) return setIsLoading(false);
    try {
      const data = await calculate(
        {
          from: {
            currency: fromValue?.currency,
            method:
              fromMethod?.code === "cash" ? fromCash?.code : fromMethod?.code,
          },
          to: {
            currency: toValue?.currency,
            method: toMethod?.code === "cash" ? toCash?.code : toMethod?.code,
            amount: toAmount,
          },
        },
        signal
      );
      if (data?.error || !data?.courses) return setError(data?.error);
      setCourse(data?.courses);
      setMarkup(data?.default_markup);
      setDefaultMarkup(data?.default_markup);
      if (courseType === "referense")
        setFromAmount(parseFloat(data?.result?.standart?.result?.toFixed(4)));
      if (courseType === "minimum")
        setFromAmount(parseFloat(data?.result?.minimum?.result?.toFixed(4)));
      if (courseType === "basic")
        setFromAmount(parseFloat(data?.result?.basic?.result?.toFixed(4)));
      setToServices(data?.services_list?.to);
      setFromServices(data?.services_list?.from);
      setServices(data?.services_result);
      setSettlementCur(data?.settlement_currency);
      setReferensePercent(data?.referense_percent);
      setExchangeSource(data?.exchange_source);
      setResult(data?.result);
      setMarkupIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    if (fromFocused) {
      setError("");
      debouncedSubmitFromAmount();
    }
  }, [fromAmount]);

  useEffect(() => {
    if (toFocused) {
      setError("");
      debouncedSubmitToAmount();
    }
  }, [toAmount]);

  useEffect(() => {
    setError(null);

    if (!toCash && toMethod?.code === "cash") return;
    if (!fromCash && fromMethod?.code === "cash") return;

    if (toFocused || fromFocused) return;
    if (checked === "from") {
      debouncedSubmitFromAmount();
    } else {
      debouncedSubmitToAmount();
    }
  }, [checked, courseType, toMethod, fromMethod, toCash, fromCash]);

  useEffect(() => {
    console.log(toCash, fromCash);
  }, [toCash, fromCash]);

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
    setResult(null);
  };

  const handleFromInputChange = (value) => {
    setChecked("from");
  };

  const handleToInputChange = (value) => {
    setChecked("to");
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
    setResult(null);
  };

  const getCourseTypeText = () => {
    if (courseType === "referense") return "стандартному";
    if (courseType === "minimum") return "минимальному";
    if (courseType === "basic") return "рекомендованному";
  };

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion defaultExpanded>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: "0px 12px", zIndex: "10" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="subtitle2"
            fontWeight="bold"
          >
            <>Калькулятор курса</>
            {isLoading && (
              <Box
                sx={{
                  pl: "10px",
                }}
              >
                <CircularProgress size={14} />
              </Box>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0, zIndex: "10" }}>
          <Stack
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "10px 0",
              gap: "6px",
            }}
          >
            {error && (
              <Typography
                sx={{ p: "0px 12px" }}
                fontWeight={"500"}
                fontSize={"14px"}
                textAlign={"left"}
                color={"red"}
              >
                <span>{error}</span>
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: "0 12px",
                gap: "6px",
              }}
            >
              <Typography
                fontWeight={"500"}
                fontSize={"14px"}
                textAlign={"left"}
                color={"#031022"}
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
                  checkType={"from"}
                  handleChecked={handleChecked}
                  setFocused={setFromFocused}
                />
              </Box>
              {checked === "to" && !isLoading && (
                <Typography
                  sx={{ display: "flex", flexDirection: "column" }}
                  fontWeight={"400"}
                  fontSize={"12px"}
                  textAlign={"left"}
                  color={"#647081"}
                >
                  <span>Расчет произведен по {getCourseTypeText()} курсу</span>
                </Typography>
              )}
              <SendMethodSelect
                label={"Способ отправления"}
                value={fromMethod}
                setValue={setFromMethod}
                values={
                  fromValue?.cash?.length > 0
                    ? [
                        ...fromValue?.methods,
                        { name: "Наличные", code: "cash" },
                      ]
                    : fromValue?.methods
                }
                defaultValue={fromValue?.methods && fromValue?.methods[0]}
              />
              {fromMethod?.code === "cash" && (
                <Autocomplete
                  size={"small"}
                  defaultValue={fromCash}
                  options={fromValue?.cash}
                  onChange={(e, value) => setFromCash(value)}
                  groupBy={(option) => option.country}
                  getOptionLabel={(option) => option.city}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      label="Город"
                      size={"small"}
                    />
                  )}
                />
              )}
              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                fontWeight={"400"}
                fontSize={"12px"}
                textAlign={"left"}
                color={"#647081"}
              >
                <span>
                  {fromMethod?.min &&
                    `Минимальная сумма: ${currencyFormat(fromMethod?.min)} ${
                      fromMethod?.symbol
                    }`}
                </span>
                <span>
                  {fromMethod?.max &&
                    `Максимальная сумма: ${currencyFormat(fromMethod?.max)} ${
                      fromMethod?.symbol
                    }`}
                </span>
                {pairList.includes(fromMethod?.code) && (
                  <span>
                    {fromMethod?.partner_rate?.percent &&
                      `Комиссия за перевод безнала: ${fromMethod?.partner_rate?.percent}%`}
                  </span>
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: "0 12px",
                gap: "6px",
              }}
            >
              <Typography
                fontWeight={"500"}
                fontSize={"14px"}
                textAlign={"left"}
                color={"#031022"}
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
                  checkType={"to"}
                  handleChecked={handleChecked}
                  setFocused={setToFocused}
                />
              </Box>
              {checked === "from" && !isLoading && (
                <Typography
                  sx={{ display: "flex", flexDirection: "column" }}
                  fontWeight={"400"}
                  fontSize={"12px"}
                  textAlign={"left"}
                  color={"#647081"}
                >
                  <span>Расчет произведен по {getCourseTypeText()} курсу</span>
                </Typography>
              )}
              <SendMethodSelect
                label={"Способ получения"}
                value={toMethod}
                setValue={setToMethod}
                values={
                  toValue?.cash?.length > 0
                    ? [...toValue?.methods, { name: "Наличные", code: "cash" }]
                    : toValue?.methods
                }
                defaultValue={toValue?.methods && toValue?.methods[0]}
              />
              {toMethod?.code === "cash" && (
                <Autocomplete
                
                  size={"small"}
                  defaultValue={toCash}
                  options={toValue?.cash}
                  onChange={(e, value) => setToCash(value)}
                  groupBy={(option) => option.country}
                  getOptionLabel={(option) => option.city}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      label="Город"
                      size={"small"}
                    />
                  )}
                />
              )}

              <Typography
                sx={{ display: "flex", flexDirection: "column" }}
                fontWeight={"400"}
                fontSize={"12px"}
                textAlign={"left"}
                color={"#647081"}
              >
                <span>
                  {toMethod?.min &&
                    `Минимальная сумма: ${currencyFormat(toMethod?.min)} ${
                      toMethod?.symbol
                    }`}
                </span>
                <span>
                  {toMethod?.max &&
                    `Максимальная сумма: ${currencyFormat(toMethod?.max)} ${
                      toMethod?.symbol
                    }`}
                </span>
                {pairList.includes(toMethod?.code) && (
                  <span>
                    {toMethod?.partner_rate?.percent &&
                      `Комиссия за перевод безнала: ${toMethod?.partner_rate?.percent}%`}
                  </span>
                )}
              </Typography>
            </Box>
            {fromServices?.length > 0 || toServices?.length > 0 ? (
              <>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // gap: '8px',
                    p: "0 12px",
                    textAlign: "left",
                  }}
                >
                  <Typography
                    fontWeight={"700"}
                    fontSize={"14px"}
                    color={"#031022"}
                  >
                    Платные доп. услуги
                  </Typography>

                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    fontWeight={"400"}
                    fontSize={"12px"}
                    color={"#647081"}
                  >
                    {fromServices?.map((item, index) => {
                      return (
                        <span key={index}>
                          {item?.name}: {currencyFormat(item?.price)}{" "}
                          {item?.symbol}
                        </span>
                      );
                    })}
                  </Typography>
                  <Typography
                    sx={{ display: "flex", flexDirection: "column" }}
                    fontWeight={"400"}
                    fontSize={"12px"}
                    color={"#647081"}
                  >
                    {toServices?.map((item, index) => {
                      return (
                        <span key={index}>
                          {item?.name}: {currencyFormat(item?.price)}{" "}
                          {item?.symbol}
                        </span>
                      );
                    })}
                  </Typography>
                </Box>
              </>
            ) : (
              ""
            )}
            {result && (
              <>
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    p: "0 12px",
                    textAlign: "left",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                    fontWeight={"400"}
                    fontSize={"12px"}
                    textAlign={"left"}
                    color={"#647081"}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        borderRadius: "20px",
                        border: "1px solid var(--Primary-Primary, #408EF6)",
                        background: "#FFF",
                        padding: "12px 16px",
                      }}
                      onClick={() => setCourseType("referense")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        <Radio
                          sx={{ p: 0 }}
                          size="small"
                          checked={courseType === "referense"}
                        />
                        <span>Стандартный курс</span>
                        <Tooltip title="Наш стандартный курс.">
                          <InfoIcon
                            sx={{
                              width: "20px",
                              height: "20px",
                              color: "#A8B1BE",
                            }}
                          />
                        </Tooltip>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                          justifyContent: "center",
                        }}
                      >
                        {result?.standart?.course >
                        1 / result?.standart?.course ? (
                          <>
                            <span style={{ color: "#408EF6" }}>
                              % к бирже {exchangeSource}:{" "}
                              {Number(result?.standart?.percent) > 0 ? "" : ""}
                              {Number(
                                Math.abs(result?.standart?.percent)
                              )?.toFixed(1)}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.from} ={" "}
                              {Number(result?.standart?.course)?.toFixed(4)}{" "}
                              {settlementCur?.to}
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ color: "#408EF6" }}>
                              % к бирже {exchangeSource}:{" "}
                              {Number(result?.standart?.percent) > 0 ? "" : ""}
                              {Number(
                                Math.abs(result?.standart?.percent)
                              )?.toFixed(1)}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.to} ={" "}
                              {Number(1 / result?.standart?.course)?.toFixed(4)}{" "}
                              {settlementCur?.from}
                            </span>
                          </>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        borderRadius: "20px",
                        border: "1px solid var(--Primary-Primary, #408EF6)",
                        background: "#FFF",
                        padding: "12px 16px",
                      }}
                      onClick={() => setCourseType("basic")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        <Radio
                          sx={{ p: 0 }}
                          size="small"
                          checked={courseType === "basic"}
                        />
                        <span>Рекомендованный курс</span>
                        <Tooltip title="Рекомендованный курс MoneyPort с учетом всех комиссий, спреда и нашей рекомендованной наценки.">
                          <InfoIcon
                            sx={{
                              width: "20px",
                              height: "20px",
                              color: "#A8B1BE",
                            }}
                          />
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                          justifyContent: "center",
                        }}
                      >
                        {result?.basic?.course > 1 / result?.basic?.course ? (
                          <>
                            <span style={{ color: "#408EF6" }}>
                              % к бирже {exchangeSource}:{" "}
                              {Number(result?.basic?.percent) > 0 ? "" : ""}
                              {Number(
                                Math.abs(result?.basic?.percent)
                              )?.toFixed(1)}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.from} ={" "}
                              {Number(result?.basic?.course)?.toFixed(4)}{" "}
                              {settlementCur?.to}
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ color: "#408EF6" }}>
                              % к бирже {exchangeSource}:{" "}
                              {Number(result?.basic?.percent) > 0 ? "" : ""}
                              {Number(
                                Math.abs(result?.basic?.percent)
                              )?.toFixed(1)}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.to} ={" "}
                              {Number(1 / result?.basic?.course)?.toFixed(4)}{" "}
                              {settlementCur?.from}
                            </span>
                          </>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        borderRadius: "20px",
                        border: "1px solid var(--Primary-Primary, #408EF6)",
                        background: "#FFF",
                        padding: "12px 16px",
                      }}
                      onClick={() => setCourseType("minimum")}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        <Radio
                          sx={{ p: 0 }}
                          size="small"
                          checked={courseType === "minimum"}
                        />
                        <span>Минимальный курс</span>
                        <Tooltip title="Минимальный курс MoneyPort. Ниже минимального курса нельзя опускать курс для клиента! Рассчитывается с учетом всех комиссий, спреда и нашей минимальной наценки.">
                          <InfoIcon
                            sx={{
                              width: "20px",
                              height: "20px",
                              color: "#A8B1BE",
                            }}
                          />
                        </Tooltip>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                          justifyContent: "center",
                        }}
                      >
                        {result?.minimum?.course >
                        1 / result?.minimum?.course ? (
                          <>
                            <span style={{ color: "#408EF6" }}>
                              % к бирже {exchangeSource}:{" "}
                              {Number(result?.minimum?.percent) > 0 ? "" : ""}
                              {Number(
                                Math.abs(result?.minimum?.percent)
                              )?.toFixed(1)}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.from} ={" "}
                              {Number(result?.minimum?.course)?.toFixed(4)}{" "}
                              {settlementCur?.to}
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={{ color: "#408EF6" }}>
                              % к бирже {exchangeSource}:{" "}
                              {Number(result?.minimum?.percent) > 0 ? "" : ""}
                              {Number(
                                Math.abs(result?.minimum?.percent)
                              )?.toFixed(1)}
                              %
                            </span>
                            <span>
                              1 {settlementCur?.to} ={" "}
                              {(1 / Number(result?.minimum?.course))?.toFixed(
                                4
                              )}{" "}
                              {settlementCur?.from}
                            </span>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Typography>
                  {exchangeSource && (
                    <Typography
                      sx={{ display: "flex", flexDirection: "column" }}
                      fontWeight={"400"}
                      fontSize={"12px"}
                      textAlign={"left"}
                      color={"#647081"}
                    >
                      {course?.exchange > 1 / course?.exchange ? (
                        <span>
                          Курс биржи {exchangeSource}: 1 {settlementCur.from} ={" "}
                          {Number(course?.exchange)?.toFixed(4)}{" "}
                          {settlementCur.to}
                        </span>
                      ) : (
                        <span>
                          Курс биржи {exchangeSource}: 1 {settlementCur.to} ={" "}
                          {Number(1 / course?.exchange)?.toFixed(4)}{" "}
                          {settlementCur.from}
                        </span>
                      )}
                    </Typography>
                  )}
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
