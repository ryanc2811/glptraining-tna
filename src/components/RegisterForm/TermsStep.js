import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography, Link as MuiLink } from '@mui/material';

function TermsStep({ formData, setFormData }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
      <Typography component="h1" variant="h4" sx={{ pt: 2, pb: 2 }}>Terms and Conditions</Typography>
      <Typography sx={{ pb: 2 }}>
        Please read our <MuiLink href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</MuiLink> and <MuiLink href="/gdpr" target="_blank" rel="noopener noreferrer">GDPR Statement</MuiLink>.
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreedToPrivacy}
            onChange={e => setFormData({ ...formData, agreedToPrivacy: e.target.checked })}
            name="agreedToPrivacy"
          />
        }
        label="I have read and agree to the Privacy Policy."
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreedToTerms}
            onChange={e => setFormData({ ...formData, agreedToTerms: e.target.checked })}
            name="agreedToTerms"
          />
        }
        label="I agree to the Terms and Conditions."
      />
    </Box>
  );
}

export default TermsStep;
