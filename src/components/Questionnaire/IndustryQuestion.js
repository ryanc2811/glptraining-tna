import React, { useState } from 'react';
import { Box, Typography,Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';


import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SchoolIcon from '@mui/icons-material/School';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MovieIcon from '@mui/icons-material/Movie';
import PendingIcon from '@mui/icons-material/Pending';

const industries = [
    { label: 'Construction', icon: EngineeringIcon },
    { label: 'Creative', icon: MovieIcon },
    { label: 'Education', icon: SchoolIcon },
    { label: 'Healthcare', icon: FavoriteOutlinedIcon },
    { label: 'Finance', icon: CurrencyPoundIcon },
    { label: 'Manufacturing', icon: PrecisionManufacturingIcon },
    { label: 'Retail', icon: StorefrontIcon },
    { label: 'Technology', icon: PhonelinkIcon },
    { label: 'Other', icon: PendingIcon }
];
function IndustryQuestion({ formData, setFormData,error }) {
    const theme = useTheme();

    const handleSelect = (option) => {
        
        setFormData({ ...formData, industry_preference: option })
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
                <Typography variant="h3"sx={{fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }, color: '#001A54' }}><span style={{ fontWeight: 'normal' }}>WHAT</span> INDUSTRY <span style={{ fontWeight: 'normal' }}>DO YOU/WANT TO WORK IN?</span></Typography> 
    
                </Box>

            </Paper>

            <Box
                sx={{
                    overflowY: 'auto', // Enable vertical scroll
                    maxHeight: { xs: '340px', sm: '340px', md: '340px' }, // Adjust this value based on your needs
                    width: { xs: '90%', sm: '40%', md: '70%' },
                    padding: '10px',
                }}
            >
                {industries.map((industry) => (
                    <Button
                        key={industry.label}
                        variant={formData.industry_preference === industry.label ? "contained" : "outlined"}
                        endIcon={React.createElement(industry.icon, { style: { fontSize: '32px' } })}
                        sx={{
                            justifyContent: 'space-between',
                            pl: 3,
                            pr: 3,
                            width: '100%', // Make buttons full width inside the scrollable area
                            height: '90px',
                            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' },
                            minWidth: '150px',
                            '& .MuiButton-endIcon': {
                                ml: 2,
                                marginRight: '8px',
                            },
                            '&.MuiButton-contained': {
                                color: theme.palette.common.white,
                            },
                            mb: 2, // Add some space between buttons
                        }}
                        onClick={() => handleSelect(industry.label)}
                    >
                        {industry.label}
                    </Button>
                ))}
            </Box>
            </Box>


      );
    }

export default IndustryQuestion;
