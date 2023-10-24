import React, { useContext, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import env from 'react-dotenv';

import { observer } from 'mobx-react-lite';
import { GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import axios from 'axios';
import { StoreContext } from '../../../context/store';

const GeneralMetrics = observer(({ dateRange }) => {
  const { conversationStore } = useContext(StoreContext);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);

      axios
        .post(`${env.SERVER_PHOTO_URL}/api/analytics/dynamic/users`, {
          dateRange,
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
  }, [dateRange]);
  console.log(rows);
  console.log(columns);

  return (
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
  );
});

export default GeneralMetrics;
