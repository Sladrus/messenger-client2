import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import TagAutocompelte from '../../Autocomplete/TagAutocomplete';
import CommentAutocomplete from '../../Autocomplete/CommentAutocomplete';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';

const CustomizedAccordion = styled(Accordion)(() => ({
  border: '0 !important',
  borderRadius: '0 !important',
  boxShadow: 'none !important',
}));

const ConversationNotes = observer(({ conversation }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, tagsStore } = useContext(StoreContext);

  const changeTags = (e, value, reason, details) => {
    if (reason === 'createOption') {
      conversationStore.createTag(socket, conversation?._id, details.option);
    } else conversationStore.changeTags(socket, conversation?._id, value);
  };

  const createComment = (e, value) => {
    e.preventDefault();
    conversationStore.createComment(socket, conversation?.chat_id, value);
  };

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion defaultExpanded>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: '0px 15px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Заметки
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0 }}>
          <Stack spacing={0} sx={{ p: '10px 0' }}>
            <TagAutocompelte
              tags={conversation?.tags}
              convTags={tagsStore?.tags}
              onChange={changeTags}
              isLoading={conversationStore.tagsLoading}
            />
            <CommentAutocomplete
              isLoading={conversationStore.commentLoading}
              onSubmit={createComment}
            />
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationNotes;
