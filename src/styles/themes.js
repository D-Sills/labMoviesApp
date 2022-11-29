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
        color: "#FF9F45"
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
        color: "#FF9F45"
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
        main: "#FEB139",
    },
    neutral: {
      main: '#081019',
      contrastText: '#fff',
    },
    basicText: {
      main: '#143F6B',
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
        main: "#FEB139",
    },
    text: {
        default: "#FF9F45"
    },
    shadow: "rgba(118, 118, 118, 0.23)",
    mode: "light",
  },
  typography: {
    fontFamily : `"Roboto", sans-serif`,
    body1: {
        color: "#FF9F45"
    },
    h1: {
        color: "#FF9F45"
    },
    h2: {
        color: "#FF9F45"
    },
    h3: {
        color: "#FF9F45"
    },
    h4: {
        color: "#FF9F45"
    },
    h5: {
        color: "#129F65"
    },
    h6: {
        color: "#FF9F45"
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