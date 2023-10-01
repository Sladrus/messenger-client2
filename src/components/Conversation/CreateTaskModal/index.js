import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  Stack,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../context/store';
import { SocketContext } from '../../../context/socket';
import TaskDateButton from '../../Button/TaskDateButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

const CreateTaskModal = observer(({ show, closeModal }) => {
  const { socket } = useContext(SocketContext);
  const { conversationStore, taskStore } = useContext(StoreContext);
  const [selectedType, setSelectedType] = useState('');
  const [text, setText] = useState('');
  const [endAt, setEndAt] = useState('');

  const handleCreate = () => {
    conversationStore.createTask(
      socket,
      conversationStore?.selectedConversation.chat_id,
      {
        type: selectedType?.title || selectedType?.option,
        text,
        endAt,
      }
    );
    setSelectedType('');
    setText('');
    setEndAt('');
    closeModal();
  };

  const handleDate = (date) => {
    setEndAt(new Date(date));
  };

  const handleTypeChange = (event, value, reason, details) => {
    if (reason === 'clear') {
      return setSelectedType('');
    }
    if (reason === 'createOption') {
      setSelectedType({ title: value });
      return taskStore.createTaskType(socket, value);
    }
    setSelectedType(value);
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'object' && option !== null && option.title) {
      return option.title;
    }

    return String(option);
  };

  const onChange = (e) => {
    if (e.target.value) setSelectedType({ title: e.target.value });
    else setSelectedType('');
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
          <Card sx={{ p: '10px', width: '400px' }}>
            <form>
              <Stack spacing={2}>
                <Autocomplete
                  required
                  freeSolo
                  // createoption={createOption}
                  disabled={taskStore.isTypesLoading}
                  placeholder="Выберите тип"
                  label="Тип"
                  variant="standard"
                  value={selectedType}
                  options={taskStore?.taskTypes || []}
                  onChange={handleTypeChange}
                  getOptionLabel={getOptionLabel}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={onChange}
                      label="Выберите тип задачи"
                    />
                  )}
                />
                <TaskDateButton
                  disabled={taskStore.isTypesLoading}
                  onChange={handleDate}
                />
                <TextField
                  disabled={taskStore.isTypesLoading}
                  required
                  multiline
                  rows={4}
                  label="Текст задачи"
                  variant="outlined"
                  onChange={(e) => setText(e.target.value)}
                />
                {conversationStore.taskIsLoading ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    disabled={taskStore.isTypesLoading}
                    variant="text"
                    onClick={handleCreate}
                  >
                    Создать
                  </Button>
                )}
              </Stack>
            </form>
          </Card>
        </Box>
      </Modal>
    </>
  );
});

export default CreateTaskModal;
