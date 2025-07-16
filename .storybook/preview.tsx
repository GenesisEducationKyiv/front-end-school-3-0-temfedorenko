import { CssBaseline, Experimental_CssVarsProvider } from '@mui/material';

import theme from '../src/theme';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Experimental_CssVarsProvider theme={theme} defaultMode='light'>
          <CssBaseline />
          <Story />
        </Experimental_CssVarsProvider>
      );
    },
  ],
};

export default preview;
