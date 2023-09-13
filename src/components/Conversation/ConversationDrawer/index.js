import React, { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { Box, CircularProgress, Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ConversationDetails from '../ConversationDetails';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../context/store';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const ConversationDrawer = observer(({ open, handleDrawerClose }) => {
  const { conversationStore } = useContext(StoreContext);

  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {conversationStore.isLoading || conversationStore.selectedIsLoading ? (
        <Box
          sx={{
            height: 'calc(100% - 65px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ConversationDetails />
      )}
    </Drawer>
  );
});

export default ConversationDrawer;
