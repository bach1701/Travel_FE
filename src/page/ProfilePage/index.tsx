import PageBanner from '@/components/ui/Banner';
import bg from '../../assets/image/profile/bg.jpg'
import { FaEdit } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { baseURL } from '@/config/api';
import axios from 'axios';
import { Profile } from '@/types/Profile';
import { useEffect, useState } from 'react';
const ProfilePage = () => {

    const [profile, setProfile] = useState<Profile | null >(null);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        "Content-Type": "application/json"
    }

    useEffect(() => {
        const fetchProfile = async() => {
            try {
                const resProfile = await axios.get<Profile>(`${baseURL}/user/profile`, { headers });
                setProfile(resProfile.data);
            }
            catch (error) {
                console.error('Error fetching profile:', error);
            }
        }

        fetchProfile();
    }, []);

    return (
        <div className='mb-12'>
            <div>
                <PageBanner backgroundImage={bg} title='Profile' 
                    breadcrumb={[
                    { label: '', href: '' },
                    { label: '', href: '' }
                ]}></PageBanner>
            </div>
            <div className='px-24 w-full'>
                <div className='w-1/4'>
                    {/* avatar */}
                </div>
                <div className='w-3/4'>
                    <h5 className='flex text-center'>{profile?.name} <FaEdit className='text-primary ml-2'></FaEdit></h5>
                    <p className='flex text-gray-500'><FaLocationPin className='text-primary'></FaLocationPin>{profile?.address}</p>
                </div>
            </div>
            <div className='px-24 w-full flex flex-row gap-4'>
                <div className='w-1/4'>
                    <h5>Personal Infomation</h5>
                    <h5>Booking History (4)</h5>
                    <h5>Review History (2)</h5>
                    <h5>Log out</h5>

                </div>
                <div className='w-3/4 border border-black rounded-md px-8 py-6 bg-white'>
                    <p className='font-semibold my-2'>Full Name</p>
                    <input value={profile?.name} type='text' className='border-2 border-gray-300 rounded-md w-full h-10 px-2' />
                    <p className='font-semibold my-2'>Phone</p>
                    <input value={profile?.phone_number} type='string' className='border-2 border-gray-300 rounded-md w-full h-10 px-2' />
                    <p className='font-semibold my-2'>Email</p>
                    <input value={profile?.email} type='email' className='border-2 border-gray-300 rounded-md w-full h-10 px-2' />
                    <p className='font-semibold my-2'>Address</p>
                    <input value={profile?.address} type='text' className='border-2 border-gray-300 rounded-md w-full h-10 px-2' />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;