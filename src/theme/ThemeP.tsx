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
  }
});

export default function ThemeP({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
