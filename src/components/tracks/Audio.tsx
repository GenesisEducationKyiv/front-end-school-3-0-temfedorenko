import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import IconButton from '@mui/material/IconButton';
import PlayArrow from '@mui/icons-material/PlayArrow';
import PauseCircle from '@mui/icons-material/PauseCircle';

import { useTracksStore } from '@/store';
import { selectPlayingTrackId, selectSetPlayingTrackId } from '@/selectors';

import type WaveSurfer from 'wavesurfer.js';
///////////////////////////////////////////////////////

const wrapperStyles = {
  gap: '10px',
  minWidth: 150,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

const playerWrapperStyles = { width: '100%', cursor: 'pointer' };

export function Audio({ id, url }: { id: string; url: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  const playingTrackId = useTracksStore(selectPlayingTrackId);
  const setPlayingTrackId = useTracksStore(selectSetPlayingTrackId);

  useEffect(() => {
    return () => {
      if (playingTrackId) setPlayingTrackId(null);
    };
  }, [playingTrackId, setPlayingTrackId]);

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (wavesurfer) wavesurfer.playPause();
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setPlayingTrackId(id);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setPlayingTrackId(null);
  };

  const isBtnDisabled = !!playingTrackId && playingTrackId !== id;

  return (
    <Box sx={wrapperStyles} data-testid={`audio-player-${id}`}>
      <IconButton
        aria-label='play/pause'
        disabled={isBtnDisabled}
        onClick={handlePlayPause}
        data-disabled={isBtnDisabled}
        data-testid={`${isPlaying ? 'pause' : 'play'}-button-${id}`}
      >
        {isPlaying ? <PauseCircle /> : <PlayArrow />}
      </IconButton>
      <Box sx={playerWrapperStyles} data-testid={`audio-progress-${id}`}>
        <WavesurferPlayer
          url={url}
          barGap={2}
          height={44}
          barWidth={2}
          barRadius={10}
          barHeight={0.7}
          cursorWidth={0}
          onReady={onReady}
          dragToSeek={true}
          onPlay={handlePlay}
          waveColor='#a1a1a1'
          progressColor='#222'
          onPause={handlePause}
        />
      </Box>
    </Box>
  );
};
