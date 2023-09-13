import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { Telegram, Phone, Mail, Link } from '@mui/icons-material';

const ConversationInfo = ({ conversation }) => {
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
