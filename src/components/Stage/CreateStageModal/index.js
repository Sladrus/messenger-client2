import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../context/store';
import { SocketContext } from '../../../context/socket';
import { TwitterPicker } from 'react-color';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

const CreateStageModal = observer(({ show, handleClose }) => {
  const { socket } = useContext(SocketContext);
  const { stageStore } = useContext(StoreContext);

  const [color, setColor] = useState('white');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('group');

  const handleColorChange = (color, event) => {
    setColor(color.hex);
  };

  const handleClick = () => {
    stageStore.createStage(socket, { label, value, color, type });
    handleClose();
  };

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ p: '10px' }}>
            <form>
              <Stack spacing={2}>
                <TextField
                  required
                  label="Название"
                  variant="standard"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
                <TextField
                  required
                  label="Ключ"
                  variant="standard"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <TwitterPicker
                  width="100%"
                  triangle="hide"
                  color={color}
                  onChange={handleColorChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Age"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value={'group'}>Группа</MenuItem>
                    <MenuItem value={'private'}>Личка</MenuItem>
                  </Select>
                </FormControl>
                {stageStore.isLoading ? (
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
                  <Button variant="text" onClick={handleClick}>
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

export default CreateStageModal;
