import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import StageConversationCard from '../StageConversationCard';
import AddIcon from '@mui/icons-material/Add';

const StageConversationList = ({ conversations }) => {
  return (
    <Box sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }}>
      {conversations?.length > 0 ? (
        <Stack>
          {conversations?.map((conversation) => {
            return (
              <StageConversationCard
                key={conversation._id}
                conversation={conversation}
              />
            );
          })}
        </Stack>
      ) : (
        <Typography
          sx={{
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant="body2"
          color="textSecondary"
        >
          Чаты отсутствуют
        </Typography>
      )}
    </Box>
  );
};

export default StageConversationList;
