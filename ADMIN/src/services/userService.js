import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "user";

export const registerUser = async(data) =>{
    try {
        const response = await axios.post(BASE_URL+'/addUser',data)
        return response.data
    } catch (error) {
       console.log(error)
    }
}
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL+'/loginUser', userData, {withCredentials: true});
    return response.data;
  } catch (error) {
    throw error.response?.data.msg;
  }
};

export const getUser = async (page=1) => {
  try {
    
    const response = await axios.get(BASE_URL+`/getUser?page=${page}`, {withCredentials: true});
    return response.data;
  } catch (error) {
   console.log(error);
  }
}

export const userDelete = async(id) =>{
    try {
        const response = await axios.delete(`${BASE_URL}/deleteUser/${id}`);    
    return response.data;
    } catch (error) {
         console.log(error);
    }
}

export const userUpdate = async(id,data)=>{
    try {
        const response = await axios.put(`${BASE_URL}/updateUser/${id}`,data)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}