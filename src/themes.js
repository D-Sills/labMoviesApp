import { createTheme } from '@mui/material/styles';
import { green, purple, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme