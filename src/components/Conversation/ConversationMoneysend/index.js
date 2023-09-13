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
import React, { useContext, useState } from 'react';
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
    });
    setVolume('');
    setGive('');
    setTake('');
    setRegularity('');
    setDate('');
    setComment('');
    setConditions('');
  };

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
            <Stack spacing={0} sx={{ p: '10px 0px' }}>
              <SimpleTextField
                placeholder={'Введите объем'}
                Icon={AttachMoneyIcon}
                onChange={(e) => setVolume(e.target.value)}
                value={volume}
              />
              <SimpleTextField
                placeholder={'Сколько отдают'}
                Icon={ArrowBackIcon}
                onChange={(e) => setGive(e.target.value)}
                value={give}
              />
              <SimpleTextField
                placeholder={'Сколько получают'}
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
