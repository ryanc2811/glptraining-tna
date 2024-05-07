import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

function ContactStep({ formData, setFormData,error }) {
    return (
        <Box>
            <Typography component="h1" variant="h4"sx={{pt:2}} >Create a new GLP Training TNA account.</Typography>

            {error && <Typography color="error">{error}</Typography>}
          <Typography variant="h6">Enter your personal details</Typography>
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
            onChange={e => setFormData({ ...formData, fullname: e.target.value })}
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
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
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
            onChange={e => setFormData({ ...formData, dob: e.target.value })}
          />
        </Box>
      );
    }

export default ContactStep;
