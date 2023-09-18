import { Avatar, Badge, Box, Card, Chip, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { isToday } from '../../../utils/time';
import { styled } from '@mui/material/styles';
import LinkIcon from '@mui/icons-material/Link';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../context/store';
import { useNavigate } from 'react-router-dom';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 5,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StageConversationCard = observer(({ conversation }) => {
  const navigate = useNavigate();
  const { conversationStore } = useContext(StoreContext);

  const handleSelectConversation = (chat_id) => {
    conversationStore.setSelectedChatId(chat_id);
    navigate('/messenger');
  };

  const renderType = (type) => {
    if (type === 'supergroup' || type === 'group')
      return <GroupsOutlinedIcon sx={{ fontSize: '20px' }} />;
    if (type === 'private')
      return <AccountCircleOutlinedIcon sx={{ fontSize: '20px' }} />;
  };

  const renderAvatar = (type) => {
    if (type === 'supergroup' || type === 'group') return <GroupsIcon />;
    if (type === 'private') return <PersonIcon />;
  };

  return (
    <Card
      onClick={() => handleSelectConversation(conversation.chat_id)}
      sx={{
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'space-between',
        m: '5px 10px',
        p: '10px',
        // height: '64px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'center',
          textAlign: 'left',
        }}
      >
        <StyledBadge
          sx={{ marginRight: '10px' }}
          badgeContent={conversation?.unreadCount}
          max={99}
          color="primary"
        >
          <Avatar
            alt={conversation.name}
            sx={{ background: conversation.stage.color }}
          >
            {renderAvatar(conversation?.type)}
          </Avatar>
        </StyledBadge>
        <Box
          sx={{
            width: 'calc(100% - 50px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            textAlign: 'left',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
              }}
              variant="subtitle2"
              fontWeight="bold"
            >
              {conversation.title}
            </Typography>
            <Typography
              sx={{
                height: '100%',
                width: '80px',
                textAlign: 'right',
                whiteSpace: 'nowrap',
                ml: 'auto', // Aligns the time to the right
              }}
              color={'textSecondary'}
              variant="body2"
            >
              {isToday(conversation?.updatedAt)}
            </Typography>
          </Box>
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '100%',
            }}
            variant="body2"
            color="textSecondary"
          >
            {conversation?.lastMessage?.text}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          pt: '5px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          {renderType(conversation?.type)}
          <>
            <Box sx={{ width: '100%', display: 'flex' }}>
              {conversation?.tags?.map((tag) => {
                return (
                  <Chip
                    sx={{ ml: '5px', fontSize: '11px' }}
                    key={tag?._id}
                    label={tag?.value}
                    size="small"
                    variant="outlined"
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
              }}
            >
              <LinkIcon sx={{ fontSize: '18px' }} />
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textAlign: 'right',
                  pl: '5px',
                }}
                variant="body2"
                color="textSecondary"
              >
                {conversation?.user?.username}
              </Typography>
            </Box>
          </>
        </Box>
      </Box>
    </Card>
  );
});

export default StageConversationCard;
