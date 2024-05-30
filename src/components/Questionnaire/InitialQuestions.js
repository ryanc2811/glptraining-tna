import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";
import { db } from '../../firebase';
import { collection, serverTimestamp, addDoc, getDocs, doc,getDoc} from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import StepOne from "./UpskillQuestion";
import StepTwo from "./IndustryQuestion";
import StepThree from "./BusinessAreaQuestion";
import StepFour from "./DevelopmentAreasQuestion";

const steps = ["Upskill", "Industry", "Business Area", "Development Areas"];

function InitialQuestions({ onComplete }) {
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    upskill_option: "",
    development_areas: "",
    industry_preference: "",
    business_area: "",
    business_area_id: "",
    user_id: currentUser ? currentUser.uid : null, 
    user_tna_id: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

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

        const questionIds = await response.json(); // Assume this returns an array of question IDs
        const questions = await fetchAllQuestionsDetails(questionIds[0]);
        setIsLoading(false);

        // Call onComplete when all questions are fetched
        onComplete(questions, formData.business_area_id, formData.user_tna_id);
        
      } catch (err) {
        console.error("Error during the API call: ", err);
        setIsLoading(false);
      }
    } else {
      alert('Please select at least one development area before submitting.');
    }
};

const fetchAllQuestionsDetails = async (questionIds) => {
  const questions = [];
  const businessAreasRef = collection(db, "business_areas");
  const businessAreasSnap = await getDocs(businessAreasRef);

  for (const id of questionIds) {
    let found = false;
    for (const businessAreaDoc of businessAreasSnap.docs) {
      if (found) break; // Stop searching if the question is found
      const questionRef = doc(db, "business_areas", businessAreaDoc.id, "questions", id);
      const questionSnap = await getDoc(questionRef);
      if (questionSnap.exists()) {
        questions.push(questionSnap.data());
        found = true;
      }
    }
    if (!found) console.log(`Question ID ${id} not found across any business areas.`);
  }
  return questions;
};

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", height:'80vh'}}>
                <CircularProgress sx={{mx:2}} />
                <Typography variant="h3" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem'}, color: '#001A54' }}>
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
