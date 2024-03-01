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
import { checkScreeningInfo, getScreeningInfo } from '../../Api/ScoreApi';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { debounce, sleep } from '../../../utils/time';
const style = {
  position: 'absolute',
  maxHeight: '80%',
  top: '50%',
  left: '50%',
  width: '800px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 0,
  overflow: 'auto',
  overflowX: 'auto',
  textWrap: 'wrap',
};

const InfoModal = observer(({ show, closeModal, selectedMember }) => {
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = debounce(async (signal) => {
    setIsLoading(true);
    await sleep(5000);
    const info = await getScreeningInfo(selectedMember?.id, 'TGID', signal);
    if (info?.error === 'ERR_CANCELED') return;
    setInfo(info);

    setIsLoading(false);
  });

  useEffect(() => {
    if (!selectedMember?.id || !show) return;
    setInfo({ contacts: [] });
    fetchData();
  }, [show]);

  useEffect(() => {
    if (!selectedMember?.id || !show) return;
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, [show]);

  const checkUser = async () => {
    if (!selectedMember?.id && isLoading) return;
    await checkScreeningInfo(selectedMember?.id, 'TGID', true);
  };

  return (
    <>
      <Modal
        open={show}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  p: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  variant="subtitle2"
                  fontWeight="bold"
                >
                  Информация об участнике {selectedMember?.first_name}{' '}
                  {selectedMember?.last_name || ''} ({selectedMember?.id || ''})
                </Typography>
                {!info?.contacts?.length ? (
                  <LoadingButton
                    variant="contained"
                    size="small"
                    loading={isLoading}
                    onClick={checkUser}
                  >
                    Загрузить
                  </LoadingButton>
                ) : (
                  isLoading && <CircularProgress size={14} />
                )}
              </Box>
              <CloseIcon
                sx={{ cursor: 'pointer', p: '8px' }}
                onClick={closeModal}
              />
            </Box>
            <Divider sx={{ margin: 0 }} />
            <Stack spacing={1}>
              {info?.contacts?.length > 0 ? (
                info?.contacts?.map((contact, index) => (
                  <>
                    {contact?.infos?.length > 0 ? (
                      <>
                        <Box sx={{ p: '8px' }} key={index}>
                          {contact?.infos?.map((info) => {
                            return (
                              <Box>
                                <span>{contact?.type}</span>
                                <pre
                                  style={{
                                    whiteSpace: 'pre-wrap',
                                  }}
                                >
                                  {info?.info}
                                </pre>
                              </Box>
                            );
                          })}
                        </Box>
                        <Divider />
                      </>
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          p: '8px',
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                          }}
                        >
                          {isLoading ? (
                            <CircularProgress size={14} />
                          ) : (
                            <span>
                              Данные будут загружены в течении трех минут
                            </span>
                          )}
                        </Box>
                      </Box>
                    )}
                  </>
                ))
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    p: '8px',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={14} />
                    ) : (
                      <span>
                        Данные отсутствуют или будут загружены в течении трех
                        минут
                      </span>
                    )}
                  </Box>
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
