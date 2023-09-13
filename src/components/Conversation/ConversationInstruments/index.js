import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import StatusSelect from '../../Select/StatusSelect';
import UserSelect from '../../Select/UserSelect';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';
import { SocketContext } from '../../../context/socket';

const CustomizedAccordion = styled(Accordion)(() => ({
  border: '0 !important',
  borderRadius: '0 !important',
  boxShadow: 'none !important',
}));

const ConversationInstruments = observer(({ conversation }) => {
  const { socket } = useContext(SocketContext);
  const { userStore, stageStore, conversationStore } = useContext(StoreContext);

  const changeStage = (e) => {
    conversationStore.changeStage(socket, conversation._id, e?.target?.value);
  };

  const changeUser = (e) => {
    conversationStore.changeUser(socket, conversation._id, e?.target?.value);
  };

  const clearUser = (e) => {
    conversationStore.changeUser(socket, conversation._id, null);
  };

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion defaultExpanded>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: '0px 15px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Подробнее
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0 }}>
          <Stack spacing={1} sx={{ p: '10px 0' }}>
            <StatusSelect
              stage={conversation?.stage}
              stages={stageStore?.stages}
              isLoading={conversationStore.stageLoading}
              onChange={changeStage}
            />
            <UserSelect
              user={conversation?.user}
              users={userStore?.users}
              isLoading={conversationStore.userLoading}
              onChange={changeUser}
              onClear={clearUser}
            />
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationInstruments;
