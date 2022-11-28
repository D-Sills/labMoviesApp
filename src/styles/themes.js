import { createTheme } from '@mui/material/styles';
import './app.css';

const lightTheme = createTheme({
  typography: {
    "fontFamily": `"Roboto", sans-serif`
  },
  
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    primary: {
      main: '#032541',
    },
    background: {
      paper: '#032541',
    },
    text: {
      primary: '#fff',
    },
  },
});

const darkTheme = createTheme({
  palette: {

    background: {
        default: "#262626",
        paper: "#262626"
    },
    primary: {
        main: "#FEB139",
        light: "#FEB139",
        dark: "#FEB139",
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
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
        light: "#FEB139",
        dark: "#FEB139"
    },
    text: {
        default: "#FF9F45"
    },
    shadow: "rgba(118, 118, 118, 0.23)",
    mode: "dark",
  },
  typography: {
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
  },
  gradient: "linear-gradient(274deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 0%,#FEB139 0%, #F55353 100%)",
  maxPadding: 80,
  minPadding: 10,
  drawerWidth: 240,
});

export { darkTheme, lightTheme };