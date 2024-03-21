import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
    },
    palette: {
        primary: {
            main: '#9666FF'
        },
        secondary: {
            main: '#00FCBC'
        }
    },
});

export default theme;
