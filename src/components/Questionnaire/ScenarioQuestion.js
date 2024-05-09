import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Paper,
  Box,
  Button,
  Typography,
  Grid,
} from "@mui/material";

import LinearProgressWithLabel from "../LinearProgressWithLabel"; // Adjust the import path as needed
import imagePath from "../../images/scenario-question-img.jpg"; // Adjust the path accordingly
import logoImage from "../../images/logo_whitetab.svg";

const ScenarioQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, businessAreaId, userTnaId } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ratings, setRatings] = useState(Array(questions.length).fill(null)); // Initialize an array to hold ratings for all questions

  useEffect(() => {
    if (questions && questions.length > 0 && currentQuestionIndex < questions.length) {
      setIsLoading(true);
      const questionDetails = questions[currentQuestionIndex];
      setCurrentQuestion(questionDetails || {});
      setIsLoading(false);
      // Update progress each time a new question is fetched
      const newValue = ((currentQuestionIndex + 1) / questions.length) * 100;
      setProgress(newValue);
    } else {
      setIsLoading(false);
    }
  }, [questions, currentQuestionIndex, businessAreaId]);

  const handleRating = (rating) => {
    const updatedRatings = [...ratings];
    updatedRatings[currentQuestionIndex] = rating;
    setRatings(updatedRatings);
  };

  const handleNext = () => {
    if (!ratings[currentQuestionIndex]) {
      alert("Please select a rating before proceeding.");
      return;
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      navigate("/results", { state: { userTnaId } });
    }
  };

  const handleBack = () => {
    const prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
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
    <Grid
      item
      xs={12}
      sm={6}
      md={5}
      lg={5}
      sx={{ position: "relative", display: "flex", justifyContent: "center" }}
    >
        <Box sx={{ backgroundImage: `url(${imagePath})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%", borderRadius: "8px", overflow: "hidden", "&::after": { content: '""', position: "absolute", bottom: 0, right: 0, left: 0, height: "50%", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)", borderRadius: "8px" }, }}>
          <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "auto", textAlign: "left", color: "white", zIndex: 1, p: 2 }}>
            <Typography variant="h5">Find Your Path</Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6">With</Typography>
              <Box component="img" src={logoImage} alt="GLP Training Logo" sx={{ height: "auto", maxWidth: "100%", width: { xs: "120px", sm: "150px" }, pl: "6px" }} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
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
                <Box sx={{ width: 40, height: 40, backgroundColor: "primary.main", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "common.white", marginRight: 2, mt: 2 }}>
                  <Typography variant="subtitle1">{currentQuestionIndex + 1}</Typography>
                </Box>
                <Typography sx={{ mt: 2 }} variant="h2" component="h1">Scenario</Typography>
              </Box>
              <Typography variant="body1">{currentQuestion.scenario}</Typography>
              <Typography sx={{ mt: 2 }} variant="h3" component="h1" gutterBottom>Question</Typography>
              <Typography variant="body2">{currentQuestion.text}</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Typography sx={{ my: 2, color: "#001A54", fontWeight: "bold" }} variant="h4">Rank your ability</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button key={rating} variant={ratings[currentQuestionIndex] === rating ? "contained" : "outlined"} onClick={() => handleRating(rating)} sx={{ mx: 0.5, height: "50px", width: "50px", fontSize: "1rem", fontWeight: "bold", padding: "10px 16px", textTransform: "none" }}>{rating}</Button>
                ))}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button color="inherit" disabled={currentQuestionIndex === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button variant="contained" color="primary" onClick={handleNext} disabled={ratings[currentQuestionIndex] === null}>{currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}</Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ScenarioQuestion;
