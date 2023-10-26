import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import GeneralMetrics from '../../components/Analytics/GeneralMetrics';
import dayjs from 'dayjs';
import TagMetrics from '../../components/Analytics/TagMetrics';

const AnalyticsPage = observer(() => {
  return (
    <Box sx={{ flexGrow: 1, width: { marginLeft: `65px`, marginTop: `65px` } }}>
      <Stack spacing={2} sx={{ p: '20px' }}>
        <GeneralMetrics />
        <TagMetrics />
      </Stack>
    </Box>
  );
});

export default AnalyticsPage;
