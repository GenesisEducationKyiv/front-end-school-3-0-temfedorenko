import { Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import './App.css';

import { TracksPage } from './features/tracks';
import { AppHeader } from './components/AppHeader';
///////////////////////////////////////////////////////

function App() {
  return (
    <>
      <AppHeader />
      <Box component='main' flexGrow={1}><TracksPage /></Box>
      <Box component='footer'>
        <Typography mt='50px' align='center' variant='h6'>Developed by Artem Fedorenko | 2025</Typography>
      </Box>
      <ToastContainer autoClose={3000} position='top-left' />
    </>
  );
}

export default App;
