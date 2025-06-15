import express from 'express'
import { addUser, deleteUser, getUser, loginUser, updateUser } from '../controller/user.js'
import { get } from 'mongoose'

const router = express.Router()

router.post('/addUser',addUser)
router.post('/loginUser',loginUser)
router.get('/getUser',getUser)
router.put('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)

export default router