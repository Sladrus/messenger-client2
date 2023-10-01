import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Telegram, Phone, Mail, Link } from '@mui/icons-material';
import axios from 'axios';

const ConversationInfo = ({ conversation }) => {
  async function getClient(chat_id) {
    try {
      //
      const response = await axios.get(
        `https://api.moneyport.world/getClient?chat_id=${chat_id}`,
        { headers: { 'x-api-key': `${process.env.API_TOKEN}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = getClient(-1001975008285).then((data) => {
    });
  }, []);

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
            <Telegram sx={{ pr: '15px', fontSize: '18px' }} />
            {conversation?.title}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <Phone fontSize="small" sx={{ pr: '15px', fontSize: '18px' }} />
            Телефон
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <Mail fontSize="small" sx={{ pr: '15px', fontSize: '18px' }} />
            Почта
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="body2"
            color="textSecondary"
          >
            <Link fontSize="small" sx={{ pr: '15px', fontSize: '18px' }} />
            {conversation?.link ? (
              <a href={conversation?.link} target="_blank" rel="noreferrer">
                {conversation?.link}
              </a>
            ) : (
              <span>Создать ссылку</span>
            )}
          </Typography>
        </Stack>
      </Box>
      <Divider />
    </Card>
  );
};

export default ConversationInfo;
