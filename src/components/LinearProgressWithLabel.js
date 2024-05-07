import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, LinearProgress, Typography } from '@mui/material';

function LinearProgressWithLabel({ value}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Gradually increase the progress to the passed value
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const diff = value - prevProgress;
        if (diff > 0) {
          return Math.min(prevProgress + Math.ceil(diff / 10), value);
        }
        return prevProgress;
      });
    }, 30); // Adjust the speed of the animation by changing the interval duration

    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;
