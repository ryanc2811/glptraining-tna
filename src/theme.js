
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9666FF',
            dark:'#7856E2'
        },
        secondary: {
            main: '#00febe',
            dark:'#00cb98'
        },
        text:{
          main:'#001a54',
          dark:'#000d2a'

        },
        error:{
          main:'#ef3b56',
          light:'#f37588',
          lighter:'#f79daa',
          dark:'#d7354d'
        }
          },
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
        fontSize: 14,
        h1: {
          fontSize: '2.2rem',
            fontWeight: 'bold',
            color: '#001a54',
        },
        h2: {
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: '#001a54',
        },
        h3: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#757575',
          },
          h4: {
            fontSize: '1.2rem',
            color: '#757575',
          },
          h5: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
          h6: {
            fontSize: '1.2rem',
            
            color: '#001a54',
          },
          subtitle1: {
            color: '#001a54',
            fontWeight: 'bold',
            
          },
        // You can add more custom styles as needed
      },
});

export default theme;
