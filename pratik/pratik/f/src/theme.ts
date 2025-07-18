import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#10b981', // Butonlar için yeşil
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'oklch(0.755 0.181 186.6)', // İstenen yeşil
          },
          '& .MuiOutlinedInput-notchedOutline': {
            // Normal durumda da yeşil yapabilirsin, istersen buraya ekle
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'oklch(0.755 0.181 186.6)', // Hata durumunda da yeşil
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'oklch(0.755 0.181 186.6)', // İstenen yeşil
          },
          '&.Mui-error': {
            color: 'oklch(0.755 0.181 186.6)', // Hata durumunda da yeşil
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Ekstra özel bir şey istersen buraya yazabilirsin
          '&:hover': {
            backgroundColor: '#0e9f6e', // Buton hover rengi
          },
        },
      },
    },
  },
});

export default theme; 