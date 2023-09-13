import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { StoreContext } from '../../../context/store';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';
import { SocketContext } from '../../../context/socket';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  borderRadius: theme.shape.borderRadius,
  borderColor: 'grey',
  color: 'grey',
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  width: '100%',
  height: '32px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0 10px',
  height: '100%',
  position: 'relative',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  fontSize: '14px',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
  },
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: 'white',
  height: '64px',
  padding: '0 12px', // Удаляем все paddings
  [theme.breakpoints.up('xs')]: {
    padding: '0 12px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '0 12px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 12px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 12px',
  },
  [theme.breakpoints.up('xl')]: {
    padding: '0 12px',
  },
}));

const ConversationSearch = observer(() => {
  const { socket } = React.useContext(SocketContext);
  const { conversationStore } = React.useContext(StoreContext);

  const handleChange = (e) => {
    e.preventDefault();
    conversationStore.setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    conversationStore.getSearchedConversations(socket);
  };

  const handleClear = (e) => {
    e.preventDefault();
    conversationStore.setSearchInput('');
  };

  React.useEffect(() => {
    conversationStore.setSearchedConversations(null);
  }, [conversationStore.searchInput]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'rgb(128 128 128)' }}>
        <CustomToolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <StyledInputBase
                value={conversationStore.searchInput}
                onChange={handleChange}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                endAdornment={
                  <Box
                    sx={{
                      p: '0 10px',
                      width: '25px',
                      height: '25px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {conversationStore.searchInput && (
                      <CloseIcon
                        onClick={handleClear}
                        sx={{
                          color: 'grey',
                          cursor: 'pointer',
                          fontSize: '20px',
                        }}
                      />
                    )}
                  </Box>
                }
              />
            </form>
          </Search>
        </CustomToolbar>
      </AppBar>
    </Box>
  );
});

export default ConversationSearch;
