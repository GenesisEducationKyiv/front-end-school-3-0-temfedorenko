import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, Experimental_CssVarsProvider } from '@mui/material';

import './index.css';

import App from './App';
import theme from './theme';
///////////////////////////////////////////////////////

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Experimental_CssVarsProvider theme={theme} defaultMode='light'>
      <CssBaseline />
      <App />
    </Experimental_CssVarsProvider>
  </QueryClientProvider>
);
