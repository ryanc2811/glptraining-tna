import React, { useState, useContext } from 'react';
import { Paper, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firebase configuration
import { doc, collection, serverTimestamp, addDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import UserTnaContext from './UserTnaContext';
function UpskillQuestion() {
    const { setUserTnaId, userTnaId: docId } = useContext(UserTnaContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const theme = useTheme();

    const navigate = useNavigate(); // Hook to navigate
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
                            upskill_option: selectedOption,
                            date_started: serverTimestamp(), // Firestore server timestamp

                        });
                        setUserTnaId(docRef.id); // Store the document ID for future updates
                    } else {
                        // For subsequent questions, update the existing document
                        const docRef = doc(db, 'user_tna', docId);
                        await updateDoc(docRef, {
                            upskill_option: selectedOption,
                        });
                    }
                    // 
                    // Navigate to the next question after submission
                    navigate('/initial-questions/industry');
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
                        <span style={{ fontWeight: 'normal' }}> DO YOU WANT TO BE </span>UPSKILLED <span style={{ fontWeight: 'normal' }}> IN YOUR
                            CURRENT ROLE OR</span> PURSUE  A NEW CAREER?
                    </h2>
                </Box>

            </Paper>
            <Box
                sx={{

                    maxHeight: { xs: '300px', sm: '400px', md: '500px' }, // Adjust this value based on your needs
                    width: { xs: '90%', sm: '40%', md: '20%' },
                    padding: '10px',
                }}
            >

                <Button
                    variant={selectedOption === 'upskilled' ? 'contained' : 'outlined'}
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
                    variant={selectedOption === 'newCareer' ? 'contained' : 'outlined'}
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

export default UpskillQuestion;
