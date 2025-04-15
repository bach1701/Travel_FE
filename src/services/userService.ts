import axios from 'axios';


const baseURL = import.meta.env.VITE_API_URL;

export const login = async(email: string, password: string) => {
    const response = await axios.post(`${baseURL}/user/auth/login`, {
        email,
        password
    });
    return response.data;
};

export const register = async(name: string, email: string, password: string) => {
    const response = await axios.post(`${baseURL}/user/auth/register`, {
        name,
        email,
        password
    });
    return response.data;
};