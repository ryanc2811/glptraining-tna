import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Grid,
  CircularProgress
} from "@mui/material";
import { db } from '../../firebase';
import { collection, serverTimestamp, addDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import StepOne from "./UpskillQuestion";
import StepTwo from "./IndustryQuestion";
import StepThree from "./BusinessAreaQuestion";
import StepFour from "./DevelopmentAreasQuestion";

const steps = ["Upskill", "Industry", "Business Area", "Development Areas"];

function InitialQuestions({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    upskill_option: "",
    development_areas: "",
    industry_preference: "",
    business_area: "",
    business_area_id: "",
    user_id: "",
    user_tna_id: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        setFormData(currentFormData => ({ ...currentFormData, user_id: user.uid }));
      } else {
        // User is signed out
        navigate("/login");
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const createUserTNA = async () => {
    setIsLoading(true);
    try {
      /*const docRef = await addDoc(collection(db, 'user_tna'), {
        user_id: formData.user_id,
        upskill_option: formData.upskill_option,
        development_areas: formData.development_areas,
        industry_preference: formData.industry_preference,
        business_area: formData.business_area,
        date_started: serverTimestamp(),
      });*/
      setFormData({ ...formData, user_tna_id: 'docRef.id' });
      setIsLoading(false);
      generateQuestions();
    } catch (error) {
      console.error("Failed to create TNA: ", error);
      setIsLoading(false);
    }
  };
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      createUserTNA();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      upskill_option: "",
      development_areas: [],
      industry_preference: "",
      business_area: "",
      user_id: "",
      user_tna_id: "",
    });
  };

  const generateQuestions = async () => {
  

    if (formData.development_areas.length > 0) {
      try {
        setIsLoading(true);

        const user_profile = {
          new_user_profile: {
            dev_areas_str: formData.development_areas.join(" "),
            business_area: formData.business_area
          },
        };

        const response = await fetch('https://recommendations-bpdibe4qla-ez.a.run.app/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user_profile),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setIsLoading(false);
        // Call onComplete when everything is done
        
        onComplete(data[0], formData.business_area_id, formData.user_tna_id); 
        
      } catch (err) {
        console.error("Error during the API call: ", err);
        setIsLoading(false);
      }
    } else {
      alert('Please select at least one development area before submitting.');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <CircularProgress />
        <Typography variant="h3" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }, color: '#001A54' }}>
          GENERATING QUESTIONS...
        </Typography>
      </Box>
    );
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepOne formData={formData} setFormData={setFormData} />;
      case 1:
        return <StepTwo formData={formData} setFormData={setFormData} />;

      case 2:
        return <StepThree formData={formData} setFormData={setFormData} />;

      case 3:
        return <StepFour formData={formData} setFormData={setFormData} />;
  
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper sx={{ my: 2 }} activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography
                sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: ".8rem" } }}
              >
                {" "}
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Generate Questions" : "Next"}
            </Button>
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default InitialQuestions;
