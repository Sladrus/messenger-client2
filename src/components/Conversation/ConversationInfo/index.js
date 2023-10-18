import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Telegram, Phone, Mail, Link, Person } from '@mui/icons-material';
import axios from 'axios';
import GradeIcon from '@mui/icons-material/Grade';
import { observer } from 'mobx-react-lite';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';
import { gradeType } from '../../../utils/text';
import env from 'react-dotenv';

const ConversationInfo = observer(({ conversation }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, userStore } = useContext(StoreContext);
  const [client, setClient] = useState({});

  async function getClient(chat_id) {
    try {
      console.log(env.API_TOKEN);
      //
      const response = await axios.get(
        `https://api.moneyport.world/getClient?chat_id=${chat_id}`,
        { headers: { 'x-api-key': `${env.API_TOKEN}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = getClient(-1001975008285).then((data) => {
      setClient(data);
      console.log(data);
    });
  }, []);

  const handleGrade = () => {
    conversationStore.sendGrade(socket, conversation?._id, userStore?.user);
  };

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <Box sx={{ p: '15px' }}>
        <Stack sx={{ textAlign: 'left' }} spacing={2}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            variant="body2"
            color="textSecondary"
          >
            <Telegram sx={{ pr: '15px', fontSize: '18px', pb: '2px' }} />
            {conversation?.title}
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            variant="body2"
            color="textSecondary"
          >
            <Person sx={{ pr: '15px', fontSize: '18px', pb: '2px' }} />
            {client?.user?.name}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <Phone
              fontSize="small"
              sx={{ pr: '15px', fontSize: '18px', pb: '2px' }}
            />
            {client?.user?.phone}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <Mail
              fontSize="small"
              sx={{ pr: '15px', fontSize: '18px', pb: '2px' }}
            />
            {client?.user?.email}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <Link
              fontSize="small"
              sx={{ pr: '15px', fontSize: '18px', pb: '2px' }}
            />
            {conversation?.link ? (
              <a
                style={{ color: '#43aff1' }}
                href={conversation?.link}
                target="_blank"
                rel="noreferrer"
              >
                {conversation?.link}
              </a>
            ) : (
              <span>Создать ссылку</span>
            )}
          </Typography>

          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <GradeIcon
              fontSize="small"
              sx={{ pr: '15px', fontSize: '18px', pb: '2px' }}
            />
            {conversationStore.sendGradeIsLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress size={20} />
              </Box>
            ) : conversation?.grade ? (
              <span>Оценка: {gradeType(conversation?.grade)}</span>
            ) : (
              <span
                style={{
                  textDecoration: 'underline',
                  color: '#43aff1',
                  cursor: 'pointer',
                }}
                onClick={handleGrade}
              >
                Оценить консультацию
              </span>
            )}
          </Typography>
        </Stack>
      </Box>
      <Divider />
    </Card>
  );
});

export default ConversationInfo;
