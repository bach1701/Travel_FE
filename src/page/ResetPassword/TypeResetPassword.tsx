import { useState } from "react";
import backgroundImage from "../../assets/image/auth/background-login.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import ModelNotification from "@/components/ModelNotification";
import axios from "axios";
import { baseURL } from "@/config/api";

const TypeResetPassword = () => {
  const { tokenReset } = useParams<{ tokenReset: string }>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const handleNavSignUp = (): void => {
    navigate("/register");
  };

  const handleNavLogin = (): void => {
    navigate("/login");
  };

  const handleCloseNotification = (): void => {
    setIsSuccess(null);
    setMessageError(null);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsSuccess(false);
      setMessageError("Mật khẩu không khớp, vui lòng kiểm tra lại.");
      return;
    }
    try {
      const resResetPassword = axios.post(
        `${baseURL}/user/auth/reset-password/${tokenReset}`,
        { password }
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(resResetPassword);
      setIsSuccess(true);
    } catch (err: any) {
      setIsSuccess(false);
      setMessageError(err.response.data.message);
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-lg w-[500px] h-[450px] max-w-full">
          <h2 className="font-bold mt-2 mb-8 text-primary">
            Reset your password
          </h2>
          <div className="flex items-center mb-6 font-inter"></div>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <button
              type="submit"
              className="mb-6 w-full py-2 text-white rounded-lg hover:text-gray-200 transition duration-300"
              style={{ background: "#FF6A00" }}
            >
              Reset password
            </button>
          </form>
        </div>
        {isSuccess === true && (
          <ModelNotification
            type="success"
            message="Thành công!"
            description={"Vui lòng đăng nhập lại!"}
            onClose={handleCloseNotification}
          />
        )}

        {isSuccess === false && messageError && (
          <ModelNotification
            type="error"
            message="Thất bại!"
            description={messageError}
            onClose={handleCloseNotification}
          />
        )}
      </div>
    </>
  );
};

export default TypeResetPassword;
