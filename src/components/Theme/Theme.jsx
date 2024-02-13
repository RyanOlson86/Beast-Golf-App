import React from 'react';
import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  palette: {
    ochre: {
      main: '#252df5',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

export default myTheme