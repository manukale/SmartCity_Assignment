import express from 'express'
import { addUser, deleteUser, getUser, loginUser, updateUser } from '../controller/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/addUser',addUser)
router.post('/loginUser',loginUser)
router.get('/getUser',auth,getUser)
router.put('/updateUser/:id',auth,updateUser)
router.delete('/deleteUser/:id',auth,deleteUser)

export default router