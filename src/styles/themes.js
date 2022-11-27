import { createTheme } from '@mui/material/styles';
import './app.css';

let theme = createTheme({
  palette: {
    primary: {
      main: '#032541',
      background: {
        paper: '#032541',
      },
      text: {
        primary: '#01B4E4',
      },
    },
    secondary: {
      main: '#032541',
      background: {
        paper: '#032541',
      },
      text: {
        primary: '#01B4E4',
      },
    },
  },
});

export default theme