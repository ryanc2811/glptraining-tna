import React from 'react';
import { Box, Checkbox, FormControlLabel, Link, Typography } from '@mui/material';

function TermsStep({ formData, setFormData }) {
  return (
    <Box>
      <Typography variant="h6">Terms and Conditions</Typography>
      <Typography>
        Please read our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/gdpr">GDPR Statement</Link>.
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
