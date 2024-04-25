import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

function EmploymentStep({ formData, setFormData }) {
  return (
    <Box>
      <Typography variant="h6">Enter your employment details</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="company"
        label="Company Name"
        name="company"
        autoComplete="organization"
        value={formData.company}
        onChange={e => setFormData({ ...formData, company: e.target.value })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="jobRole"
        label="Job Role"
        name="jobRole"
        autoComplete="job-title"
        value={formData.jobRole}
        onChange={e => setFormData({ ...formData, jobRole: e.target.value })}
      />
    </Box>
  );
}

export default EmploymentStep;
