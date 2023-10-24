import React, { useContext, useEffect, useState } from 'react';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import env from 'react-dotenv';

import { observer } from 'mobx-react-lite';
import { GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import axios from 'axios';
import { StoreContext } from '../../../context/store';

const ClientRefusedMetrics = observer(() => {
  const { conversationStore } = useContext(StoreContext);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      console.log({
        filter: conversationStore.filter,
      });
      axios
        .post(
          `${env.SERVER_PHOTO_URL}/api/analytics/dynamic/werefused`,
          conversationStore.filter
        )
        .then((response) => {
          console.log(response.data);
          setRows(response.data.rows);
          setColumns(response.data.columns);
          setIsLoading(false);
          return response;
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, [conversationStore.filter.tags, conversationStore.filter.dateRange]);
  console.log(rows);
  console.log(columns);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="title" fontWeight={400} fontSize={30}>
        Клиент отказался
      </Typography>

      <DataGridPro
        columnBuffer={30}
        columnThreshold={30}
        density="compact"
        treeData
        autoPageSize
        getTreeDataPath={(row) => row.path}
        rows={rows}
        columns={columns}
        showCellVerticalBorder={true}
        autoHeight
        slots={{
          toolbar: GridToolbar,
          loadingOverlay: LinearProgress,
        }}
        loading={isLoading}
      />
    </Box>
  );
});

export default ClientRefusedMetrics;
