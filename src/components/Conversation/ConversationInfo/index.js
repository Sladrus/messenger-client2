import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {
  Telegram,
  Phone,
  Mail,
  Link,
  Person,
  MoreVert,
} from '@mui/icons-material';
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
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getClient(conversation?.chat_id)
      .then((data) => {
        setClient(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
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
            {isLoading ? (
              <Box>
                <CircularProgress size={14} />
              </Box>
            ) : (
              client?.user?.name || 'Имя'
            )}
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
            {isLoading ? (
              <Box>
                <CircularProgress size={14} />
              </Box>
            ) : (
              client?.user?.phone || 'Телефон'
            )}
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
            {isLoading ? (
              <Box>
                <CircularProgress size={14} />
              </Box>
            ) : (
              client?.user?.email || 'Почта'
            )}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <MoreVert
              fontSize="small"
              sx={{ pr: '15px', fontSize: '18px', pb: '2px' }}
            />
            {isLoading ? (
              <Box>
                <CircularProgress size={14} />
              </Box>
            ) : (
              <Box>
                <b>{'UTMS'}:</b>
                <Box sx={{ pl: '16px' }}>
                  <div>
                    Campaign: <b>{client?.utms?.campaign || ''}</b>
                  </div>
                  <div>
                    Content: <b>{client?.utms?.content || ''}</b>
                  </div>
                  <div>
                    Medium: <b>{client?.utms?.medium || ''}</b>
                  </div>
                  <div>
                    Source: <b>{client?.utms?.source || ''}</b>
                  </div>
                  <div>
                    Term: <b>{client?.utms?.term || ''}</b>
                  </div>
                </Box>
              </Box>
            )}
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
