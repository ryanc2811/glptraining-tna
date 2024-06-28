import React, { useState } from 'react';
import { Box, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function ContactStep({ formData, setFormData, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });
    if (confirmPassword && value !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (formData.password && value !== formData.password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box>
      <Typography component="h1" variant="h4" sx={{ pt: 2, pb: 2 }}>
        Create a new GLP Training TNA account.
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TextField
        margin="normal"
        required
        fullWidth
        id="fullname"
        label="Full Name"
        name="fullname"
        autoComplete="name"
        autoFocus
        value={formData.fullname}
        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handlePasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {passwordError && <Typography color="error">{passwordError}</Typography>}
      <TextField
        margin="normal"
        required
        fullWidth
        name="dob"
        label="Date of Birth"
        type="date"
        id="dob"
        InputLabelProps={{ shrink: true }}
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
      />
    </Box>
  );
}

export default ContactStep;
