import express from 'express'
import { addCity, deleteCity, getCity, updateCity } from '../controller/city.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/addCity',auth,addCity)
router.get('/getCity',auth,getCity)
router.put('/updateCity/:id',auth,updateCity)
router.delete('/deleteCity/:id',auth,deleteCity)
export default router