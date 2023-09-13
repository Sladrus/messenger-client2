import React from 'react';
import './MessengerPage.css';
import { Box, Grid } from '@mui/material';

import ConversationList from '../../components/Conversation/ConversationList';
import ConversationDialog from '../../components/Conversation/ConversationDialog';
import { observer } from 'mobx-react-lite';

const MessengerPage = observer(() => {
  return (
    <Box sx={{ flexGrow: 1, width: { marginLeft: `65px`, marginTop: `65px` } }}>
      <Grid container component="main" sx={{ position: 'relative' }}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <ConversationList />
        </Grid>
        <Grid item sm={7} md={8} lg={9}>
          <ConversationDialog />
        </Grid>
      </Grid>
    </Box>
  );
});

export default MessengerPage;
