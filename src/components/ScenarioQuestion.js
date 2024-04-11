import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Paper, Box, Button, Typography } from '@mui/material';
import { db } from '../firebase'; // Assuming you have a firebase config file
import { doc, getDoc } from 'firebase/firestore';

const ScenarioQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [businessAreaId, setBusinessAreaId]= useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userRating, setUserRating] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch question details
  const fetchQuestionDetails = async (questionId, businessId) => {
    const questionRef = doc(db, 'business_areas', businessId, 'questions', questionId);
    const questionSnap = await getDoc(questionRef);
    
    if (questionSnap.exists()) {
        console.log(questionSnap.data());
      return questionSnap.data();
    } else {
      console.log('No such question!');
      return {}; // or handle the error as needed
    }
  };

  useEffect(() => {
    const questionIds = location.state?.questions; // Assuming this is an array of IDs
    setBusinessAreaId(location.state?.businessAreaId);
    if (questionIds && questionIds.length > 0) {
      const currentId = questionIds[currentQuestionIndex];
      fetchQuestionDetails(currentId, location.state?.businessAreaId).then((questionDetails) => {
        setCurrentQuestion(questionDetails);
        setIsLoading(false);
      });
    }
  }, [location.state, currentQuestionIndex]);

  const handleRating = (rating) => {
    setUserRating(rating);
  };

  const handleNext = async () => {
    setIsLoading(true);
    // Here you would save the user's rating to the database
    // Then fetch the next question
    const nextIndex = currentQuestionIndex + 1;
    const questionIds = location.state?.questions;
    if (questionIds && nextIndex < questionIds.length) {
      fetchQuestionDetails(questionIds[nextIndex],businessAreaId).then((questionDetails) => {
        setCurrentQuestion(questionDetails);
        setCurrentQuestionIndex(nextIndex);
        setUserRating(null); // Reset rating for next question
        setIsLoading(false);
      });
    } else {
      // No more questions
      navigate('/results'); // or wherever you want to go next
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, my: 4, mx: "auto", maxWidth: 600 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Scenario
      </Typography>
      <Typography variant="body1">{currentQuestion.scenario}</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {currentQuestion.text}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            variant={userRating === rating ? 'contained' : 'outlined'}
            onClick={() => handleRating(rating)}
            sx={{ mx: 1 }}
          >
            {rating}
          </Button>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleNext} fullWidth>
        Next
      </Button>
    </Paper>
  );
};

export default ScenarioQuestion;
