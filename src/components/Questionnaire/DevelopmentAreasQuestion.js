import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getDoc, doc,  } from "firebase/firestore";
import { db } from "../../firebase";

function DevelopmentAreasQuestion({ formData, setFormData, error }) {
  const theme = useTheme();
  const [developmentAreas, setDevelopmentAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDevelopmentAreas = async () => {
      const docRef = doc(db, "business_areas", formData.business_area_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDevelopmentAreas(docSnap.data().development_areas);
      } else {
        console.log("No such document!");
      }
    };
    if (formData.business_area_id) {
      fetchDevelopmentAreas();
    }
  }, []);

  const handleSelect = (option) => {
    setFormData((currentFormData) => {
      // Check if the 'development_areas' array already includes the option
      if (currentFormData.development_areas.includes(option)) {
        // If the option is already included, filter it out
        return {
          ...currentFormData,
          development_areas: currentFormData.development_areas.filter(
            (selectedOption) => selectedOption !== option
          ),
        };
      } else {
        // If the option is not included, add it to the array
        return {
          ...currentFormData,
          development_areas: [...currentFormData.development_areas, option],
        };
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        m: 4,
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper
            elevation={0}
            square
            sx={{
              border: "2px solid #6200EE",
              borderRadius: 2,
              padding: "20px",
              marginTop: "20px",
              maxWidth: "947px",
              width: { xs: "100%", sm: "50%", md: "100%" },
            }}
          >
            <Box textAlign="center" sx={{ color: theme.palette.primary.main }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                  color: "#001A54",
                }}
              >
                <span style={{ fontWeight: "normal" }}>WHAT</span> KEY AREAS{" "}
                <span style={{ fontWeight: "normal" }}>
                  DO YOU WANT TO DEVELOP? (SELECT ALL THAT APPLY)
                </span>
              </Typography>
            </Box>
          </Paper>
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: { xs: "340px", sm: "340px", md: "300px" },
              width: { xs: "100%", sm: "40%", md: "100%" },
              padding: "10px",
            }}
          >
            <Grid container spacing={1} justifyContent="center">
              {developmentAreas.map((area, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    key={area}
                    variant={
                      formData.development_areas.includes(area) ? "contained" : "outlined"
                    }
                    sx={{
                      justifyContent: "space-between",
                      pl: 3,
                      pr: 3,
                      width: "100%", // Make buttons full width inside the scrollable area
                      height: "60px",
                      fontSize: { xs: "0.5rem", sm: "0.7rem", md: ".8rem" },
                      minWidth: "100px",

                      "&.MuiButton-contained": {
                        color: theme.palette.common.white,
                      },
                      mb: 1, // Add some space between buttons
                    }}
                    onClick={() => handleSelect(area)}
                  >
                    {area}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}

export default DevelopmentAreasQuestion;
