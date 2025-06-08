import { createTheme } from '@mui/material/styles';
///////////////////////////////////////////////////////

let theme = createTheme({});

theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
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
          borderRadius: '100px',
          textTransform: 'none',
          [theme.breakpoints.up('md')]: {
            '&:hover': {
              color: 'black',
              background: 'white',
            },
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
});

export default theme;
