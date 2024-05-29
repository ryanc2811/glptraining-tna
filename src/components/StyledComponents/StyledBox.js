// src/components/StyledComponents.js or any other file
import { styled, Box, borders } from '@mui/material';

const BorderedBox = styled(Box)(({ theme }) => ({
    
    borderLeft: '3px solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: 1,
    padding: theme.spacing(2), // Optionally add padding or other styles
}));

export { BorderedBox };