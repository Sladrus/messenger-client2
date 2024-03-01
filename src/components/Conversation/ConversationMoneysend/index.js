import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import SimpleTextField from '../../TextField/SimpleTextField';
import TaskButton from '../../Button/TaskButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CommentIcon from '@mui/icons-material/Comment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { observer } from 'mobx-react-lite';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';
import StatusSelect from '../../Select/StatusSelect';
import axios from 'axios';
import env from 'react-dotenv';
import TypeSelect from '../../Select/TypeSelect';
import CounteragentSelect from '../../Select/CounteragentSelect';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { debounce } from '../../../utils/time';

const CustomizedAccordion = styled(Accordion)(() => ({
  border: '0 !important',
  borderRadius: '0 !important',
  boxShadow: 'none !important',
}));

const ConversationMoneysend = observer(({ conversation }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, userStore } = useContext(StoreContext);

  const [volume, setVolume] = useState('');
  const [give, setGive] = useState('');
  const [take, setTake] = useState('');
  const [regularity, setRegularity] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [conditions, setConditions] = useState('');
  const [requisites, setRequisites] = useState('');
  const [reqsLoading, setReqsLoading] = useState(false);

  const [bPersons, setBPersons] = useState([]);

  const [type, setType] = useState({
    name: 'Перевод физ лицу ',
    value: 'physical',
  });
  const [counteragent, setCounteragent] = useState('');

  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const types = [
    { name: 'Перевод физ лицу ', value: 'physical' },
    { name: 'Перевод юр лицу ', value: 'company' },
    { name: 'Прием из-за рубежа ', value: 'from_abroad' },
    { name: 'Выдача наличных ', value: 'cash' },
    { name: 'Обмен криптовалюты ', value: 'exchange' },
  ];

  async function getClient(chat_id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.moneyport.world/getClient?chat_id=${chat_id}`,
        { headers: { 'x-api-key': `${env.API_TOKEN}` } }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function checkReqs(body, signal) {
    try {
      const response = await axios.post(
        `${env.BOT_API_URL}/bperson/check`,
        body,
        { headers: { 'x-api-key': `${env.BOT_API_TOKEN}` }, signal }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getClient(conversation?.chat_id)
      .then((data) => {
        setClient(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleMoneysend = async (e) => {
    e.preventDefault();

    await conversationStore.createMoneysend(socket, conversation._id, {
      title: conversation.title,
      link: conversation?.link,
      user: userStore.user,
      volume,
      give,
      take,
      regularity,
      date,
      comment,
      conditions,
      type,
      counteragent,
      requisites,
    });
    setVolume('');
    setGive('');
    setTake('');
    setRegularity('');
    setDate('');
    setComment('');
    setConditions('');
    setRequisites('');
  };

  useEffect(() => {
    setCounteragent();
  }, [type]);

  useEffect(() => {
    setBPersons([]);
    handleReqs();
  }, [requisites]);

  function identifyRequisites(text) {
    const requisitesPatterns = {
      iban: /\b[A-Z]{2}\s?[0-9]{2}(?:\s?[A-Z0-9]){11,30}\b/g,
      account_number: /\b(\d{20})/g,
      card: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
      eth: /\b0x+[A-F,a-f,0-9]{40}/g,
      btc: /\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}/g,
      dash: /\bX[1-9A-HJ-NP-Za-km-z]{33}/g,
      monero: /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}/g,
      ada: /\baddr1[a-z0-9]/g,
      cosmos: /\bcosmos[a-zA-Z0-9_.-]{10,}/g,
      miota: /\biota[a-z0-9]{10,}/g,
      lsk: /\b[0-9]{19}L/g,
      ltc: /\b[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}/g,
      xem: /\b[N][A-Za-z0-9-]{37,52}/g,
      neo: /\bN[0-9a-zA-Z]{33}/g,
      ont: /\bA[0-9a-zA-Z]{33}/g,
      dot: /\b1[0-9a-zA-Z]{47}/g,
      xrp: /\b1[0-9a-zA-Z]{47}/g,
      xlm: /\bG[0-9A-Z]{40,60}/g,
      tron: /\bT[a-zA-Z0-9]{33}\b/g,
      swift: /\b[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/g,
      sol: /\b[1-9A-HJ-NP-Za-km-z]{32,44}/g,
      zec_z: /\bz[a-zA-Z0-9]{92}/g,
      zec_t: /\bt[13][a-zA-Z0-9]{32}/g,
      zaddr: /\bzs[a-z0-9]{76}/g,
      email: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      btccash: /\b(q[0-9a-z]{41})\b/g,
      bnb: /\b(bnb1)[0-9a-z]{38}/g,
    };

    let foundRequisites = [];

    for (const [key, regex] of Object.entries(requisitesPatterns)) {
      const foundTexts = text.matchAll(regex);
      for (const foundText of foundTexts) {
        const newText = foundText[0];
        const isDuplicate = foundRequisites.some((req) => req.text === newText);
        if (!isDuplicate) {
          foundRequisites.push({
            key,
            text: newText,
            toString: function () {
              return `${this.key} — ${this.text}`;
            },
          });
        }
      }
    }
    //2200150935694825
    return foundRequisites;
  }

  const handleReqs = debounce(async (signal) => {
    setReqsLoading(true);

    try {
      const reqs = identifyRequisites(requisites);
      for (const req of reqs) {
        const data = await checkReqs({ value: req?.text }, signal);
        if (data?.length > 0) {
          setBPersons(data);
          break;
        }
      }
    } catch (e) {
      console.log(e);
      setReqsLoading(false);
    }
    setReqsLoading(false);
  });

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: '0px 15px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Moneysend
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0 }}>
          <form onSubmit={handleMoneysend}>
            <Stack spacing={0} sx={{}}>
              <TypeSelect
                type={type}
                types={types}
                isLoading={isLoading}
                onChange={(e) => {
                  const fType = types.find(
                    (item) => item.value === e.target.value
                  );
                  setType(fType);
                }}
              />
              {type?.value === 'from_abroad' && (
                <CounteragentSelect
                  counteragent={counteragent}
                  options={client?.counteragents}
                  isLoading={isLoading}
                  onChange={(e) => {
                    setCounteragent(e.target.value);
                  }}
                />
              )}

              <SimpleTextField
                loading={reqsLoading}
                error={bPersons?.length > 0 ? true : false}
                errorText={
                  bPersons?.length > 0 && 'Реквизиты не прошли проверку'
                }
                labelText={!bPersons?.length && 'Реквизиты прошли проверку'}
                placeholder={'Введите реквизиты получателя'}
                Icon={PostAddIcon}
                onChange={(e) => setRequisites(e.target.value)}
                value={requisites}
              />
              <SimpleTextField
                placeholder={'Введите объем'}
                Icon={AttachMoneyIcon}
                onChange={(e) => setVolume(e.target.value)}
                value={volume}
              />
              <SimpleTextField
                placeholder={'Что отдают'}
                Icon={ArrowBackIcon}
                onChange={(e) => setGive(e.target.value)}
                value={give}
              />
              <SimpleTextField
                placeholder={'Что получают'}
                Icon={ArrowForwardIcon}
                onChange={(e) => setTake(e.target.value)}
                value={take}
              />
              <SimpleTextField
                placeholder={'Введите регулярность'}
                Icon={HistoryToggleOffIcon}
                onChange={(e) => setRegularity(e.target.value)}
                value={regularity}
              />
              <SimpleTextField
                placeholder={'Сроки'}
                Icon={CalendarMonthIcon}
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <SimpleTextField
                placeholder={'Введите комментарий'}
                Icon={CommentIcon}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <SimpleTextField
                placeholder={'Введите условия'}
                Icon={ChecklistIcon}
                onChange={(e) => setConditions(e.target.value)}
                value={conditions}
              />
              {conversationStore.moneysendLoading ? (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TaskButton
                  text={'Создать'}
                  Icon={AddIcon}
                  // onClick={handleMoneysend}
                />
              )}
            </Stack>
          </form>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationMoneysend;
