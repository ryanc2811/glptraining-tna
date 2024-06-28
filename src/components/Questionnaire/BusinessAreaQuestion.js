import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';

function BusinessAreaQuestion({ formData, setFormData, error }) {
  const theme = useTheme();
  const [businessAreas, setBusinessAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBusinessAreas = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "business_areas"));
      const activeBusinessAreas = querySnapshot.docs
        .filter(doc => doc.data().active)
        .map(doc => ({ ...doc.data(), id: doc.id }));
      setBusinessAreas(activeBusinessAreas);
      setIsLoading(false);
    };
    fetchBusinessAreas();
  }, []);

  const handleSelect = (option, id) => {
    setFormData({ ...formData, business_area: option, business_area_id: id });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', m: 4 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper
            elevation={0}
            square
            sx={{
              border: '2px solid #6200EE',
              borderRadius: 2,
              padding: '20px',
              marginTop: '20px',
              maxWidth: '947px',
              width: { xs: '100%', sm: '50%', md: '100%' },
            }}
          >
            <Box textAlign="center" sx={{ color: theme.palette.primary.main }}>
              <Typography variant="h3" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }, color: '#001A54' }}>
                <span style={{ fontWeight: 'normal' }}>WHAT</span> BUSINESS AREA <span style={{ fontWeight: 'normal' }}>DO YOU WORK IN?</span>
              </Typography>
            </Box>
          </Paper>
          <Box
            sx={{
              overflowY: 'auto',
              maxHeight: { xs: '340px', sm: '340px', md: '340px' },
              width: { xs: '90%', sm: '40%', md: '70%' },
              padding: '10px',
            }}
          >
            {businessAreas.map((business) => (
              <Button
                key={business.id}
                variant={formData.business_area === business.title ? "contained" : "outlined"}
                sx={{
                  justifyContent: 'space-between',
                  pl: 3,
                  pr: 3,
                  width: '100%',
                  height: '90px',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' },
                  minWidth: '150px',
                  '&.MuiButton-contained': {
                    color: theme.palette.common.white,
                  },
                  mb: 2,
                }}
                onClick={() => handleSelect(business.title, business.id)}
              >
                {business.title}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default BusinessAreaQuestion;
