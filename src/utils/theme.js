import { createTheme } from '@mui/material';

const theme = createTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        zIndex: 0,
      },
    },
  },
});

export default theme;
