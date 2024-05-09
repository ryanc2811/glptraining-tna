import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function GDPRStatement() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        GDPR Statement
      </Typography>
      <Typography paragraph>
        We are committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection. We have robust and effective data protection programs in place which comply with existing law and abide by the data protection principles.
      </Typography>
      <Typography paragraph>
        As part of our GDPR compliance process, we have updated our existing policies and procedures to meet the requirements and standards of the GDPR and any relevant data protection laws, including:
      </Typography>
      <Typography paragraph>
        <ul>
          <li>Data Protection – our main policy and procedure document for data protection has been overhauled to meet the standards and requirements of the GDPR. Accountability and governance measures are in place to ensure that we understand and adequately disseminate and evidence our obligations and responsibilities; with a dedicated focus on privacy by design and the rights of individuals.</li>
          <li>Data Retention & Erasure – we have updated our retention policy and schedule to ensure that we meet the "data minimization" and "storage limitation" principles and that personal information is stored, archived, and destroyed compliantly and ethically. We have dedicated erasure procedures in place to meet the new 'Right to Erasure' obligation and are aware of when this and other data subject's rights apply; along with any exceptions, response timeframes, and notification responsibilities.</li>
          <li>Data Breaches – our breach procedures ensure that we have safeguards and measures in place to identify, assess, investigate, and report any personal data breach at the earliest possible time. Our procedures are robust and have been disseminated to all employees, making them aware of the reporting lines and steps to follow.</li>
        </ul>
      </Typography>
      <Typography paragraph>
        If you wish to discuss or exercise your data protection rights, please contact us using the information provided on our contact page.
      </Typography>
      <Typography paragraph>
        More detailed information about our data protection policies and procedures can be found on our website, or by contacting us directly.
      </Typography>
    </Box>
  );
}

export default GDPRStatement;
