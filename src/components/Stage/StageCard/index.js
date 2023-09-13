import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import { chatCount, unreadCount } from '../../../utils/text';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StageCard = ({ stage, conversations }) => {
  const unreadLength = unreadCount(conversations);
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
          }}
          variant="subtitle1"
          fontWeight="bold"
        >
          {stage.label}
        </Typography>
        <MoreVertIcon
          sx={{ fontSize: '22px', color: '#00000099', cursor: 'pointer' }}
        />
      </Box>
      <Typography
        sx={{
          textOveralow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
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
          background: stage.color,
          width: 'calc(100% - 10px)',
          borderRadius: '15px',
          p: '5px 5px',
          mt: 'auto',
        }}
      />
    </Box>
  );
};

export default StageCard;
