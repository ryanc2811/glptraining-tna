import React, { useState, useContext } from 'react';
import { Paper, Button, Box, Icon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firebase configuration
import { doc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import UserTnaContext from './UserTnaContext';

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

function IndustryQuestion() {
    const { setUserTnaId, userTnaId: docId } = useContext(UserTnaContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = async () => {
        if (selectedOption) {
            try {
                // Get the current user's ID from Firebase Authentication
                const auth = getAuth();
                const user = auth.currentUser;
                const userUID = user ? user.uid : null;

                if (userUID) {
                    if (!docId) {
                        // Add a new document with a generated id to the Firestore collection
                        const docRef = await addDoc(collection(db, 'user_tna'), {

                            user_id: userUID, // Store user ID for reference
                            industry_preference: selectedOption,
                            date_started: serverTimestamp(), // Firestore server timestamp

                        });
                        setUserTnaId(docRef.id); // Store the document ID for future updates
                    } else {
                        // For subsequent questions, update the existing document
                        const docRef = doc(db, 'user_tna', docId);
                        await updateDoc(docRef, {
                            industry_preference: selectedOption,
                        });
                    }
                    // 
                    // Navigate to the next question after submission
                    navigate('/initial-questions/business');
                } else {
                    // No user is signed in
                    alert('No user is signed in.');
                    navigate('/login')
                }
            } catch (err) {
                console.error("Error adding/updating document: ", err);
            }
        } else {
            alert('Please select an option before submitting.');
        }
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
                    width: { xs: '100%', sm: '50%', md: '25%' },
                }}
            >
                <Box textAlign="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }, color: theme.palette.primary.main }}>
                    <h2>
                        <span style={{ fontWeight: 'normal' }}>WHAT</span> INDUSTRY <span style={{ fontWeight: 'normal' }}>DO YOU WORK IN?</span>
                    </h2>
                </Box>
            </Paper>
            <Box
                sx={{
                    overflowY: 'auto', // Enable vertical scroll
                    maxHeight: { xs: '300px', sm: '400px', md: '500px' }, // Adjust this value based on your needs
                    width: { xs: '90%', sm: '40%', md: '20%' },
                    padding: '10px',
                }}
            >
                {industries.map((industry) => (
                    <Button
                        key={industry.label}
                        variant={selectedOption === industry.label ? "contained" : "outlined"}
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
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    mt: 4,
                    width: { xs: '50%', sm: '40%', md: '15%' },
                    height: '50px',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' },
                    minWidth: '150px',
                    color: 'white',
                    fontWeight: 'bold'
                }}
                onClick={handleSubmit}
            >
                Next
            </Button>
        </Box>
    );
}

export default IndustryQuestion;
