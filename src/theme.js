import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9666FF'
        },
        secondary: {
            main: '#00FCBC'
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

        // You can add more custom styles as needed
      },
});

export default theme;
