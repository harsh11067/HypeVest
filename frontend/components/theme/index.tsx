import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1B73E8',
      light: '#4285F4',
      dark: '#1557B0',
    },
    secondary: {
      main: '#00C851',
      light: '#4CAF50',
      dark: '#2E7D32',
    },
    background: {
      default: '#0B1426',
      paper: '#1A202C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0AEC0',
    },
    success: {
      main: '#00C851',
    },
    error: {
      main: '#FF3D71',
    },
    warning: {
      main: '#FFB800',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A202C',
          borderRadius: '12px',
          border: '1px solid #2D3748',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
  },
});
