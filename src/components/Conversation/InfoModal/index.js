import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/store';
import { SocketContext } from '../../../context/socket';
import TaskDateButton from '../../Button/TaskDateButton';
import { getScreeningInfo } from '../../Api/ScoreApi';
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '600px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 0,
};

const InfoModal = observer(({ show, closeModal, selectedMember }) => {
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInfo({ contacts: [] });
    const fetchData = async () => {
      setIsLoading(true);
      const info = await getScreeningInfo(selectedMember?.id, 'TGID');
      setInfo(info);
      setIsLoading(false);
    };

    fetchData();
  }, [selectedMember]);

  return (
    <>
      <Modal
        open={show}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{}}>
            <Box sx={{ p: '8px' }}>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                variant="subtitle2"
                fontWeight="bold"
              >
                <>
                  Информация об участнике {selectedMember?.first_name}{' '}
                  {selectedMember?.last_name || ''} ({selectedMember?.id || ''})
                </>
                {isLoading && (
                  <Box
                    sx={{
                      pl: '10px',
                    }}
                  >
                    <CircularProgress size={14} />
                  </Box>
                )}
                <CloseIcon sx={{ cursor: 'pointer' }} onClick={closeModal} />
              </Typography>
            </Box>
            <Divider sx={{ margin: 0 }} />
            <Stack spacing={1}>
              {info?.contacts?.length > 0 ? (
                info?.contacts?.map((contact, index) => (
                  <>
                    {contact?.infos?.length > 0 && (
                      <>
                        <Box sx={{ p: '8px' }} key={index}>
                          {contact?.infos?.map((info) => {
                            return (
                              <Box>
                                <span>{contact?.type}</span>
                                <pre>{info?.info}</pre>
                              </Box>
                            );
                          })}
                        </Box>
                        <Divider />
                      </>
                    )}
                  </>
                ))
              ) : (
                <Box sx={{ p: '8px' }}>
                  <span>Данные отсутствуют или еще не загружены</span>
                </Box>
              )}
            </Stack>
          </Card>
        </Box>
      </Modal>
    </>
  );
});

export default InfoModal;
