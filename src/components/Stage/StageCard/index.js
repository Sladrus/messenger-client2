import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { chatCount, unreadCount } from '../../../utils/text';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { observer } from 'mobx-react-lite';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';

const StageCard = observer(({ stage, conversations, handleOpenEdit }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, stageStore } = useContext(StoreContext);

  const unreadLength = unreadCount(conversations);
  const renderType = (type) => {
    if (type === 'supergroup' || type === 'group')
      return <GroupsOutlinedIcon sx={{ fontSize: '20px', pr: '10px' }} />;
    if (type === 'private')
      return (
        <AccountCircleOutlinedIcon sx={{ fontSize: '20px', pr: '10px' }} />
      );
  };

  const handlePosition = (position) => {
    stageStore.setLoading(true);
    conversationStore.moveStage(socket, stage._id, position);
  };

  return (
    <Box
      sx={{
        height: '80px',
        p: '15px 20px',
        width: 'calc(100% - 40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        textAlign: 'left',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
          variant="subtitle1"
          fontWeight="bold"
        >
          {renderType(stage.type)}
          {stage.label}
        </Typography>
        {stageStore.isLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={20} />
          </Box>
        ) : (
          <MoreVertIcon
            sx={{ fontSize: '22px', color: '#00000099', cursor: 'pointer' }}
            onClick={() => handleOpenEdit(stage)}
          />
        )}
      </Box>
      <Typography
        sx={{
          textOveralow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
          height: '25px',
        }}
        variant="body2"
        color="textSecondary"
      >
        {conversations?.length} {chatCount(conversations?.length)}
        {unreadLength > 0 && (
          <Chip
            sx={{ ml: '15px', p: '0', height: '22px' }}
            label={`${unreadLength} непрочитанных`}
            size="small"
            color="primary"
          />
        )}
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <KeyboardArrowLeftIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => handlePosition(stage.position - 1)}
        />
        <Box
          sx={{
            background: stage?.color,
            width: 'calc(100% - 10px)',
            borderRadius: '15px',
            p: '5px 5px',
            // mt: 'auto',
          }}
        />
        <KeyboardArrowRightIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => handlePosition(stage.position + 1)}
        />
      </Box>
    </Box>
  );
});

export default StageCard;
