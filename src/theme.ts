import { experimental_extendTheme } from '@mui/material/styles';
///////////////////////////////////////////////////////

const theme = experimental_extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#fff',
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          fontWeight: 600,
          display: 'block',
          borderWidth: '2px',
          background: '#222',
          borderColor: '#222',
          padding: '5px 20px',
          borderStyle: 'solid',
          borderRadius: '16px',
          textTransform: 'none',
          '&:hover': {
            color: 'black',
            background: 'white',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: 'inherit',
            '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
              borderColor: '#C8C8C8',
            },
          },
          input: {
            '&:-webkit-autofill': {
              transition: 'background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C8C8C8',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C8C8C8',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
