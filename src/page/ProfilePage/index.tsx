import PageBanner from '@/components/ui/Banner';
import bg from '../../assets/image/profile/bg.jpg';
import { FaEdit } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { baseURL } from '@/config/api';
import axios from 'axios';
import { Profile } from '@/types/Profile';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resProfile = await axios.get<Profile>(`${baseURL}/user/profile`, { headers });
        setProfile(resProfile.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="mb-12 relative">
      {/* Banner */}
      <PageBanner backgroundImage={bg} title="" breadcrumb={[]} />

      {/* Avatar đè giữa banner và nội dung */}
      <div className="absolute left-24 top-[35%] transform -translate-y-1/2 z-10">
        <img
          src={profile?.avatar_url}
          alt="Avatar"
          className="w-72 h-72 rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      {/* Thông tin người dùng */}
      <div className="px-24 flex gap-8">
        {/* Sidebar bên trái */}
        <div className="w-1/4 mt-32">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <h5 className="text-primary border-l-4 border-primary pl-2">Personal Information</h5>
            <h5>Booking History (4)</h5>
            <h5>My Favorite (7)</h5>
            <h5>Account Setting</h5>
          </div>
        </div>

        {/* Nội dung bên phải */}
        <div className="w-3/4 mt-10">
          {/* Tên và địa chỉ */}
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center">
              {profile?.name}
              <FaEdit className="text-primary ml-2 cursor-pointer" />
            </h2>
            <p className="flex items-center text-gray-500 mt-1">
              <FaLocationPin className="text-primary mr-1" />
              {profile?.address}
            </p>
          </div>

          {/* Form thông tin */}
          <div className="border border-gray-300 rounded-md px-8 py-6 bg-white shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold my-2">Full Name</p>
                <input
                  value={profile?.name}
                  type="text"
                  className="border border-gray-300 rounded-md w-full h-10 px-2"
                />
              </div>
              <div>
                <p className="font-semibold my-2">Phone</p>
                <input
                  value={profile?.phone_number}
                  type="text"
                  className="border border-gray-300 rounded-md w-full h-10 px-2"
                />
              </div>
            </div>
            <p className="font-semibold my-2">Email</p>
            <input
              value={profile?.email}
              type="email"
              className="border border-gray-300 rounded-md w-full h-10 px-2"
            />
            <p className="font-semibold my-2">Address</p>
            <input
              value={profile?.address}
              type="text"
              className="border border-gray-300 rounded-md w-full h-10 px-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
