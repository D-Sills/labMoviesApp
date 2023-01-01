import { createTheme } from '@mui/material/styles';
import './app.css';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#032541",
  },
  title:  {
    main: "#B2BAC2",
  },
    background: {
      default: "#F5FAFF",
      paper: "#F5FAFF"
  },
  neutral: {
    main: '#032541',
    contrastText: '#fff',
  },
  basicText: {
    main: '#fff',
  },
  secondary: {
      main: "#143F6B"
  },
  tertiary: {
      main: "#FFBC80"
  },
  base: {
      main: "#F55353"
  },
  info: {
      main: "#032541",
  },
  text: {
      default: "#032541"
  },
  shadow: "rgba(118, 118, 118, 0.23)",
  mode: "light",
  },
  typography: {
    fontFamily: `"Roboto", sans-serif`,
    body1: {
        color: "#032541"
    },
    h1: {
        color: "#B2BAC2",
    },
    h2: {
        color: "#143F6B"
    },
    h3: {
        color: "#143F6B"
    },
    h4: {
        color: "#143F6B"
    },
    h5: {
        color: "#143F6B"
    },
    h6: {
        color: "#143F6B"
    },
  },
  root: {
    color: "#F55353"
  },
  card: "#111111",
  top: "#1E1E1E",
  line: "#111111",
  title: {
    font: "'Lato', sans-serif",
    size: 22,
    weight: 600,
    color: "#032541",
  }
});

const darkTheme = createTheme({
  palette: {
    background: {
        default: "#0A1929",
        paper: "#0A1929"
    },
    title:  {
      main: "#B2BAC2",
    },
    primary: {
        main: "#fff",
    },
    neutral: {
      main: '#081019',
      contrastText: '#fff',
    },
    basicText: {
      main: '#fff',
    },
    secondary: {
        main: "#fff"
    },
    tertiary: {
        main: "#143F6B0"
    },
    base: {
        main: "#F55353"
    },
    info: {
        main: "#fff",
    },
    text: {
        primary: "#E3ECF4",
        default: "#fff"
    },
    shadow: "rgba(118, 118, 118, 0.23)",
    mode: "light",
  },
  typography: {
    fontFamily : `"Roboto", sans-serif`,
    body1: {
        color: "#fff"
    },
    h1: {
        color: "#fff"
    },
    h2: {
        color: "#fff"
    },
    h3: {
        color: "#fff"
    },
    h4: {
        color: "#fff"
    },
    h5: {
        color: "#fff"
    },
    h6: {
        color: "#fff"
    },
  },
  root: {
    color: "#F55353"
  },
  card: "#111111",
  top: "#1E1E1E",
  line: "#111111",
  title: {
    font: "'Lato', sans-serif",
    size: 22,
    weight: 600,
    color: "#FEB139",
  }
});

export { darkTheme, lightTheme };