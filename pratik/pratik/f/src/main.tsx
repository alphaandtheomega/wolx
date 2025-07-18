import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as CustomThemeProvider } from './context/theme-context'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import theme from './theme';
import axios from 'axios';

// Axios base URL ayarı
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MuiThemeProvider theme={theme}>
      <CustomThemeProvider>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
            <App />
            <Toaster position="bottom-right" richColors closeButton />
          </LocalizationProvider>
        </QueryClientProvider>
      </CustomThemeProvider>
    </MuiThemeProvider>
  </StrictMode>,
)
