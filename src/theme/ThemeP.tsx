import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D00600'
    },
    secondary: {
      main: '#860400'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#EEEEEE',
      disabled: '#808080'
    },
    background: {
      default: '#121212',
      paper: '#151515'
    },
    error: {
      main: '#FF0000'
    },
    warning: {
      main: '#FAFF00'
    },
    info: {
      main: '#FF002E'
    },
    action: {
      disabledBackground: '#DE4040',
      disabled: '#808080',
      hover: '#BB0000'
    },
    success: {
      main: '#00A855'
    }
  },
  typography: {
    fontFamily: 'noto-sans',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 700
    },
    h5: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 700
    },
    body1: {
      fontWeight: 400
    },
    body2: {
      fontWeight: 300
    },
    caption: {
      fontWeight: 500
    },
    button: {
      fontWeight: 600
    }
  }
});

export default function ThemeP({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
