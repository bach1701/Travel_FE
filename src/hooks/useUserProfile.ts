import axios from 'axios';
import { useEffect, useState } from 'react';

const baseURL = import.meta.env.VITE_API_URL;


interface UserProfile {
    id: number;
    email: string;
    name: string;
    avatar_url: string;
    phone_number: string;
    address: string;
}


export const useUserProfile = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    useEffect(() => {
        const fetchUserProfile = async() => {
            const accessToken = localStorage.getItem('AccessToken');
            if(!accessToken) return;

            try {
                const res = await axios.get(`${baseURL}/user/profile`,{
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setUser(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchUserProfile();
    },[])
    return user;
};


