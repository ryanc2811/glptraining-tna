import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Paper,
  Box,
  Button,
  Typography,
  Grid,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import LinearProgressWithLabel from "../LinearProgressWithLabel"; // Adjust the import path as needed
import MyCarousel from '../StyledComponents/MyCarousel';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { collection, addDoc} from 'firebase/firestore';
const ScenarioQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, businessAreaId, userTnaId } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ratings, setRatings] = useState(Array(questions.length).fill(null)); // Initialise an array to hold ratings for all questions
  const { currentUser } = useAuth();
  const [openTooltip, setOpenTooltip] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const ratingDescriptions = [
    "1 - Little to no knowledge",
    "2 - Basic understanding",
    "3 - Intermediate proficiency",
    "4 - Advanced proficiency",
    "5 - Expert knowledge"
  ];

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    if (questions && questions.length > 0 && currentQuestionIndex < questions.length) {
      setIsLoading(true);
      const questionDetails = questions[currentQuestionIndex];
      setCurrentQuestion(questionDetails || {});
      setIsLoading(false);
      // Update progress each time a new question is fetched
      const newValue = ((currentQuestionIndex + 1) / questions.length) * 100;
      setProgress(newValue);
      // Reset tooltip state when moving to a new question
      setOpenTooltip(null);
    } else {
      setIsLoading(false);
    }
  }, [questions, currentQuestionIndex, businessAreaId, currentUser, navigate]);

  const handleRating = (rating) => {
    const updatedRatings = [...ratings];
    updatedRatings[currentQuestionIndex] = rating;
    setRatings(updatedRatings);
    
  };

  const handleNext = async() => {
    if (!ratings[currentQuestionIndex]) {
      alert("Please select a rating before proceeding.");
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {

      const user_id= currentUser ? currentUser.uid : null;

      
      // Prepare data for the API call
    const userProfile = questions.map((question, index) => ({
      business_area_id: question.business_area_id,
      skills: question.related_skill,
      proficiency: ratings[index] > 3 ? 'proficient' : 'needs_improvement'
    }));

    // Call the course recommendation API
    const courseRecommendationResponse = await fetch('https://recommendations-bpdibe4qla-ez.a.run.app/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_responses: userProfile })
    });

    const { predicted_courses } = await courseRecommendationResponse.json();

    // Filter skills based on proficiency
    const topSkills = userProfile.filter(response => response.proficiency === 'proficient').map(response => response.skills);
    const skillsToImprove = userProfile.filter(response => response.proficiency === 'needs_improvement').map(response => response.skills);

    // Store the data in Firestore
    const resultDoc = await addDoc(collection(db, 'tna_results'),{
      predicted_courses,
      top_skills:topSkills,
      skills_to_improve:skillsToImprove,
      user_id: user_id,
      user_tna:userTnaId
    });

    // Navigate to the results page with the ID of the Firestore document
    navigate(`/results/${resultDoc.id}`);
  }
};

  const handleBack = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const handleTooltipOpen = (rating) => {
    if (isMobile) {
      setOpenTooltip(openTooltip === rating ? null : rating);
      handleRating(rating);
    }
  };

 return (
  <Grid
  container
  component="main"
  sx={{
    height: { xs: "90vh", sm: "100vh", md: "100vh" },
    position: "relative",
    padding: { md: "2vh" },
  }}
>
  <MyCarousel />
  <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
    <Box
      sx={{
        my: { xs: 5, sm: 5, md: 5 },
        mx: { xs: 2, sm: 5, md: 15 },
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
      }}
    >
      <Typography variant="body2">Results Progress</Typography>
      <LinearProgressWithLabel value={progress} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mt: 4, mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "primary.main",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
                marginRight: 2,
                mt: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{color:'white'}}>
                {currentQuestionIndex + 1}
              </Typography>
            </Box>
            <Typography sx={{ mt: 2 }} variant="h2" component="h1">
              Scenario
            </Typography>
          </Box>
          <Typography variant="body1">{currentQuestion.scenario}</Typography>
          <Typography
            sx={{ mt: 2 }}
            variant="h3"
            component="h1"
            gutterBottom
          >
            Question
          </Typography>
          <Typography variant="body2">{currentQuestion.text}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography
              sx={{ my: 2, color: "#001A54", fontWeight: "bold" }}
              variant="h4"
            >
              Rank your ability
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {[1, 2, 3, 4, 5].map((rating, index) => (
              <Tooltip
                key={rating}
                title={ratingDescriptions[index]}
                open={isMobile ? openTooltip === rating : undefined}
                onOpen={() => handleTooltipOpen(rating)}
                onClose={() => handleTooltipOpen(rating)}
              >
                <Button
                  variant={
                    ratings[currentQuestionIndex] === rating
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => {
                    if (isMobile) {
                      handleTooltipOpen(rating);
                    } else {
                      handleRating(rating);
                    }
                  }}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setOpenTooltip(rating);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setOpenTooltip(null);
                    }
                  }}
                  sx={{
                    mx: 0.5,
                    height: "50px",
                    width: "50px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    padding: "10px 16px",
                    textTransform: "none",
                  }}
                >
                  {rating}
                </Button>
              </Tooltip>
            ))}
          </Box>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={ratings[currentQuestionIndex] === null}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish"
                : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  </Grid>
</Grid>
  );
};

export default ScenarioQuestion;
