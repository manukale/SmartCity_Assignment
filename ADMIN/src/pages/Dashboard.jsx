import { AppBar, Box, Button, Card, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInformation } from "../context/authContext";
import { useContext } from "react";
import UserList from "../component/UserList";
import CityList from "../component/CityList";
import AddCity from "../component/AddCity";
import Home from "../component/Home";
import Register from "./Register";

const adminAccess = [
  { label: 'User List', value: 'userlist' },
  { label: 'ALL Cities', value: 'cities' },
  { label: 'Add City', value: 'addcity' },
  { label: 'Add User', value: 'adduser' },
  
];

const userAccess = [
  { label: 'User List', value: 'userlist' },
  { label: 'All City', value: 'cities' },
];

const selected = {
  background: "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
  color: "white",
  borderRadius: "8px",
  fontWeight: 600,
  boxShadow: 2,
};

const unSelected = {
  color: "#c26afc",
  borderRadius: "8px",
  fontWeight: 500,
  transition: "background 0.2s",
  '&:hover': {
    backgroundColor: "#f3e7e9",
  }
};

const Dashboard = () => {
  const { user, dispatch } = useContext(userInformation)
  const [comp, setComp] = useState('Home')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [ navigate])

  const logOut = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <Box>
      <AppBar position='static' elevation={0} sx={{ background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)' }}>
        <Toolbar>
          <Typography variant='h5' sx={{ color: 'whitesmoke', flexGrow: 1, fontWeight: 700 }}>
           Dashboard-{user?.role}
          </Typography>
          <Button variant='outlined' style={{ color: 'white', borderColor: 'white' }} onClick={() => setComp('Home')}>
            Home
          </Button>
          <Button variant='outlined' sx={{ color: 'white', borderColor: 'white',ml:2 }} onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container sx={{ minHeight: 'calc(100vh - 100px)' ,overflow: 'hidden' }}>
        
        <Grid item xs={12} sm={3} md={2} sx={{ minWidth: 220 }}>
          <Card
            sx={{
              m: 3, 
              borderRadius: 4,
              boxShadow: 6,
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'ceneter',
              p: 2,
              height: 'calc(100vh - 160px)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: "#c26afc", fontWeight: 700, mb: 2, textAlign: 'center' }}>
              Menu
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List  >
                {user?.role === 'admin' ? (<>
                  {adminAccess.map((item) => (
                <ListItemButton
                  key={item.value}
                  selected={comp === item.value}
                  onClick={() => setComp(item.value)}
                  sx={comp === item.value ? selected : unSelected }
                  style={{textAlign:'center'}}
                >
                  
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
                </>) : (<>
                  {userAccess.map((item) => (
                <ListItemButton
                  key={item.value}
                  selected={comp === item.value}
                  onClick={() => setComp(item.value)}
                  sx={comp === item.value ? selected : unSelected}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
                </>)}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} sm={9} md={10} sx={{ py: 3, pr: 3, pl: 0 }}>
          <Box sx={{ minHeight: '80vh', width: '100%' }}>
            {
              {
               userlist: <UserList/>,
                cities: <CityList/>,
                addcity :<AddCity/>,
                adduser :<Register/>,
                Home:<Home/>
              }[comp]
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard