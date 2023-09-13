import { createTheme } from '@mui/material';

const theme = createTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        zIndex: 0, // Ваше новое значение z-index
      },
    },
  },
});

export default theme;
