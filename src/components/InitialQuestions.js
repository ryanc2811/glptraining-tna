import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Paper } from '@mui/material';

function InitialQuestions() {
  const location = useLocation();

  // Define your question paths as an array for easy reference
  const questionPaths = ['upskill', 'industry', 'business', 'development-areas']; // The first element corresponds to the index route
  const isActive = (path) => {
    // Extract the current path segment from the URL, defaulting to the index route
    const currentPath = location.pathname.split('/').pop() || '';
    return currentPath === path;
  };

  return (
    <div className="questionnaire">
      <Box display="flex" justifyContent="center" marginTop={2}>
        {questionPaths.map((path, index) => (
          <Paper
            key={index}
            elevation={isActive(path) ? 4 : 0}
            square={false}
            style={{
              width: 70,
              height: 25,
              borderRadius: 5,
              margin: '0 5px',
              backgroundColor: isActive(path) ? '#9666FF' : 'transparent',
              border: `1px solid ${isActive(path) ? '#9666FF' : '#9666FF'}`,
            }}
          />
        ))}
      </Box>
      <Outlet />
    </div>
  );
}

export default InitialQuestions;
