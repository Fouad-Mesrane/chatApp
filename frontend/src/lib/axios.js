import axios from 'axios'


// axios instance 
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api",
    withCredentials: true
})