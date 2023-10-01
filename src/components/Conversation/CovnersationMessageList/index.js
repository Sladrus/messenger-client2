import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  CircularProgress,
  Fab,
  Stack,
  Typography,
} from '@mui/material';
import Avatar from '@mui/joy/Avatar';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../context/store';
import { formatDate, isTodayUnix, taskColor } from '../../../utils/time';
import { generatePastelColor } from '../../../utils/color';
import Badge from '@mui/material/Badge';
import env from 'react-dotenv';
import DescriptionIcon from '@mui/icons-material/Description';
import { FixedSizeList as List } from 'react-window';
import { TimelineDot } from '@mui/lab';
import { SocketContext } from '../../../context/socket';
import CheckIcon from '@mui/icons-material/Check';

const token = env.BOT_TOKEN;

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(0),
  paddingTop: '10px',
  flex: '1 1 auto', // Takes up remaining height of parent container
  overflow: 'auto', // Enables scrolling if content overflows
  display: 'flex',
  flexDirection: 'column',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const EventMessage = observer(({ message }) => {
  return (
    <Box
      sx={{
        p: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // changed 'end' to 'flex-end' and 'start' to 'flex-start'
      }}
    >
      <Stack sx={{ maxWidth: 'calc(100% - 60px)' }}>
        {message?.unread && (
          <StyledBadge badgeContent={'Новое'} color="primary" />
        )}
        <Card
          sx={{
            minWidth: '100px',
            position: 'relative', // removed the dynamic positioning
            textAlign: 'center',
            borderRadius: '10px',
            p: '5px 10px',
            background: '#fff', // added background color based on 'isSentByMe'
            border: '1px solid #e0e0e0', // added border based on 'isSentByMe'
            boxShadow: 'none', // remove box shadow
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '14px',
                whiteSpace: 'pre-line',
                fontWeight: 500,
              }}
            >
              {message?.text}
            </span>
            <span
              style={{
                textAlign: 'center',
                fontSize: '12px',
                color: '#a9a9a9',
              }}
            >
              {isTodayUnix(message?.date)}
            </span>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
});

const TaskMessage = observer(({ message }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore } = useContext(StoreContext);

  const formattedDate = formatDate(message?.task?.endAt);

  const handleClickDone = (id) => {
    conversationStore.doneTask(socket, id);
  };

  return (
    <Box
      sx={{
        p: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // changed 'end' to 'flex-end' and 'start' to 'flex-start'
      }}
    >
      <Stack sx={{ maxWidth: 'calc(100% - 60px)' }}>
        {message?.unread && (
          <StyledBadge badgeContent={'Новое'} color="primary" />
        )}
        <Card
          sx={{
            minWidth: '500px',
            maxWidth: '500px',

            position: 'relative',
            textAlign: 'center',
            borderRadius: '10px',
            p: '5px 10px',
            background: '#fff',
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              textAlign: 'center',
            }}
            variant="subtitle3"
            color="textSecondary"
          >
            Задача добавлена
          </Typography>
          <Box
            key={message?.task?._id}
            sx={{
              display: 'flex',
              p: '8px 6px',
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
                      backgroundColor: taskColor(message?.task),
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
                    {message?.task?.type?.title}
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
                {message?.task?.text}
              </Typography>
            </Box>
            {!message?.task?.done && conversationStore.taskLoading ? (
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
              !message?.task?.done && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckIcon
                    sx={{ m: '0 10px', cursor: 'pointer' }}
                    onClick={() => handleClickDone(message?.task?._id)}
                  />
                </Box>
              )
            )}
          </Box>
        </Card>
      </Stack>
    </Box>
  );
});

const LoadingMessage = observer(() => {
  return (
    <Box
      sx={{
        p: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Stack>
        <Card
          sx={{
            minWidth: '100px',
            position: 'relative',
            textAlign: 'left',
            borderRadius: '10px',
            p: '5px 10px',
            background: '#dcf8c6',
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          <Box sx={{}}>
            <CircularProgress size={16} />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
});

const TextMessage = observer(({ message, isSentByMe }) => {
  const fullName =
    message.from.first_name +
    (message.from.last_name ? ' ' + message.from.last_name : '');
  const color = generatePastelColor(fullName || message.from._id);
  return (
    <Box
      sx={{
        p: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
      }}
    >
      {!isSentByMe && (
        <Avatar sx={{ mr: '10px', background: color }} variant="soft" size="sm">
          N
        </Avatar>
      )}
      <Stack sx={{ maxWidth: 'calc(100% - 60px)' }}>
        {message?.unread && (
          <StyledBadge badgeContent={'Новое'} color="primary" />
        )}
        <Card
          sx={{
            minWidth: '100px',
            position: 'relative',
            textAlign: 'left',
            borderRadius: '10px',
            p: '5px 10px',
            background: isSentByMe ? '#dcf8c6' : '#fff',
            border: isSentByMe ? '1px solid #e0e0e0' : '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          {!isSentByMe && (
            <Typography
              sx={{ fontSize: '12px', fontWeight: 500 }}
              variant="caption"
              display="block"
              component="span"
              color={color}
            >
              {fullName}
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
              {message.text}
            </span>
            <span
              style={{
                textAlign: !isSentByMe ? 'right' : 'left',
                fontSize: '12px',
                color: '#a9a9a9',
              }}
            >
              {isTodayUnix(message.date)}
            </span>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
});

const PhotoMessage = observer(({ message, isSentByMe }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const { conversationStore } = useContext(StoreContext);

  useEffect(() => {
    console.log(message);
    if (conversationStore?.selectedConversation?.type === 'private') {
      console.log(env.SERVER_PHOTO_URL, env.SERVER_URL);
      setPhotoUrl(`http://13.79.115.102/photo/${message?.photo}.jpg`);
    } else {
      fetch(
        `https://api.telegram.org/bot${token}/getFile?file_id=${
          message?.photo[message?.photo?.length - 1]?.file_id
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          // URL-адрес фото находится в свойстве file_path объекта File
          const url = `https://api.telegram.org/file/bot${token}/${data.result.file_path}`;
          setPhotoUrl(url);
        });
    }
  }, []);

  const fullName =
    message.from.first_name +
    (message.from.last_name ? ' ' + message.from.last_name : '');

  const color = generatePastelColor(fullName || message.from._id);
  return (
    <Box
      sx={{
        p: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
      }}
    >
      {!isSentByMe && (
        <Avatar sx={{ mr: '10px', background: color }} variant="soft" size="sm">
          N
        </Avatar>
      )}
      <Stack sx={{ maxWidth: 'calc(100% - 60px)' }}>
        {message?.unread && (
          <StyledBadge badgeContent={'Новое'} color="primary" />
        )}
        <Card
          sx={{
            minWidth: '100px',
            position: 'relative',
            textAlign: 'left',
            borderRadius: '10px',
            background: isSentByMe ? '#dcf8c6' : '#fff',
            border: isSentByMe ? '1px solid #e0e0e0' : '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <img
              style={{ objectFit: 'fill' }}
              src={photoUrl}
              alt={photoUrl}
              loading="lazy"
            />
            <Box
              sx={{
                padding: '5px 10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  whiteSpace: 'pre-line',
                }}
              >
                {message?.text}
              </span>
              <span
                style={{
                  textAlign: !isSentByMe ? 'right' : 'left',
                  fontSize: '12px',
                  color: '#a9a9a9',
                  // m: '10px 15px',
                }}
              >
                {isTodayUnix(message.date)}
              </span>
            </Box>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
});

const DocumentMessage = observer(({ message, isSentByMe }) => {
  const [documentUrl, setDocumentUrl] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.telegram.org/bot${token}/getFile?file_id=${message.document.file_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        // URL-адрес фото находится в свойстве file_path объекта File
        const url = `https://api.telegram.org/file/bot${token}/${data.result?.file_path}`;
        setDocumentUrl(url);
      });
  }, []);

  const fullName =
    message.from.first_name +
    (message.from.last_name ? ' ' + message.from.last_name : '');

  const color = generatePastelColor(fullName || message.from._id);
  return (
    <Box
      sx={{
        p: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
      }}
    >
      {!isSentByMe && (
        <Avatar sx={{ mr: '10px', background: color }} variant="soft" size="sm">
          N
        </Avatar>
      )}
      <Stack>
        {message?.unread && (
          <StyledBadge badgeContent={'Новое'} color="primary" />
        )}
        <Card
          sx={{
            minWidth: '100px',
            position: 'relative',
            textAlign: 'left',
            borderRadius: '10px',
            p: '5px 10px',
            background: isSentByMe ? '#dcf8c6' : '#fff',
            border: isSentByMe ? '1px solid #e0e0e0' : '1px solid #e0e0e0',
            boxShadow: 'none',
          }}
        >
          {!isSentByMe && (
            <Typography
              sx={{ fontSize: '12px', fontWeight: 500 }}
              variant="caption"
              display="block"
              component="span"
              color={color}
            >
              {fullName}
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '14px',
                whiteSpace: 'pre-line',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <DescriptionIcon sx={{ pr: '5px' }} />
              <a href={documentUrl} target="_blank" rel="noopener noreferrer">
                {message.document.file_name}
              </a>
            </span>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  whiteSpace: 'pre-line',
                }}
              >
                {message?.text}
              </span>
              <span
                style={{
                  textAlign: !isSentByMe ? 'right' : 'left',
                  fontSize: '12px',
                  color: '#a9a9a9',
                }}
              >
                {isTodayUnix(message.date)}
              </span>
            </Box>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
});

const ConversationMessageList = observer(() => {
  const { conversationStore, userStore } = useContext(StoreContext);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'end',
      });
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: 'auto',
          block: 'end',
        });
      }, 1); // Add a delay of 1 second (1000 milliseconds)
    }
  }, [
    conversationStore.selectedConversation,
    conversationStore.selectedConversation?.messages?.length,
  ]);
  return (
    <Item>
      <Stack spacing={1}>
        {conversationStore.selectedConversation?.messages?.map((message) => {
          if (message.type === 'text') {
            return (
              <TextMessage
                key={message._id}
                message={message}
                isSentByMe={message?.from?.id === userStore.user._id}
              />
            );
          }
          if (message.type === 'photo') {
            return (
              <PhotoMessage
                key={message._id}
                message={message}
                isSentByMe={message.sender === 'me'}
              />
            );
          }
          if (message.type === 'event') {
            return <EventMessage key={message._id} message={message} />;
          }
          if (message.type === 'task') {
            return <TaskMessage key={message._id} message={message} />;
          }
          if (message.type === 'document') {
            return <DocumentMessage key={message._id} message={message} />;
          }
        })}
        {conversationStore.messageLoading && <LoadingMessage />}
        <span ref={messagesEndRef}></span>
      </Stack>
    </Item>
  );
});

export default ConversationMessageList;
