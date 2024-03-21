import React, { useEffect, useState, useContext } from 'react';
import { Paper, Button, Box, Grid, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firebase configuration
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import UserTnaContext from './UserTnaContext';



function DevelopmentAreasQuestion() {
    const { userTnaId: docId, setUserTnaId, businessAreaId } = useContext(UserTnaContext);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [developmentAreas, setDevelopmentAreas] = useState([]);

    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDevelopmentAreas = async () => {
            if (!docId) {
                // Navigate to the next question after submission
                navigate('/initial-questions/upskill');
            } else {
                if (!businessAreaId) return;
                const docRef = doc(db, "business_areas", businessAreaId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {

                    // Assuming 'key_development_areas' is the field that contains the array
                    setDevelopmentAreas(docSnap.data().development_areas);
                } else {
                    console.log("No such document!");
                }
            }
        };

        if (businessAreaId) {
            fetchDevelopmentAreas();
        }
    }, [businessAreaId]);

    const handleSelect = (option) => {
        setSelectedOptions((currentSelectedOptions) => {
            if (currentSelectedOptions.includes(option)) {
                // If already selected, remove it from the array
                return currentSelectedOptions.filter((selectedOption) => selectedOption !== option);
            } else {
                // Otherwise, add it to the array
                return [...currentSelectedOptions, option];
            }
        });
    };


    const handleSubmit = async () => {
        // Get the current user's ID from Firebase Authentication
        const auth = getAuth();
        const user = auth.currentUser;
        const userUID = user ? user.uid : null;
        if (selectedOptions.length > 0) {
            try {
                // Your existing code to get the user's ID and check docId
                if (userUID) {
                    if (docId) {
                        // Update user_tna document with selected development areas
                        const userTnaRef = doc(db, 'user_tna', docId);
                        await updateDoc(userTnaRef, {
                            developmentAreas: selectedOptions,
                        });

                    }
                    navigate('/next-question-path');
                } else {
                    alert('No user is signed in.');
                    navigate('/login');
                }
            } catch (err) {
                console.error("Error adding/updating document: ", err);
            }
        } else {
            alert('Please select at least one option before submitting.');
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
                        <span style={{ fontWeight: 'normal' }}>WHAT</span> KEY AREAS <span style={{ fontWeight: 'normal' }}>DO YOU WANT TO DEVELOP? (SELECT ALL THAT APPLY)</span>
                    </h2>
                </Box>
            </Paper>
            <Box
                sx={{
                    overflowY: 'auto', // Enable vertical scroll
                    maxHeight: { xs: '300px', sm: '400px', md: '500px' }, // Adjust this value based on your needs
                    width: { xs: '100%', sm: '40%', md: '20%' },
                    padding: '10px',
                }}
            >
                <Grid container spacing={2} justifyContent="center">

                    {developmentAreas.map((area, index) => (
                        <Grid item xs={6} key={index}>
                            <Button
                                key={area}
                                variant={selectedOptions.includes(area) ? "contained" : "outlined"}
                                sx={{
                                    justifyContent: 'space-between',
                                    pl: 3,
                                    pr: 3,
                                    width: '100%', // Make buttons full width inside the scrollable area
                                    height: '120px',
                                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '.8rem' },
                                    minWidth: '150px',

                                    '&.MuiButton-contained': {
                                        color: theme.palette.common.white,
                                    },
                                    mb: 2, // Add some space between buttons
                                }}
                                onClick={() => handleSelect(area)}
                            >
                                {area}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
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

export default DevelopmentAreasQuestion;
