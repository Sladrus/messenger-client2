import { Avatar, Box, Card, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';
import { isToday } from '../../../utils/time';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 5,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const renderType = (type) => {
  if (type === 'supergroup' || type === 'group')
    return <GroupsOutlinedIcon sx={{ fontSize: '20px' }} />;
  if (type === 'private')
    return <AccountCircleOutlinedIcon sx={{ fontSize: '20px' }} />;
};

const ConversationItem = observer(({ conversation, onClick, dataChatId }) => {
  const { conversationStore } = useContext(StoreContext);

  return (
    <Card
      data-chat-id={dataChatId}
      onClick={onClick}
      sx={{
        background:
          conversationStore.selectedChatId === conversation?.chat_id
            ? '#f1f1f1'
            : 'white',
        display: 'flex',
        alignItems: 'start',
        padding: '10px',
        borderRadius: 0,
        height: '44px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <StyledBadge
        sx={{ marginRight: '10px' }}
        badgeContent={conversation?.unreadCount}
        max={99}
        color="primary"
      >
        <Avatar
          alt={conversation?.title}
          sx={{ background: conversation?.stage.color }}
        ></Avatar>
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
            flexDirection: 'row',
            alignItems: 'end',
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
            {conversation?.title}
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
        <Box
          sx={{
            height: '100%',
            width: '100%',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'end',
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
            variant="body2"
            color="textSecondary"
          >
            {conversation?.lastMessage.text}
          </Typography>
          {renderType(conversation?.type)}
        </Box>
      </Box>
    </Card>
  );
});

export default ConversationItem;
