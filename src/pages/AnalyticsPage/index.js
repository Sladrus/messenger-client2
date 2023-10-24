import React, { useContext, useEffect, useState } from 'react';
// import './MessengerPage.css';
import {
  Box,
  Grid,
  InputLabel,
  LinearProgress,
  Stack,
  Switch,
} from '@mui/material';
import env from 'react-dotenv';

import { observer } from 'mobx-react-lite';
import { DataGrid } from '@mui/x-data-grid';
import { StoreContext } from '../../context/store';
import { formatDateWithDots } from '../../utils/time';
import { GridToolbar } from '@mui/x-data-grid';
import { FormControl, MenuItem, Select } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import axios from 'axios';

const AnalyticsPage = observer(() => {
  // const { socket } = useContext(SocketContext);
  const { stageStore, conversationStore } = useContext(StoreContext);

  // const [dynamicRecords, setDynamicRecords] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);

      axios
        .get(`${env.SERVER_PHOTO_URL}/api/analytics/dynamic/users`, {
          filter: conversationStore.filter,
        })
        .then((response) => {
          //   console.log(response.data);
          setRows(response.data.rows);
          setColumns(response.data.columns);
          setIsLoading(false);
          return response;
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, []);
  console.log(rows);
  console.log(columns);

  return (
    <Box sx={{ flexGrow: 1, width: { marginLeft: `65px`, marginTop: `65px` } }}>
      <Stack spacing={2} sx={{ p: '20px' }}>
        <DataGridPro
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
      </Stack>
    </Box>
  );
});

export default AnalyticsPage;
