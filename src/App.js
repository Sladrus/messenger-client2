import AppRoutes from './pages/AppRoutes';
import './App.css';
import { SocketContext, socket } from './context/socket';
import {
  StoreContext,
  userStore,
  conversationStore,
  stageStore,
  tagsStore,
  taskStore,
} from './context/store';
import React from 'react';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SocketContext.Provider value={{ socket }}>
      <StoreContext.Provider
        value={{
          userStore,
          conversationStore,
          stageStore,
          tagsStore,
          taskStore,
        }}
      >
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <AppRoutes />
        </SnackbarProvider>
      </StoreContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
