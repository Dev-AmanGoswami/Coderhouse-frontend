import axios from "axios";

// Creating axios instance to create interceptors
export const jsonApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

export const formApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type' : "multipart/form-data",
        Accept: 'application/json'
    }
});

// Interceptors -> Sits between request and response
// Config in first function gives all details of request and response
formApi.interceptors.response.use((config) => { 
    return config;
},async (error)=>{
    // Store original request
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            // orignalRequest will be lost if we use jsonAPI or formAPI instance
            await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
                withCredentials: true,
            })
            return formApi.request(originalRequest);
        } catch (error) {
            console.log(error.message);
        }
    }
    throw error;
});

jsonApi.interceptors.response.use((config) => { 
    return config;
},async (error)=>{
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
                withCredentials: true,
            })
            return jsonApi.request(originalRequest);
        } catch (error) {
            console.log(error.message);
        }
    }
    throw error;
});

// List all the endpoints
export const sendOtp = (data) => jsonApi.post('/api/send-otp', data);
export const verifyOtp = (data) => jsonApi.post('/api/verify-otp',data);
export const activate = (formData) => formApi.post('/api/activate',formData);
export const logout = () => jsonApi.post('/api/logout');
export const createRoom = (data) => jsonApi.post('/api/rooms',data);
export const getAllRooms = () => jsonApi.get('/api/rooms'); 