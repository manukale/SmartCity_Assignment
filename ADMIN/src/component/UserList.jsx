import { useEffect, useState } from 'react';
import { getUser, userDelete, userUpdate } from '../services/userService';
import { Autocomplete, Box, Button, Modal, Stack, TextField } from '@mui/material';
import { userInformation } from '../context/authContext';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext } from 'react';
import { Close } from '@mui/icons-material'

const UserList = () => {
    const { user } = useContext(userInformation)
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const role = [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
    ];

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        const data = await getUser(currentPage);
        setUsers(data.users);
        setTotalPages(data.totalPages);
    };

    const deleteUser = async (id) => {
        try {
            const res = await userDelete(id)
            alert(res.msg)
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    }
    const updateUser = async (userData) => {
        try {
            setOpen(true)
            setData(userData)
        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {
        try {
            const res = await userUpdate(data.id, data)
            setOpen(false)
            alert(res.msg)
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2>User List </h2>
            <table width="800px" style={{ border: '1px solid #ddd' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd' }}>Id</th>
                        <th style={{ border: '1px solid #ddd' }}>Name</th>
                        <th style={{ border: '1px solid #ddd' }}>Email</th>
                        <th style={{ border: '1px solid #ddd' }}>Role</th>
                        {user.role === 'admin' ? (<>
                            <th style={{ border: '1px solid #ddd' }}>Edit</th>
                            <th style={{ border: '1px solid #ddd' }}>Delete</th>
                        </>) : (<></>)}
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {users && users.length > 0 ? (
                        users.map((u, index) => (
                            <tr key={u.id || index}>
                                <td style={{ border: '1px solid #ddd' }}>{u.id}</td>
                                <td style={{ border: '1px solid #ddd' }}>{u.name}</td>
                                <td style={{ border: '1px solid #ddd' }}>{u.email}</td>
                                <td style={{ border: '1px solid #ddd' }}>{u.role}</td>
                                {user.role === 'admin' ? (<>
                                    <th style={{ border: '1px solid #ddd' }}><Button onClick={() => updateUser(u)}><EditOutlinedIcon /></Button></th>
                                    <th style={{ border: '1px solid #ddd' }}><Button onClick={() => deleteUser(u.id)}><DeleteOutlineOutlinedIcon /></Button></th>
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

            <Modal open={open} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

                <div >
                    <Box sx={{ color: 'black', mt: '25%', p: '20px', border: '3px solid white', borderRadius: '20px', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center' }}  >
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={() => setOpen(false)}> <Close /> </Button>
                        </div>
                        <h1 style={{ color: '#177bad' }}>Update User</h1>

                        <Stack item direction={'column'} spacing={2} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>

                            <TextField variant='outlined' label='Name' name='name' value={data?.name} onChange={(e) => setData({ ...data, name: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
                            <TextField variant='outlined' label='Email' type='email' name='email' value={data?.email} onChange={(e) => setData({ ...data, email: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
                            <Autocomplete
                                sx={{ width: '375px' }}
                                options={role}
                                getOptionLabel={(option) => option?.value}
                                value={role.find(r => r.value === data?.role) || null}
                                onChange={(e, newValue) => setData({ ...data, role: newValue?.value || '' })}
                                renderInput={(params) => <TextField {...params} name='role' label="Role" size="small" />}
                            />
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
    );
};

export default UserList;