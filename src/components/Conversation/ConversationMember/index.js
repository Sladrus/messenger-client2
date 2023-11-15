import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { getByUsername } from '../../Api/ScoreApi';

const ConversationMember = ({ member }) => {
  const fullName =
    member.first_name + (member.last_name ? ' ' + member.last_name : '');
  const [open, setOpen] = React.useState(false);

  const [info, setInfo] = useState({ infos: [] });

  useEffect(() => {
    const fetchData = async () => {
      const info = await getByUsername(member?.id);
      setInfo(info);
    };

    fetchData();
  }, []);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          p: '5px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ width: 28, height: 28, mr: '13px' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            textAlign: 'left',
            maxWidth: '200px',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '200px',
            }}
            variant="subtitle2"
            fontWeight="bold"
          >
            {fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '200px',
            }}
            variant="body2"
            color="textSecondary"
          >
            {member?.username}
          </Typography>
        </Box>
      </Box>
      <Tooltip
        arrow
        placement="top"
        onClose={handleTooltipClose}
        open={open}
        title={
          info?.infos?.length
            ? info?.infos[0].info
            : 'Данные отсутствуют или еще не загружены'
        }
      >
        <InfoIcon
          sx={{ color: '#ccc', cursor: 'pointer', mr: '5px' }}
          onClick={handleTooltipOpen}
        />
      </Tooltip>
    </Box>
  );
};

export default ConversationMember;
