import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import InitialQuestions from './InitialQuestions';
import { Grid, Paper, Box} from '@mui/material';
import MyCarousel from '../StyledComponents/MyCarousel';

function Questionnaire() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleComplete = (questions, businessAreaId, userTnaId) => {
    console.log(userTnaId);
    navigate('/scenario-questions', {
        state: {
            questions: questions.filter(q => q !== undefined),
            businessAreaId,
            userTnaId
        }
    });
  };

  
  return (
    <Grid container component="main" sx={{ height: { xs: '90vh', sm: '100vh', md: '100vh' }, position: 'relative', padding: { md: '2vh' } }}>
      <MyCarousel></MyCarousel>
      <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: { xs: 5, sm: 5, md: 5 },
            mx: { xs: 2, sm: 5, md: 15 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <InitialQuestions onComplete={handleComplete} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Questionnaire;
