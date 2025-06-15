import { Button, Card, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addingCity } from "../services/cityService";

const AddCity = () => {
    const [city, setCity] = useState({ city_name: '', population: '' })

    const handleChange = (e) => {
        try {
            setCity({ ...city, [e.target.name]: e.target.value })
        } catch (error) {
            console.log(error);

        }
    }
    const addCity = async () => {
        try {
            const cityData = await addingCity(city)
            if (cityData.msg === 'City added successfully') {
                alert(cityData.msg)
                setCity({ city_name: '', population: '' })
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} md={8} lg={6}>
                    <Card sx={{ borderRadius: 4, boxShadow: 6, background: 'white', p: 3 }}>
                        <Typography variant="h5" fontWeight={700} color="#c26afc" gutterBottom>
                            Category Manager
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>
                            <TextField
                                variant='outlined'
                                label='City Name'
                                name={'city_name'}
                                value={city.city_name}
                                onChange={handleChange}
                                size='small'
                                fullWidth
                            />
                            <TextField
                                variant='outlined'
                                label='Population'
                                name={'population'}
                                value={city.population}
                                onChange={handleChange}
                                size='small'
                                fullWidth
                            />
                            <Button
                                variant='contained'
                                sx={{
                                    background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)',
                                    color: 'whitesmoke',
                                    fontWeight: 600,
                                    px: 4,
                                    boxShadow: 2,
                                    height: 40
                                }}
                                onClick={addCity}
                            >
                                Add
                            </Button>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default AddCity