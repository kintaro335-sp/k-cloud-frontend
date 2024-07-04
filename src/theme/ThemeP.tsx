import { createTheme, ThemeProvider } from '@mui/material/styles';

const colors = {
  Night: '#0b090a',
  Eerieblack: '#161a1d',
  Bloodred: '#660708',
  Cornellred: '#a4161a',
  Cornellred2: '#ba181b',
  Imperialred: '#e5383b',
  Silver: '#b1a7a6',
  Timberwolf: '#d3d3d3',
  Whitesmoke: '#f5f3f4',
  White: '#ffffff'
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.Cornellred
    },
    secondary: {
      main: colors.Cornellred2
    },
    text: {
      primary: colors.White,
      secondary: colors.Whitesmoke,
      disabled: colors.Silver
    },
    background: {
      default: colors.Night,
      paper: colors.Eerieblack
    },
    error: {
      main: colors.Bloodred
    },
    warning: {
      main: colors.Eerieblack
    },
    info: {
      main: colors.Bloodred
    },
    action: {
      disabledBackground: colors.Silver,
      disabled: colors.Whitesmoke,
      hover: colors.Bloodred
    },
    success: {
      main: colors.Imperialred
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'noto-sans-bold',
          fontWeight: 600,
          fontStyle: 'inherit',
          textDecoration: 'underline'
        }
      }
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
