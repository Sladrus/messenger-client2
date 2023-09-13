import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';

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
          <Typography variant="subtitle2" fontWeight="bold">
            Участники чата
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
              const fullName =
                member.first_name +
                (member.last_name ? ' ' + member.last_name : '');
              return (
                <Box
                  key={index}
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
                      maxWidth: '200px', // Adjust this value as per your requirements
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        maxWidth: '200px', // Adjust this value as per your requirements
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
                        maxWidth: '200px', // Adjust this value as per your requirements
                      }}
                      variant="body2"
                      color="textSecondary"
                    >
                      {member?.username}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
};

export default ConversationMembers;
