import React, { useContext, useState, useLayoutEffect } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import StageCard from '../StageCard';
import StageConversationList from '../StageConversationList';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';

const StageList = observer(({ stage, conversations, handleOpenEdit }) => {
  const { conversationStore } = useContext(StoreContext);

  return (
    <Grid
      sx={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: '1px solid #ccc',
        borderTop: '1px solid #ccc',
      }}
      xs={12}
      sm={5}
      md={4}
      lg={3}
      item
      key={stage._id}
    >
      <StageCard
        stage={stage}
        conversations={conversations}
        handleOpenEdit={handleOpenEdit}
      />
      {conversationStore.isLoading ? (
        <Box
          sx={{
            height: 'calc(100% - 60px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <StageConversationList conversations={conversations} />
      )}
    </Grid>
  );
});

export default StageList;
