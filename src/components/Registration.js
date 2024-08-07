import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Registration = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here


    // const data = Object.fromEntries(formData.entries());
    await axios.post(`/user/register`, formData)
    navigate('/Login')
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
  };

  return (
    <Container maxWidth="sm" sx={{ maxWidth: '400px' }}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4">User Registration</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            name="firstname"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.firstname}
            onChange={handleChange}
            size='small'
            required
          />
          <TextField
            label="Last Name"
            name="lastname"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.lastname}
            onChange={handleChange}
            size='small'
            required
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            size='small'
            required
          />
          <TextField
            label="Phone Number"
            name="phone"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            size='small'
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            size='small'
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            size='small'
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            size='small'
          >
            Register
          </Button>
          <Box display="flex" justifyContent="space-between" width="100%" mt={2}>

            <Link to='/Login' ><Button>Login</Button></Link>
            <Link to='/'><Button>Forgot Password?</Button></Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
