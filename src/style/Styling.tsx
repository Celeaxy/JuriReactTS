import { GlobalStyles } from '@mui/styled-engine';
import { createTheme, CssBaseline, useTheme } from '@mui/material';


const globalStylesProps = {
  '.MuiPaper-root.MuiAppBar-root' :{backdropFilter : 'blur(4px)'},
  '.MuiInputBase-root.MuiOutlinedInput-root' : {color: 'transparent', caretColor: 'rgb(0,255,0)',
  '& ::selection' :{ color : 'transparent', backgroundColor: 'grey'
  }
  }
}

const globalStyling = <>
    <CssBaseline />
    <GlobalStyles styles={globalStylesProps}/>
</>;

const theme = createTheme({
      palette: {
        primary: {
          main: 'rgba(50,50,50,0.8)',
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
          styleOverrides:{
            root:{
              backgroundColor : 'rgba(255,255,255, 0.1)'
            }
          }
        }
      }
    });

export {theme, globalStyling};