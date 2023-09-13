import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './AuthPage.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { StoreContext } from '../../context/store';
import { SocketContext } from '../../context/socket';

const AuthPage = observer(() => {
  const { socket } = useContext(SocketContext);
  const { userStore } = useContext(StoreContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await userStore.login(socket, { username, password });
  }

  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 0',
          }}
        >
          <Box
            sx={{
              width: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                height: '180px',
                width: '180px',

                borderRadius: 10,
              }}
              alt="The house from the offer."
              src={
                'https://store-images.s-microsoft.com/image/apps.12376.13537716651231321.3067a421-6c2f-48a9-b77c-1e38e19146e6.f539b24d-6328-4c00-9469-2d6d841667e6'
              }
            />
            <Box
              sx={{
                padding: '25px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography whiteSpace={'nowrap'} fontWeight={500} variant="h4">
                Moneyport Messenger
              </Typography>
              <Typography whiteSpace={'nowrap'} fontWeight={400} variant="h7">
                Введите логин и пароль, чтобы войти
              </Typography>
            </Box>
          </Box>

          {userStore.isLoading ? (
            <Box sx={{ height: '209px', display: 'flex' }}>
              <CircularProgress
                sx={{ margin: '15px', alignSelf: 'center' }}
                size={60}
              />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack>
                <TextField
                  sx={{ margin: '10px' }}
                  required
                  value={username}
                  onChange={handleUsername}
                  label="Username"
                  variant="outlined"
                  autoComplete="username"
                />
                <TextField
                  sx={{ margin: '10px' }}
                  required
                  value={password}
                  onChange={handlePassword}
                  label="Password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  sx={{ margin: '10px' }}
                  variant="outlined"
                >
                  Войти
                </Button>
              </Stack>
            </form>
          )}
        </Box>
      </Container>
    </div>
  );
});

export default AuthPage;
