import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { cityDelete, cityUpdate, getCities } from "../services/cityService";
import { useContext } from "react";
import { userInformation } from "../context/authContext";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Close } from '@mui/icons-material'

const CityList = () => {
    const { user } = useContext(userInformation)
    const [cities, setCities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        fetchCities();
    }, [currentPage]);

    const fetchCities = async () => {
        const data = await getCities(currentPage);
        setCities(data.cities);
        setTotalPages(data.totalPages);
    };

    const deleteCity = async (id) => {
        try {
            const res = await cityDelete(id)
            alert(res.msg)
            fetchCities();
        } catch (error) {
            console.log(error);
        }
    }
    const updateCity = async (cityData) => {
        try {
            setOpen(true)
            setData(cityData)
        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {
        try {
            const res = await cityUpdate(data._id, data)
            setOpen(false)
            alert(res.msg)
            fetchCities();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <h2>City List </h2>
                <table width="800px" style={{ border: '1px solid #ddd' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd' }}>Id</th>
                            <th style={{ border: '1px solid #ddd' }}>Name</th>
                            <th style={{ border: '1px solid #ddd' }}>Population</th>
                            {user.role === 'admin' ? (<>
                                <th style={{ border: '1px solid #ddd' }}>Edit</th>
                                <th style={{ border: '1px solid #ddd' }}>Delete</th>
                            </>) : (<></>)}
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {cities && cities.length > 0 ? (
                            cities.map((city, index) => (
                                <tr key={city.id || index}>
                                    <td style={{ border: '1px solid #ddd' }}>{index + 1}</td>
                                    <td style={{ border: '1px solid #ddd' }}>{city.city_name}</td>
                                    <td style={{ border: '1px solid #ddd' }}>{city.population}</td>
                                    {user.role === 'admin' ? (<>
                                        <th style={{ border: '1px solid #ddd' }}><Button onClick={() => updateCity(city)}><EditOutlinedIcon /></Button></th>
                                        <th style={{ border: '1px solid #ddd' }}><Button onClick={() => deleteCity(city._id)}><DeleteOutlineOutlinedIcon /></Button></th>
                                    </>) : (<></>)}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>
                                    <h1>LOADING</h1>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            variant='outlined'
                            size='small'
                            style={{ margin: '15px' }}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
            </div>

            <Modal open={open} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

                <div >
                    <Box sx={{ color: 'black', mt: '25%', p: '20px', border: '3px solid white', borderRadius: '20px', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}  >
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={() => setOpen(false)}> <Close /> </Button>
                        </div>
                        <h1 style={{ color: '#177bad' }}>Update City</h1>

                        <Stack item direction={'column'} spacing={2} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>

                            <TextField variant='outlined' label='City Name' name='city_name' value={data?.city_name} onChange={(e) => setData({ ...data, city_name: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
                            <TextField variant='outlined' label='Population' name='population' value={data?.population} onChange={(e) => setData({ ...data, population: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />

                            <Button
                                variant='contained'
                                sx={{
                                    marginTop: '15px',
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
                                onClick={update}
                            >
                                Update
                            </Button>
                        </Stack>


                    </Box>
                </div>

            </Modal>
        </>
    )
}

export default CityList;