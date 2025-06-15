import { Autocomplete, Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../css/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/userService'
import { useContext } from 'react'
import { userInformation } from '../context/authContext'

const Register = () => {
    const {user} = useContext(userInformation)
  const [data, setData] = useState({})
 const role = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
  ];
  const addUser = async() => {
    try {
      console.log(data);
     const data = await registerUser(data) 
     alert(data.msg)
     if (data.msg ==='User added successfully') {
        
     }
    } catch (error) {
console.log(error);
    }
  }
 return (
  <div className='login-container'  >
 
    <Box className='login-box'>
      <h1 style={{ color: '#177bad', textAlign: 'center', marginBottom: 24, fontWeight: 700 }}>Register</h1>
      <TextField variant='outlined' label='Name' name='name' onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
      <TextField variant='outlined' label='Password' type='password' name='password' onChange={(e) => setData({ ...data, password: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small'/>
      <TextField variant='outlined' label='Email' type='email' name='email' onChange={(e) => setData({ ...data, email: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
        <Autocomplete
                    sx={{ width: '375px' }}
                    options={role}
                    getOptionLabel={(option) => option?.value}
                    onChange={(e, newValue) => setData({ ...data, role: newValue?.value || '' })}
                  renderInput={(params) => <TextField {...params} name='role' label="Role" size="small" />}
                  />
      <Button
        variant='contained'
        sx={{
            marginTop:'15px',
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
        onClick={addUser}
      >
        Register
      </Button>
      {user ? (<></>) : (<>      
      <div style={{ width: '100%', textAlign: 'center', marginTop: 16 }}>
        <Link to={'/'} style={{ color: '#177bad', textDecoration: 'none', fontWeight: 500 }}>
          BACK TO LOGIN
        </Link>
      </div>
      </>)}
    </Box>
  </div>
)
}

export default Register