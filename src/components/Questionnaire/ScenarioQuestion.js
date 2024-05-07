import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Paper, Box, Button, Typography,Grid } from '@mui/material';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import LinearProgressWithLabel from '../LinearProgressWithLabel';  // Adjust the import path as needed
import imagePath from '../../images/register-image.jpg'; // Adjust the path accordingly
import logoImage from '../../images/logo_whitetab.svg';
const ScenarioQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, businessAreaId, userTnaId } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
 
  useEffect(() => {
    if (questions && questions.length > 0 && currentQuestionIndex < questions.length) {
        fetchQuestionDetails(questions[currentQuestionIndex], businessAreaId)
            .then((questionDetails) => {
                setCurrentQuestion(questionDetails || {});
                setIsLoading(false);
                // Update progress each time a new question is fetched
                const newValue=(currentQuestionIndex + 1) / questions.length * 100;
                setProgress(newValue);
                
            });
    } else {
        setIsLoading(false);
    }
  }, [questions, currentQuestionIndex, businessAreaId]);

  const fetchQuestionDetails = async (questionId, businessId) => {
    try {
      const questionRef = doc(db, 'business_areas', businessId, 'questions', questionId);
      const questionSnap = await getDoc(questionRef);
      if (questionSnap.exists()) {
        return questionSnap.data();
      } else {
        console.log('No such question!');
        return null; // Return null and check for this later
      }
    } catch (error) {
      console.error('Error fetching question details:', error);
      return null; // Handle errors gracefully
    }
  };
  const handleBack = () => {
    const prevIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
  };
  const handleNext = async () => {
    /*setIsLoading(true);*/
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      navigate('/results', { state: { userTnaId } });
    }
  };

  if (isLoading) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    );
  }

  return (<Grid container component="main" sx={{ height: { xs: '90vh', sm: '100vh', md: '100vh' }, position: 'relative', padding: { md: '2vh' } }}>
  <Grid item xs={12} sm={6} md={5} lg={5} sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
    <Box
      sx={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: { xs: '35vh', sm: '50vh', md: '100%' },
        borderRadius: { md: '8px' },
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: { xs: '75%', sm: '50%' },
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)',
          borderRadius: { md: '8px' },
        }
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: 'auto',
        textAlign: 'left',
        color: 'white',
        zIndex: 1,
        p: 2,
      }}
    >
      <Typography variant="h5">Find Your Path</Typography>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h6">With</Typography>
        <Box component="img"
             src={logoImage}
             alt="GLP Training Logo"
             sx={{ height: 'auto', maxWidth: '100%', width: { xs: '120px', sm: '150px' }, pl: '6px' }}
        />
      </Box>
    </Box>
  </Grid>
  <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
  <Box
        sx={{
          my: { xs: 5, sm: 5, md: 5 },
          mx: { xs: 2, sm: 5, md: 15 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
<Box sx={{ width: "100%" }}>
      <Typography  variant="body2">Results Progress</Typography>
      <LinearProgressWithLabel value={progress} />
      <Typography sx={{ mt: 2 }}variant="h2" component="h1" gutterBottom>
        Scenario
      </Typography>
      <Typography variant="body1">{currentQuestion.scenario}</Typography>
      <Typography sx={{ mt: 2 }}variant="h3" component="h1" gutterBottom>
        Question
      </Typography>
      <Typography variant="body2" >
        {currentQuestion.text}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent:'center' ,my: 2 }}>
      <Typography  sx={{  my: 2 , color: '#001A54'}}variant="h4" >
        Rank your ability
      </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent:'center',my: 2 }}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            variant={currentQuestion.userRating === rating ? 'contained' : 'outlined'}
            onClick={() => setCurrentQuestion({ ...currentQuestion, userRating: rating })}
            sx={{ mx: 1 , height:'50px'}}
          >
            {rating}
          </Button>
        ))}
      </Box>
      <div>
        <div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={currentQuestionIndex === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" color="primary" onClick={handleNext} >
        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
      </Button>
          </Box>
        </div>
      </div>
      </Box>
      </Box>
  </Grid>
</Grid>
    
  );
};

export default ScenarioQuestion;
