import React, { useContext, useEffect, useState } from 'react';
import './TaskPage.css';
import { Box, Typography, styled } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../context/store';
import { SocketContext } from '../../context/socket';

import { useNavigate } from 'react-router-dom/dist';
import { TimelineDot } from '@mui/lab';
import { taskColor } from '../../utils/time';
const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(0),
  height: 'calc(100vh - 82px)',
  textAlign: 'left',
}));

const TaskPage = observer(() => {
  const { socket } = useContext(SocketContext);
  const { taskStore, conversationStore } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleDateClick = (arg) => {
    conversationStore.setSelectedChatId(Number(arg.event.id));
    navigate('/messenger');
  };

  const renderEventContent = (eventInfo) => {
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '30px',
          width: '100%',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  textAlign: 'left',
                }}
                variant="subtitle2"
                fontWeight="bold"
              >
                {eventInfo?.event?.groupId}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
                textAlign: 'left',
              }}
              variant="subtitle2"
            >
              {eventInfo.timeText}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: '12px',
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
            }}
            variant="body2"
            color="textSecondary"
          >
            {eventInfo?.event?.title}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Item>
      <Box
        sx={{
          marginLeft: `65px`,
          marginTop: `65px`,
          height: '100%',
        }}
      >
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            eventContent={renderEventContent}
            events={taskStore?.tasks
              ?.filter((task) => !task.done && task?.type)
              ?.map((task) => ({
                id: task?.conversation?.chat_id,
                groupId: task?.type?.title,
                title: task?.text,
                date: new Date(task?.endAt).getTime(),
              }))}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
              omitZeroMinute: false,
              hour12: false,
            }}
            eventClick={handleDateClick}
          />
        </div>
      </Box>
    </Item>
  );
});

export default TaskPage;
