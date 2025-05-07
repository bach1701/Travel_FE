import PageBanner from "@/components/ui/Banner";
import bg from "../../assets/image/profile/bg.jpg";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { baseURL } from "@/config/api";
import axios from "axios";
import { Profile } from "@/types/Profile";
import { useEffect, useState } from "react";
import ModelNotification from "@/components/ModelNotification";

const ProfilePage = () => {
  const [isSuccess, setIsSuccess] = useState<Boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: "",
    email: "",
    role: "",
    avatar_url: "",
    phone_number: "",
    address: "",
    status: "",
  });

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    "Content-Type": "application/json",
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProfile({ ...profile, avatar_url: URL.createObjectURL(file) });
    }
  };

  const handleEditProfile = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("phone_number", profile.phone_number);
    formData.append("address", profile.address);
    if (selectedAvatar) {
      formData.append("avatar", selectedAvatar);
    }

    try {
      const res = await axios.put(`${baseURL}/user/profile`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setProfile(res.data.user);
        setIsSuccess(true);
        if (res.data.user.avatar_url) {
          setPreviewAvatar(res.data.user.avatar_url);
        }
      } else {
        console.error("Error updating profile:", res.data);
        setIsSuccess(false);
        setErrorMessage(res.data.message);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setIsSuccess(false);
      setErrorMessage(error.message || "Đã có lỗi xảy ra khi cập nhật.");
    }
  };

  const handleCloseNotification = () => {
    setIsSuccess(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resProfile = await axios.get<Profile>(`${baseURL}/user/profile`, {
          headers,
        });
        setProfile(resProfile.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="mb-12 relative">
      <PageBanner backgroundImage={bg} title="" breadcrumb={[]} />
      <div className="absolute left-36 top-[40%] transform -translate-y-1/2 z-10">
        <img
          src={previewAvatar || profile?.avatar_url}
          alt="Avatar"
          className="w-72 h-72 rounded-full border-4 border-white object-cover shadow-md"
        ></img>
        <label className="absolute bottom-0 right-0 cursor-pointer">
          <FaUserEdit className="text-primary rounded-full p-1" size="2em" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      <div className="px-36 mt-12 flex">
        <div className="w-1/4 mt-32">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <h5 className="text-primary border-l-4 border-primary pl-2">
              Personal Information
            </h5>
            <h5>Booking History (4)</h5>
            <h5>Review History (7)</h5>
            <h5>Account Setting</h5>
          </div>
        </div>
        <div className="w-3/4">
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
          <div className="border border-gray-300 rounded-md px-8 py-6 bg-white shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold my-2">Full Name</p>
                <input
                  value={profile?.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  type="text"
                  className="border border-gray-300 rounded-md w-full h-10 px-2"
                />
              </div>
              <div>
                <p className="font-semibold my-2">Phone</p>
                <input
                  value={profile?.phone_number}
                  onChange={(e) =>
                    setProfile({ ...profile, phone_number: e.target.value })
                  }
                  type="text"
                  className="border border-gray-300 rounded-md w-full h-10 px-2"
                />
              </div>
            </div>
            <p className="font-semibold my-2">Email</p>
            <input
              value={profile?.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              type="email"
              className="border border-gray-300 rounded-md w-full h-10 px-2"
            />
            <p className="font-semibold my-2">Address</p>
            <input
              value={profile?.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
              type="text"
              className="border border-gray-300 rounded-md w-full h-10 px-2"
            />
            <div className="flex justify-center">
              <button
                onClick={handleEditProfile}
                className="bg-primary text-white p-2 uppercase rounded-lg mt-4 items-center font-semibold justify-center"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {isSuccess === true && (
        <ModelNotification
          type="success"
          message="Thành công!"
          description="Đổi thông tin tài khoản thành công."
          onClose={handleCloseNotification}
        />
      )}
      {isSuccess === false && errorMessage && (
        <ModelNotification
          type="error"
          message="Thất bại!"
          description={errorMessage}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default ProfilePage;
