import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography} from '@mui/material';
import StepOne from './ContactStep';
import StepTwo from './EmploymentStep';
import StepThree from './TermsStep';

const steps = ['Account Setup', 'Personal Details', 'Confirm Details'];

function RegisterForm() {
  const [activeStep, setActiveStep] = useState(0);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepOne formData={formData} setFormData={setFormData} />;
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
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
}

export default RegisterForm;
