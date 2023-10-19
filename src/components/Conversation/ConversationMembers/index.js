import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import ConversationMember from '../ConversationMember';
const CustomizedAccordion = styled(Accordion)(() => ({
  border: '0 !important',
  borderRadius: '0 !important',
  boxShadow: 'none !important',
}));

const ConversationMembers = ({ members }) => {
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
