import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material';

const Login = () => {
//   const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4">Login</Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>

          <Link href="#" >Sign Up</Link>
          <Link href="#">Forgot Password?</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
