import React, { useEffect, useState, useContext } from 'react';
import { Paper, Button, Box, Icon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firebase configuration
import { doc, getDocs, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import UserTnaContext from './UserTnaContext';

function BusinessAreaQuestion() {
    const { setUserTnaId, userTnaId: docId, businessAreaId, setBusinessAreaId } = useContext(UserTnaContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const [businessAreas, setBusinessAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinessAreas = async () => {
            if (!docId) {
                // Navigate to the next question after submission
                navigate('/initial-questions/upskill');
            } else {
                const querySnapshot = await getDocs(collection(db, "business_areas"));
                setBusinessAreas(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }

        };
        fetchBusinessAreas();
    }, []);

    const handleSelect = (option, id) => {
        setSelectedOption(option);
        setBusinessAreaId(id);
    };

    const handleSubmit = async () => {
        if (selectedOption) {
            setIsLoading(true); // Start loading immediately upon form submission
    
            try {
                // Get the current user's ID from Firebase Authentication
                const auth = getAuth();
                const user = auth.currentUser;
                const userUID = user ? user.uid : null;
                
                if (userUID) {
                    if (!docId) {
                        navigate('initial-questions/upskill');
                    } else {
                        // For subsequent questions, update the existing document
                        const docRef = doc(db, 'user_tna', docId);
                        await updateDoc(docRef, {
                            business_area: selectedOption,
                        });
    
                        // Check if the businessAreaId context has been updated
                        if (businessAreaId) {
                            // Navigate to the next question after submission
                            navigate('/initial-questions/development-areas');
                        } else {
                            // Wait and retry or handle the missing ID appropriately
                            console.log('Waiting for business area ID to be set...');
                            // You can add some retry logic here if necessary
                        }
                    }
                } else {
                    // No user is signed in
                    alert('No user is signed in.');
                    navigate('/login');
                }
            } catch (err) {
                console.error("Error adding/updating document: ", err);
            } finally {
                setIsLoading(false); // Stop loading regardless of the outcome
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
                        <span style={{ fontWeight: 'normal' }}>WHAT</span> BUSINESS AREA <span style={{ fontWeight: 'normal' }}>DO YOU WORK IN?</span>
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
                {businessAreas.map((business) => (
                    <Button
                        key={business.id}
                        variant={selectedOption === business.title ? "contained" : "outlined"}
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
                        onClick={() => handleSelect(business.title, business.id)}
                    >
                        {business.title}
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

export default BusinessAreaQuestion;
