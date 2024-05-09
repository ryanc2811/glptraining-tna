import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography, Box} from '@mui/material';

import { useNavigate } from "react-router-dom";
import imagePath from '../../images/register-image.jpg'; // Adjust the path accordingly
import logoImage from '../../images/logo_whitetab.svg';

import InitialQuestions from './InitialQuestions';
function Questionnaire() {
  const navigate = useNavigate();
  const [error, setError] = useState('');



 
  const handleComplete = (questions, businessAreaId, userTnaId) => {

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
          <Typography variant="h6" sx={{color:'#FFFFFF'}}>With</Typography>
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
          <InitialQuestions onComplete={handleComplete} />
        </Box>
    </Grid>
  </Grid>
);
}

export default Questionnaire;
