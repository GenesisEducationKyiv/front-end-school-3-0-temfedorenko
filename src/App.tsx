import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import { TracksPage } from './features/tracks';
import { AppHeader } from './components/AppHeader';
import { ActiveTrack } from './components/tracks/ActiveTrack';
///////////////////////////////////////////////////////

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Box component='main' flexGrow={1}><TracksPage /></Box>
      <Box component='footer'>
        <ActiveTrack />
        <Typography mt='30px' align='center' variant='h6'>Developed by Artem Fedorenko | 2025</Typography>
      </Box>
      <ToastContainer autoClose={3000} position='top-left' />
    </BrowserRouter>
  );
}

export default App;
