import express from 'express'
import { addCity, deleteCity, getCity, updateCity } from '../controller/city.js'

const router = express.Router()

router.post('/addCity',addCity)
router.get('/getCity',getCity)
router.put('/updateCity/:id',updateCity)
router.delete('/deleteCity/:id',deleteCity)
export default router