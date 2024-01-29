import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Card,
  Chip,
  CircularProgress,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import env from 'react-dotenv';
import SendSelect from '../../Select/SendSelect';
import SendMethodSelect from '../../Select/SendMethodSelect';
import { percentageDifference } from '../../../utils/percentageDifference';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import { debounce } from '../../../utils/time';
import makeCancelable from 'makecancelable';
import { MoreVert } from '@mui/icons-material';
import { SocketContext } from '../../../context/socket';
import { StoreContext } from '../../../context/store';

const CustomizedAccordion = styled(Accordion)`
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
`;

const ConversationSources = observer(({ conversation }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, userStore } = useContext(StoreContext);
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getClient(chat_id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.moneyport.world/getClient?chat_id=${chat_id}`,
        { headers: { 'x-api-key': `${env.API_TOKEN}` } }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getClient(conversation?.chat_id)
      .then((data) => {
        setClient(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <CustomizedAccordion>
        <AccordionSummary
          sx={{ border: 0, borderRadius: 0, p: '0px 12px', zIndex: '10' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            variant="subtitle2"
            fontWeight="bold"
          >
            <>Источники</>
            {isLoading && (
              <Box
                sx={{
                  pl: '10px',
                }}
              >
                <CircularProgress size={14} />
              </Box>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, borderRadius: 0, zIndex: '10' }}>
          <Stack
            spacing={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '10px 12px',
              gap: '6px',
            }}
          >
            {' '}
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              variant="body2"
              color="textSecondary"
            >
              {/* <MoreVert
                fontSize="small"
                sx={{ pr: '15px', fontSize: '18px', pb: '2px' }}
              /> */}
              {isLoading ? (
                <Box>
                  <CircularProgress size={14} />
                </Box>
              ) : (
                <Box sx={{ textAlign: 'left' }}>
                  <b>{'UTMS'}:</b>
                  <Box sx={{ pl: '16px' }}>
                    <div>
                      Campaign: <b>{client?.utms?.campaign || ''}</b>
                    </div>
                    <div>
                      Content: <b>{client?.utms?.content || ''}</b>
                    </div>
                    <div>
                      Medium: <b>{client?.utms?.medium || ''}</b>
                    </div>
                    <div>
                      Source: <b>{client?.utms?.source || ''}</b>
                    </div>
                    <div>
                      Term: <b>{client?.utms?.term || ''}</b>
                    </div>
                  </Box>
                </Box>
              )}
            </Typography>
            {conversation?.refLink?.length > 0 && (
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                variant="body2"
                color="textSecondary"
              >
                {/* <MoreVert
                  fontSize="small"
                  sx={{ pr: '15px', fontSize: '18px', pb: '2px' }}
                /> */}
                {isLoading ? (
                  <Box>
                    <CircularProgress size={14} />
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'left' }}>
                    <b>Каналы:</b>
                    {conversation?.refLink?.map((link) => {
                      return (
                        <Box sx={{ pl: '16px' }}>
                          <div>{link?.chat.chatName || ''}</div>
                          <div>{link?.name || ''}</div>
                          <div>{link?.link || ''}</div>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Typography>
            )}
          </Stack>
        </AccordionDetails>
      </CustomizedAccordion>
      <Divider />
    </Card>
  );
});

export default ConversationSources;
