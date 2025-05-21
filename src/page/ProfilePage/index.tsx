import PageBanner from "@/components/ui/Banner";
import bg from "../../assets/image/profile/bg.jpg";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { baseURL } from "@/config/api";
import axios from "axios";
import { Profile } from "@/types/Profile";
import { useEffect, useState } from "react";
import ModelNotification from "@/components/ModelNotification";
import BookingHistory from "./BookingHistory";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewHistory from "./ReviewHistory";
import AccountSetting from "./AccountSetting";
import avatarDefault from "../../assets/image/avatar/avatar_default.avif";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState<Boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>(
    location.pathname === "/profile/booking-history"
      ? "booking-history"
      : location.pathname === "/profile/review-history"
        ? "review-history"
        : location.pathname === "/profile/account-setting"
          ? "account-setting"
          : "personal-information"
  );

  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: "",
    email: "",
    role: "",
    avatar_url: "",
    phone_number: "",
    address: "",
    status: "",
    total_bookings: 0,
    total_reviews: 0,
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
      setIsSuccess(true);
      setSuccessMessage("Upload ảnh thành công, vui lòng nhấn lưu.");
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
        setSuccessMessage("Đổi thông tin tài khoản thành công.");
        window.location.reload();
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

  const handleChangeActiveTab = (active: string): void => {
    setActiveTab(active);
    let path = "/profile";
    if (active === "booking-history") {
      path += "/booking-history";
    } else if (active === "review-history") {
      path += "/review-history";
    } else if (active === "account-setting") {
      path += "/account-setting";
    }
    navigate(path);
  };

  const handleNavProfile = (): void => {
    setActiveTab("personal-information");
    navigate("/profile");
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <ClipLoader color="#FF6A00" size={50} speedMultiplier={0.8} />
        </div>
      ) : (
        <div className="mb-12">
          <div className="relative">
            <PageBanner backgroundImage={bg} title="" breadcrumb={[]} />
            <div className="absolute left-36 bottom-0 transform translate-y-1/2 z-10">
              <div className="relative">
                <img
                  src={previewAvatar || profile?.avatar_url || avatarDefault}
                  alt="Avatar"
                  className="w-72 h-72 rounded-full border-4 border-white object-cover shadow-md"
                />
                <label className="absolute bottom-0 right-0 cursor-pointer">
                  <FaUserEdit
                    className="text-primary rounded-full p-1"
                    size="2em"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-full md:w-1/4 mt-44 ml-auto mr-auto md:ml-36 md:mr-0 md:mt-40">
              <div className="flex flex-col gap-4 text-sm font-medium">
                <h5
                  onClick={() => handleChangeActiveTab("personal-information")}
                  className={
                    activeTab === "personal-information"
                      ? "text-primary border-l-4 border-primary pl-2"
                      : "cursor-pointer"
                  }
                >
                  Personal Information
                </h5>
                <h5
                  onClick={() => handleChangeActiveTab("booking-history")}
                  className={
                    activeTab === "booking-history"
                      ? "text-primary border-l-4 border-primary pl-2"
                      : "cursor-pointer"
                  }
                >
                  Booking History ({profile.total_bookings})
                </h5>
                <h5
                  onClick={() => handleChangeActiveTab("review-history")}
                  className={
                    activeTab === "review-history"
                      ? "text-primary border-l-4 border-primary pl-2"
                      : "cursor-pointer"
                  }
                >
                  Review History ({profile.total_reviews})
                </h5>
                <h5
                  onClick={() => handleChangeActiveTab("account-setting")}
                  className={
                    activeTab === "account-setting"
                      ? "text-primary border-l-4 border-primary pl-2"
                      : "cursor-pointer"
                  }
                >
                  Account Setting
                </h5>
              </div>
            </div>
            <div className="w-full md:w-3/4 mt-12 md:mt-12 ml-auto mr-auto md:ml-8 md:mr-36">
              <div className="mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  {profile?.name}
                  <FaEdit
                    onClick={handleNavProfile}
                    className="text-primary ml-2 cursor-pointer"
                  />
                </h2>
                <p className="flex items-center text-gray-500 mt-1">
                  <FaLocationDot className="text-primary mr-1" />
                  {profile?.address}
                </p>
              </div>
              {activeTab === "personal-information" && (
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
                          setProfile({
                            ...profile,
                            phone_number: e.target.value,
                          })
                        }
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
              )}
              {activeTab === "booking-history" && <BookingHistory />}
              {activeTab === "review-history" && <ReviewHistory />}
              {activeTab === "account-setting" && <AccountSetting />}
            </div>
          </div>
          {isSuccess === true && (
            <ModelNotification
              type="success"
              message="Thành công!"
              description={successMessage || "Thao tác thành công."}
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
      )}
    </>
  );
};

export default ProfilePage;
