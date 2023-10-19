import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  ClickAwayListener,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/Info';
import ConversationMember from '../ConversationMember';
const CustomizedAccordion = styled(Accordion)(() => ({
  border: '0 !important',
  borderRadius: '0 !important',
  boxShadow: 'none !important',
}));

const ConversationMembers = ({ members }) => {
  const [open, setOpen] = React.useState(false);

  const info = {
    id: 3,
    value: 'yunooosz',
    type: 'TGNAME',
    infos: [
      {
        info: '\uD83D\uDCE7  ID: 5817798134\n\n\uD83D\uDDDD Регистрация: ≈фев,2023 (1 год)\n\uD83D\uDDC3 Изменения профиля: \n└   15.10.2023 - @yunooosz | Yasha | \n\n\uD83D\uDCF0 Группы: 1\n\n\uD83D\uDC6E‍♂️ Интересовались: только вы\n\uD83C\uDFC5 Репутация: (0)\uD83D\uDC4D (0)\uD83D\uDC4E',
        created: '2023-10-18T10:30:10.086038',
      },
    ],
    created: '2023-10-18T10:30:10.086038',
  };
  useEffect(() => {
    const fetchData = async () => {
      // console.log(members);
      // members?.map(async (member) => {
      //   const data = await getByUsername(member?.username);
      //   console.log(data);
      // });
      // const data = await Promise.all(promises);
    };

    fetchData();
  }, [members]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Card
      sx={{
        border: 0,
        borderRadius: 0,
        borderColor: 'transparent',
      }}
    >
      <CustomizedAccordion
        sx={{ border: 0, borderRadius: 0, borderBottomRightRadius: 0 }}
      >
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
            <>Участники чата</>
            <Box sx={{ fontWeight: '300', pl: '10px' }}>{members?.length}</Box>
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails
          sx={{
            p: 1,
            maxHeight: '245px',
            overflowY: 'auto',
          }}
        >
          <Stack>
            {members?.map((member, index) => {
              return <ConversationMember key={index} member={member} />;
            })}
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
};

export default ConversationMembers;
