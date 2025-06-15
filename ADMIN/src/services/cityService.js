import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL + 'city'; 

export const getCities = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/getCity?page=${page}`);    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addingCity = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/addCity`,data);    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cityDelete = async(id)=>{
try {
    const response = await axios.delete(`${BASE_URL}/deleteCity/${id}`);    
    return response.data;
} catch (error) {
 console.log(error);   
}
}

export const cityUpdate = async(id,data)=>{
    try {
        const response = await axios.put(`${BASE_URL}/updateCity/${id}`,data)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
