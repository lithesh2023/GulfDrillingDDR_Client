import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userAction'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

const base_url = process.env.REACT_APP_API_URL
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const userCredentials = { email, password }
        const response = await axios.post(`/user/login`, userCredentials, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        dispatch(setUser(response.data, navigate, from))
    };

    return (
        <Container maxWidth="sm" sx={{ maxWidth: '400px' }}>
            <Box component="form" display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4">Login</Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    size='small'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    size='small'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                    Login
                </Button>
                <Box display="flex" justifyContent="space-between" width='100%' mt={2}>

                    <Link to='/Register' ><Button>Register</Button></Link>
                    <Link to='/'><Button>Forgot Password?</Button></Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
