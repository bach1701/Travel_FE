import { useState } from "react";
import backgroundImage from "../../assets/image/auth/background-login.jpeg";
import { useNavigate } from "react-router-dom";
import ModelNotification from "@/components/ModelNotification";
import axios from "axios";
import { baseURL } from "@/config/api";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
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
    try {
      const resResetPassword = axios.post(
        `${baseURL}/user/auth/reset-password`,
        { email }
      );
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
          <div className="flex items-center mb-6 font-inter">
            <p className="font-inter text-gray-400 to-blue-950">
              Don't have account?
            </p>
            <p
              onClick={handleNavSignUp}
              className="font-inter ml-1 underline cursor-pointer"
            >
              {" "}
              Create now
            </p>
          </div>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-8">
              <button
                onClick={handleNavLogin}
                type="button"
                className="hover:underline text-blue-600"
              >
                Did you remember the password?
              </button>
            </div>

            <button
              type="submit"
              className="mb-6 w-full py-2 text-white rounded-lg hover:text-gray-200 transition duration-300"
              style={{ background: "#FF6A00" }}
            >
              Send verify your Email
            </button>
          </form>
        </div>
        {isSuccess === true && (
          <ModelNotification
            type="success"
            message="Thành công!"
            description={"Vui lòng xác thực ở email của bạn!"}
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

export default ResetPassword;
