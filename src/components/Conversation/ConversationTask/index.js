import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';

import { observer } from 'mobx-react-lite';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';
import CheckIcon from '@mui/icons-material/Check';
import { formatDate, isToday, taskColor } from '../../../utils/time';
import { LoadingButton, TimelineDot } from '@mui/lab';

const CustomizedAccordion = styled(Accordion)(() => ({
  border: '0 !important',
  borderRadius: '0 !important',
  boxShadow: 'none !important',
}));

const ConversationTask = observer(({ conversation, openModal, isLoading }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore } = useContext(StoreContext);

  const handleClickDone = (id) => {
    conversationStore.doneTask(socket, id);
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
          <Typography
            sx={{ display: 'flex' }}
            variant="subtitle2"
            fontWeight="bold"
          >
            <>Задачи</>
            <Box sx={{ fontWeight: '300', pl: '10px' }}>
              {conversation?.tasks?.length}
            </Box>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0 }}>
          <Stack>
            {conversation?.tasks?.length > 0 ? (
              conversation?.tasks?.map((task) => {
                const formattedDate = formatDate(task?.endAt);
                return (
                  <Box
                    key={task._id}
                    sx={{
                      display: 'flex',
                      p: '10px 8px',
                      minHeight: '30px',
                    }}
                  >
                    <Box sx={{ p: '0px 8px', width: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimelineDot
                            sx={{
                              backgroundColor: taskColor(task),
                              width: '1px',
                              m: '4px 5px 0 0',
                              p: '2px',
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: '12px',
                              textAlign: 'left',
                            }}
                            variant="subtitle2"
                            fontWeight="bold"
                          >
                            {task?.type?.title}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            textAlign: 'left',
                          }}
                          variant="subtitle2"
                        >
                          {formattedDate}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: '12px',
                          textAlign: 'left',
                        }}
                        variant="body2"
                        color="textSecondary"
                      >
                        {task?.text}
                      </Typography>
                    </Box>
                    {!task?.done && conversationStore.taskLoading ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <CircularProgress
                          sx={{
                            p: '1px',
                          }}
                          size={16}
                        />
                      </Box>
                    ) : (
                      !task?.done && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CheckIcon
                            sx={{ m: '0 10px', cursor: 'pointer' }}
                            onClick={() => handleClickDone(task?._id)}
                          />
                        </Box>
                      )
                    )}
                  </Box>
                );
              })
            ) : (
              <Typography
                sx={{
                  fontSize: '12px',
                  textAlign: 'center',
                  p: 1,
                }}
                variant="body2"
                color="textSecondary"
              >
                Задачи отсутствуют. Нажмите кнопку, чтобы добавить задачу.
              </Typography>
            )}
            <LoadingButton
              sx={{ m: '5px 15px' }}
              variant="contained"
              size="small"
              loading={isLoading}
              onClick={openModal}
            >
              Создать
            </LoadingButton>
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationTask;
