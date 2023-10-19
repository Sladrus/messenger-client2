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

import { observer } from 'mobx-react-lite';
import { DataGrid } from '@mui/x-data-grid';
import { StoreContext } from '../../context/store';
import { formatDateWithDots } from '../../utils/time';
import { GridToolbar } from '@mui/x-data-grid';
import { FormControl, MenuItem, Select } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';

const AnalyticsPage = observer(() => {
  //   const { socket } = useContext(SocketContext);
  // const { stageStore, conversationStore } = useContext(StoreContext);

  // const [staticRecords, setStaticRecords] = useState([]);
  // const [dynamicRecords, setDynamicRecords] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);

  // const staticRows = [];
  // const dynamicRows = [];

  // useEffect(() => {
  //   try {
  //     setIsLoading(true);
  //     axios
  //       .get('http://localhost:5005/api/analytics/static/weeks')
  //       .then((response) => {
  //         //   console.log(response.data);
  //         setStaticRecords(response.data);
  //         // setIsLoading(false);
  //         return response;
  //       });

  //     axios
  //       .get('http://localhost:5005/api/analytics/dynamic/weeks')
  //       .then((response) => {
  //         //   console.log(response.data);
  //         setDynamicRecords(response.data);
  //         setIsLoading(false);
  //         return response;
  //       });
  //   } catch (e) {
  //     console.log(e);
  //     setIsLoading(false);
  //   }
  // }, []);

  // staticRecords.forEach((week, index) => {
  //   const weekNumber = week._id.week;
  //   const startDate = formatDateWithDots(week.startDate);
  //   const endDate = formatDateWithDots(week.endDate);
  //   const recordCounts = {};

  //   week.records.forEach((record) => {
  //     const status = record.stage[0].label;
  //     recordCounts[status] = recordCounts[status]
  //       ? `${recordCounts[status] + 1}`
  //       : 1;
  //   });

  //   const totalRecords = week.records?.length;

  //   Object.keys(recordCounts).forEach((status) => {
  //     const count = recordCounts[status];
  //     const percentage = (count / totalRecords) * 100;
  //     recordCounts[status] = `${count} / (${percentage.toFixed(2)}%)`;
  //   });

  //   staticRows.push({
  //     id: index + 1,
  //     week: `Неделя ${weekNumber}`,
  //     date: `${startDate}-${endDate}`,
  //     ...recordCounts,
  //     all: week.records?.length,
  //   });
  // });

  // dynamicRecords.forEach((week, index) => {
  //   const weekNumber = week._id.week;
  //   const startDate = formatDateWithDots(week.startDate);
  //   const endDate = formatDateWithDots(week.endDate);
  //   const recordCounts = {};

  //   week.records.forEach((record) => {
  //     const status = record.stage[0]?.label;
  //     recordCounts[status] = recordCounts[status]
  //       ? recordCounts[status] + 1
  //       : 1;
  //   });

  //   const totalRecords = week.records?.length;

  //   Object.keys(recordCounts).forEach((status) => {
  //     const count = recordCounts[status];
  //     const percentage = (count / totalRecords) * 100;
  //     recordCounts[status] = `${count} / (${percentage.toFixed(2)}%)`;
  //   });

  //   dynamicRows.push({
  //     id: index + 1,
  //     week: `Неделя ${weekNumber}`,
  //     date: `${startDate}-${endDate}`,
  //     ...recordCounts,
  //     all: week.records?.length,
  //   });
  // });

  // console.log(dynamicRecords);

  // const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event?.target?.value);
  // };

  // const columns = [{ field: 'jobTitle', width: 250 }];

  //   const rows = [
  //   { id: 1, col1: 'Неделя 41', col2: '01.09-04.09.23' },
  //   { id: 2, col1: 'Неделя 42', col2: '01.09-04.09.23' },
  //   { id: 3, col1: 'Неделя 43', col2: '01.09-04.09.23' },
  //   { id: 4, col1: 'Неделя 44', col2: '01.09-04.09.23' },
  //   { id: 5, col1: 'Неделя 45', col2: '01.09-04.09.23' },
  // ];
  // Without transformation
  // const rows = [
  //   { path: ['Неделя 41'], date: '01.09-04.09.23', id: 0 },
  //   { path: ['Неделя 41', 'Chat 1'], date: '04.09.23', id: 1 },
  //   { path: ['Неделя 41', 'Chat 2'], date: '03.09.23', id: 2 },
  //   { path: ['Неделя 42', 'Chat 11'], date: '03.09.23', id: 3 },
  //   { path: ['Неделя 42', 'Chat 22'], date: '03.09.23', id: 4 },
  // ];
  // const columns = [
  //   {
  //     field: 'date',
  //     headerName: 'Дата',
  //     headerAlign: 'center',
  //     align: 'center',
  //     minWidth: 140,
  //     // flex: 1,
  //   },
  //   // ...stageStore.stages.map((stage) => {
  //   //   return {
  //   //     field: stage.label,
  //   //     sortable: false,
  //   //     headerAlign: 'center',
  //   //     align: 'center',
  //   //     minWidth: 140,
  //   //     flex: 1,

  //   //     // headerName: stage.label,
  //   //     renderHeader: (params) => (
  //   //       <Box
  //   //         sx={{
  //   //           color: stage.color,
  //   //         }}
  //   //       >
  //   //         {stage.label}
  //   //       </Box>
  //   //     ),
  //   //   };
  //   // }),

  //   {
  //     field: 'chatCount',
  //     headerName: 'Всего',
  //     headerAlign: 'center',
  //     align: 'center',
  //     minWidth: 100,
  //   },
  // ];

  // const dynamicRows = [
  //   { path: ['Неделя 41'], date: '01.09-04.09.23', id: 0 },
  //   { path: ['Неделя 41', 'Chat 1'], date: '1', id: 1 },
  //   { path: ['Неделя 41', 'Chat 2'], date: '2', id: 2 },
  //   { path: ['Неделя 42', 'Chat 11'], date: '3', id: 3 },
  //   { path: ['Неделя 42', 'Chat 22'], date: '4', id: 4 },
  // ];

  return (
    <Box sx={{ flexGrow: 1, width: { marginLeft: `65px`, marginTop: `65px` } }}>
      {/* <Stack spacing={2} sx={{ p: '20px' }}>
        <DataGridPro
          treeData
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
        <DataGridPro
          density="compact"
          treeData
          autoPageSize
          getTreeDataPath={(row) => row.path}
          rows={dynamicRecords}
          columns={columns}
          showCellVerticalBorder={true}
          autoHeight
          slots={{
            toolbar: GridToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={isLoading}
        />
      </Stack> */}
    </Box>
  );
});

export default AnalyticsPage;
