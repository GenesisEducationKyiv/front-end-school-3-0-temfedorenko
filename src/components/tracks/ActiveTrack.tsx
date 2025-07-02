import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

import { getSocket, disconnectSocket } from '../../socket';
///////////////////////////////////////////////////////

export function ActiveTrack() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handleActiveTrack = (track: string) => {
      setActiveTrack(track);
    };

    socket.on('activeTrack', handleActiveTrack);

    return () => {
      socket.off('activeTrack', handleActiveTrack);
      disconnectSocket();
    };
  }, []);

  return (
    <Box component='section'>
      <Typography
        align='center'
        sx={{
          my: '30px',
          fontWeight: 700,
          color: '#4D4D4D',
          letterSpacing: '3px',
          fontSize: { xs: 20, sm: 35 },
        }}
      >
        <AudiotrackIcon sx={{ fontSize: { xs: 15, sm: 25 } }} />
        {activeTrack}
      </Typography>
    </Box>
  );
}
