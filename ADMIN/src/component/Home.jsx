import { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { getUser } from "../services/userService";
import { getCities } from "../services/cityService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getUser(1).then(data => setUsers(data.users || []));
    getCities().then(data => setCities(data.cities || []));
  }, []);

  const chartData = cities.map(city => ({
    name: city.city_name,
    population: Number(city.population) || 0,
  }));

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
     
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 3, textAlign: "center", background: "#f3eafd" }}>
          <Typography variant="h6" color="#c26afc">Total Users</Typography>
          <Typography variant="h4">{users.length}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 3, textAlign: "center", background: "#eaf7fd" }}>
          <Typography variant="h6" color="#177bad">Total Cities</Typography>
          <Typography variant="h4">{cities.length}</Typography>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>Population by City</Typography>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="population" fill="#177bad" />
          </BarChart>
        </Card>
      </Grid>
      
    </Grid>
  );
};

export default Home;