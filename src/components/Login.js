import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Typography, Box } from '@mui/material';
import imagePath from '../images/login-image.jpg'; // Adjust the path accordingly
import logoImage from "../images/RGB-Logo-digital use.png";
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container component="main" sx={{ height: { xs: '90vh', sm: '100vh', md: '100vh' },position: 'relative',padding:{md: '2vh' } }}>
      <Grid item xs={12} sm={12} md={5} lg={5} sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            backgroundImage: `url(${imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: { xs: '35vh', sm: '50vh', md: '100%' },
            borderRadius: { md: '8px' },
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              height: { xs: '75%', sm: '50%' },
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)',
              borderRadius: { md: '8px' },
            }
          }}
        />
        <Box
  sx={{
    
    position: 'absolute',
    bottom: '0', // Align to the bottom
    left: '0', // Align to the left
    width: 'auto', // Width can be auto to wrap the text content
    textAlign: 'left', // Align text to the left
    color: 'white',
    zIndex: 1,
    p: 2, // Add some padding inside the text box
  }}
>
  <Typography variant="h5">Find Your Path</Typography>
  <Box sx={{ display :'flex',}}><Typography variant="h6" sx={{color:'#FFFFFF'}}>With</Typography>
  <Box component="img" 
     src={logoImage} 
     alt="GLP Training Logo" 
     sx={{ height: 'auto', 
           maxWidth: '100%', 
           width: { xs: '120px', sm: '150px' },
           pl:'6px'
           }} 
     preserveAspectRatio="xMidYMid meet" 
/> 
  </Box>
</Box>
      </Grid>
      <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
          <Box justify="space-between"
            sx={{
              my: { xs: 5, sm: 5, md:14},
              mx:{ xs: 2, sm: 5, md:20},
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
            }}
          >
           
          <Typography component="h1" variant="h2">Login</Typography>
          
          <Typography component="h1" variant="h4"sx={{pt:2}} >Login to existing GLP Training TNA account.</Typography>
          <Typography component="h1" inline variant="h3" sx={{pt:2}}>Welcome back!</Typography>
          {error && <Typography color="error">{error}</Typography>}
         
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Button onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>
                 Register new account
                </Button>
            <Grid container>
              <Grid item xs>
                <Button onClick={() => navigate('/forgot-password')} sx={{ textTransform: 'none', color:'text.main' }}>
                  Forgot password?
                </Button>
              </Grid>
        
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
}

export default Login;
