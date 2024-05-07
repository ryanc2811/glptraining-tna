import React, { useState } from 'react';
import { Box, Typography,Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
function UpskillQuestion({ formData, setFormData,error }) {
    const theme = useTheme();
    
    const handleSelect = (option) => {
        setFormData({ ...formData, upskill_option: option })
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', m: 4 }}>
            <Paper
                elevation={0}
                square
                sx={{
                    border: '2px solid #6200EE',
                    borderRadius: 2,
                    padding: '20px',
                    marginTop: '20px',
                    maxWidth: '947px',
                    width: { xs: '100%', sm: '50%', md: '100%' },
                }}
            >
                <Box textAlign="center" sx={{color: theme.palette.primary.main }}>
                <Typography variant="h3"sx={{fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }, color: '#001A54' }}><span style={{ fontWeight: 'normal' }}> DO YOU WANT TO BE </span>UPSKILLED <span style={{ fontWeight: 'normal' }}> IN YOUR
                            CURRENT ROLE OR</span> PURSUE  A NEW CAREER?</Typography> 
    
                </Box>

            </Paper>
            <Box
                sx={{

                    maxHeight: { xs: '200px', sm: '300px', md: '500px' }, // Adjust this value based on your needs
                    width: { xs: '90%', sm: '90%', md: '75%' },
                    padding: '10px',
                }}
            >

                <Button
                    variant={formData.upskill_option === 'upskilled' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleSelect('upskilled')}
                    sx={{
                        justifyContent: 'space-between',
                        pl: 3,
                        pr: 3,
                        width: '100%', // Make buttons full width inside the scrollable area
                        height: '90px',
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' },
                        minWidth: '150px',
                        '&.MuiButton-contained': {
                            color: theme.palette.common.white,
                        },
                        mb: 2, // Add some space between buttons
                    }}
                >
                    UPSKILLED
                </Button>
                <Button
                    variant={formData.upskill_option === 'newCareer' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleSelect('newCareer')}
                    sx={{
                        justifyContent: 'space-between',
                        pl: 3,
                        pr: 3,
                        width: '100%', // Make buttons full width inside the scrollable area
                        height: '90px',
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' },
                        minWidth: '150px',
                        '&.MuiButton-contained': {
                            color: theme.palette.common.white,
                        },
                        mb: 2, // Add some space between buttons
                    }}
                >
                    NEW CAREER
                </Button>
            </Box>

           
          
        </Box>
      );
    }

export default UpskillQuestion;
