import React, { useEffect, useState } from 'react';
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

const MiniDrawer = () => {
  const [selectedPath, setSelectedPath] = useState(window.location.pathname);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    setSelectedPath(path);
    navigate(path);
  };

  useEffect(() => {
    setSelectedPath(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <Drawer variant="permanent" open={false}>
      <List
        sx={{
          padding: 0,
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
      <Divider />
    </Drawer>
  );
};

export default MiniDrawer;
