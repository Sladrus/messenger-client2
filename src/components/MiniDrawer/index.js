import React, { useEffect, useState, useContext } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { authRoutes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Logout } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { SocketContext } from '../../context/socket';
import { StoreContext } from '../../context/store';
const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `64px`,
  [theme.breakpoints.up('sm')]: {
    width: `64px`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const MiniDrawer = observer(() => {
  const { socket } = useContext(SocketContext);
  const { userStore } = useContext(StoreContext);

  const [selectedPath, setSelectedPath] = useState(window.location.pathname);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    setSelectedPath(path);
    navigate(path);
  };

  useEffect(() => {
    setSelectedPath(window.location.pathname);
  }, [window.location.pathname]);

  const logout = () => {
    userStore.logout(socket);
  };

  return (
    <Drawer variant="permanent" open={false}>
      <List
        sx={{
          padding: 0,
          height: '100%',
        }}
      >
        {authRoutes.map(({ title, Icon, path }, index) => (
          <ListItem
            key={title}
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => navigateTo(path)}
          >
            <ListItemButton
              sx={{
                background: selectedPath === path ? '#f5f5f5' : '',
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                {<Icon color="action" />}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItemButton
        onClick={logout}
        sx={{
          minHeight: 48,
          justifyContent: 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 'auto',
            justifyContent: 'center',
          }}
        >
          {<ExitToAppIcon color="action" />}
        </ListItemIcon>
      </ListItemButton>

      <Divider />
    </Drawer>
  );
});

export default MiniDrawer;
