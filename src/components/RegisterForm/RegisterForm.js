import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography, Grid, Alert } from '@mui/material';
import StepOne from './ContactStep';
import StepTwo from './EmploymentStep';
import StepThree from './TermsStep';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase'; 
import { doc, setDoc } from 'firebase/firestore';
const steps = ['Account Setup', 'Employment Details', 'Terms & Conditions'];

function RegisterForm() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    dob: '',
    company: '',
    jobRole: '',
    agreedToPrivacy: false,
    agreedToTerms: false
  });
  const [error, setError] = useState('');

  const handleNext = () => {
    if (isValidStep()) {
      if (activeStep === steps.length - 1) {
        registerAccount(); // Call the register function when on the final step
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setError('');
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      fullname: '',
      email: '',
      password: '',
      dob: '',
      company: '',
      jobRole: '',
      agreedToPrivacy: false,
      agreedToTerms: false
    });
    setError('');
  };

  const isValidStep = () => {
    switch (activeStep) {
      case 0: // Account Setup
        if (!formData.fullname || !formData.email || !formData.password || !formData.dob) {
          setError('Please fill all fields in Account Setup.');
          return false;
        }
        break;
      case 1: // Employment Details
        if (!formData.company || !formData.jobRole) {
          setError('Please fill all fields in Employment Details.');
          return false;
        }
        break;
      case 2: // Terms & Conditions
        if (!formData.agreedToPrivacy || !formData.agreedToTerms) {
          setError('You must agree to the privacy policy and terms & conditions.');
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const registerAccount = async () => {
    try {
      const userCredential = await register(formData.email, formData.password);
      const userId = userCredential.user.uid;
      
      await setDoc(doc(db, 'users', userId), {
        fullname: formData.fullname,
        email: formData.email,
        dob: formData.dob,
        company: formData.company,
        jobRole: formData.jobRole,
        agreedToPrivacy: formData.agreedToPrivacy,
        agreedToTerms: formData.agreedToTerms,
        user_id: userId
      });
      navigate('/'); // Navigate after successful registration and data saving
    } catch (error) {
      setError(error.message);
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepOne formData={formData} setFormData={setFormData} error={error} />;
      case 1:
        return <StepTwo formData={formData} setFormData={setFormData} />;
      case 2:
        return <StepThree formData={formData} setFormData={setFormData} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper sx={{ my: 2 }} activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            {/*Redirect to login after account created*/}
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {error && <Alert severity="error">{error}</Alert>}
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Create account' : 'Next'}
              </Button>
            </Box>
          </div>
        )}
      </div>
      <Grid container>
        <Grid item xs>
          <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>
            Already have an account?
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterForm;
