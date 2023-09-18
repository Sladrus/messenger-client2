import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';

import TaskDateButton from '../../Button/TaskDateButton';
import TaskTypeAutocomplete from '../../Autocomplete/TaskTypeAutocomplete';
import SimpleTextarea from '../../Textarea/SimpleTextarea';
import TaskButton from '../../Button/TaskButton';
import AddIcon from '@mui/icons-material/Add';
import { observer } from 'mobx-react-lite';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';

const CustomizedAccordion = styled(Accordion)(() => ({
  border: '0 !important',
  borderRadius: '0 !important',
  boxShadow: 'none !important',
}));

const ConversationTask = observer(({ conversation }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, taskStore } = useContext(StoreContext);

  const [type, setType] = useState('');

  const handleChangeType = (e, value, reason, details) => {
    e.preventDefault();
    setType(value);
    // if (reason === 'createOption') {
    //   taskStore.createTaskType(socket, conversation?._id, details.option);
    // }
  };

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: '0px 15px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Добавить задачу
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0 }}>
          <Stack spacing={1} sx={{ p: '10px 0px' }}>
            <TaskTypeAutocomplete
              value={type}
              types={taskStore.taskTypes}
              onChange={handleChangeType}
              isLoading={taskStore.isTypesLoading}
            />
            <TaskDateButton />
            <SimpleTextarea placeholder={'Введите текст задачи'} />
            <TaskButton text={'Создать'} Icon={AddIcon} />
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationTask;
