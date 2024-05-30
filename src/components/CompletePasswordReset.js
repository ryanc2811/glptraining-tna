// src/components/CompletePasswordReset.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CompletePasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [validCode, setValidCode] = useState(false);
  const query = useQuery();
  const oobCode = query.get('oobCode');
  const navigate = useNavigate();
  const { verifyPasswordReset, confirmPasswordResetCode } = useAuth();

  useEffect(() => {
    const verifyCode = async () => {
      try {
        await verifyPasswordReset(oobCode);
        setValidCode(true);
      } catch (error) {
        setError('Invalid or expired password reset code.');
      }
    };

    if (oobCode) {
      verifyCode();
    }
  }, [oobCode, verifyPasswordReset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmPasswordResetCode(oobCode, newPassword);
      setMessage('Password has been reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError('Failed to reset password.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Your Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        {validCode ? (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Reset Password
            </Button>
          </form>
        ) : (
          <Typography variant="body1" component="p">
            Checking reset code...
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CompletePasswordReset;
