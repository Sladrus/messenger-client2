import React, { useContext, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import env from 'react-dotenv';

import { observer } from 'mobx-react-lite';
import { GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import axios from 'axios';
import { StoreContext, stageStore } from '../../../context/store';

const TagMetrics = observer(({ dateRange }) => {
  const { conversationStore, tagsStore, stageStore } = useContext(StoreContext);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tags, setTags] = useState([]);
  const [stage, setStages] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      axios
        .post(`${env.SERVER_PHOTO_URL}/api/analytics/dynamic/tags`, {
          tags,
          dateRange,
          stage,
        })
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
  }, [tags, dateRange, stage]);
  console.log(rows);
  console.log(columns);

  return (
    <Box>
      <Typography variant="title" fontWeight={400} fontSize={30}>
        Метрика по тегам
      </Typography>
      <Autocomplete
        sx={{ p: '10px 0 10px 0' }}
        size="small"
        disableCloseOnSelect
        multiple
        getOptionLabel={(option) => option.value}
        options={tagsStore.tags || []}
        onChange={(e, newValue) => {
          setTags(newValue);
        }}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Теги" />
        )}
      />
      <Autocomplete
        sx={{ p: '0 0 10px 0' }}
        size="small"
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        options={stageStore.stages || []}
        onChange={(e, newValue) => {
          setStages(newValue);
        }}
        renderInput={(params) => (
          <TextField size="small" {...params} label="Статус" />
        )}
      />

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

export default TagMetrics;
