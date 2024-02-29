import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Button, TextField, Typography, Grid, Link, Checkbox, FormControl, FormControlLabel, InputLabel, Avatar, CssBaseline, Box, Paper, MenuItem, Select } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";


const defaultTheme = createTheme();

const SignUp = ({ toggleForm }) => {
  const { setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [showSpecialty, setShowSpecialty] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUpResponse = await fetch('http://localhost:3000/api/v1/users/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, role, specialty }),
      });
      const signUpData = await signUpResponse.json();
  

      if (signUpResponse.ok) {
        const signInResponse = await fetch('http://localhost:3000/api/v1/users/SignIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), 
        });
        const signInData = await signInResponse.json();
  

        if (signInResponse.ok) {
          const { token, user } = signInData;
          localStorage.setItem('token', token); // Store token in local storage
          setUser(user); // Set user in context
          navigate('/profile'); // Redirect to profile page
        } else {
          throw new Error(signInData.error);
        }
      } else {
        throw new Error(signUpData.error);
      }
    } catch (error) {
      console.error('Sign up or sign in error:', error.message);
    }
  };
  
  

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    if (event.target.value === 'doctor') {
      setShowSpecialty(true);
    } else {
      setShowSpecialty(false);
      setSpecialty('');
    }
  };

  return (
    <ThemeProvider  theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/images/White and Blue Minimalist Medical Presentation.png")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="fullName"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      value={role}
                      onChange={handleRoleChange}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="doctor">Doctor</MenuItem>
                      <MenuItem value="patient">Patient</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {showSpecialty && (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="specialty"
                      label="Specialty"
                      id="specialty"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="terms" color="primary" />}
                    label="I agree to the terms and conditions."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                <Link href="#" variant="body2" onClick={toggleForm}>
  Already have an account? Sign in
</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
