import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
///////////////////////////////////////////////////////

export function AppHeader() {
  return (
    <Box component='header'>
      <Typography
        variant='h2'
        align='center'
        component='h1'
        data-testid='tracks-header'
        sx={{
          mt: '50px',
          mb: '100px',
          fontWeight: 700,
          color: '#4D4D4D',
          letterSpacing: '10px',
          fontSize: { xs: 30, sm: 60 },
        }}
      >
        Track Management
      </Typography>
    </Box>
  );
}
