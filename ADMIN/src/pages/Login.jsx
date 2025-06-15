
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'
import { loginUser } from '../services/userService';
import { userInformation } from '../context/authContext';

const Login = () => {
    const {user ,dispatch} = useContext(userInformation)
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate()

    const handleChange = async (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const getAuthorize = async () => {
       const user = await loginUser(loginData)
       if (user.msg === "Login successful") {
           dispatch({ type: 'LOGIN_SUCCESS', payload: user.user })
           user.user  ? navigate('/dashboard') : alert(user.msg)
       } else {
           alert(user.msg)
       }
       
    }

   return (
    <div className="login-container">
  
    <Box className='login-box'>
      <Typography variant="h4" fontWeight={700} color="#177bad" mb={3} textAlign="center">
        Login
      </Typography>
      <TextField
        variant='outlined'
        label='Email'
        name='email'
        onChange={handleChange}
        sx={{ mb: 2, width: '100%' }}
      />
      <TextField
        variant='outlined'
        label='Password'
        type='password'
        name='password'
        onChange={handleChange}
        sx={{ mb: 3, width: '100%' }}
      />
      <Button
        variant='contained'
        onClick={()=> getAuthorize()}
        sx={{
          background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)',
          color: 'white',
          fontWeight: 600,
          width: '100%',
          mb: 2,
          boxShadow: 2,
          '&:hover': {
            background: 'linear-gradient(90deg, #177bad 0%, #c26afc 100%)',
          },
        }}
      >
        LOGIN
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <Link to={'/register'} style={{ color: '#177bad', textDecoration: 'none', fontWeight: 500 }}>
          SIGN UP FOR NEW USER
        </Link>
      </Typography>
    </Box>
  </div>
)
}

export default Login