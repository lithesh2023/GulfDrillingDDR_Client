import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';


const base_url = "http://localhost:4000/api/v1"
const Login = ({onData}) => {
     const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here
        axios.post(`${base_url}/user/login`, { email, password }).then((result)=>{
            
            localStorage.setItem('token',result.data.token)
            onData(result.data.currentUser)
            login()
            navigate('/Dashboard')
        })
       
        
    };

    return (
        <Container maxWidth="sm" sx={{maxWidth:'400px'}}>
            <Box display="flex" flexDirection="column" alignItems="center">
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
                <Button variant="contained" color="primary"  onClick={handleLogin} sx={{ mt: 2 }}>
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
