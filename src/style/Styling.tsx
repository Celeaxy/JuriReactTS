import { GlobalStyles } from '@mui/styled-engine';
import { createTheme, CssBaseline } from '@mui/material';


const globalStylesProps = {
  '.MuiPaper-root.MuiAppBar-root': { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255,255,255, 0.3)' },
  '& ::selection': {
    color: 'transparent', backgroundColor: 'grey',
    /* width */

  },
  '::-webkit-scrollbar': {
    width: '10px'
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    background: 'rgba(255,255,255,0.3)'
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(255,255,255, 0.3)'
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255,255,255, 0.5)'
  }
}

const globalStyling = <>
  <CssBaseline />
  <GlobalStyles styles={globalStylesProps} />
</>;

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(255,255,255)',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#040404',
      paper: '#111',
    },
    text: {
      primary: '#ffffff',
      disabled: '#c8c8c8',
    },
  },
  typography: {
    fontFamily: 'JetBrains Mono Regular'
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255, 0.1)'
        }
      }
    }
  }
});

export { theme, globalStyling };