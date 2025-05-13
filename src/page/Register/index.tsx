import React, { useState } from "react";
import { register } from "../../services/userService";
import backgroundImage from "../../assets/image/auth/background-login.jpeg";
import { useNavigate } from "react-router-dom";
import ModelNotification from "@/components/ModelNotification";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassWord] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [messageSuccess, setMessageSuccess] = useState<string>("");
  const [messageError, setMessageError] = useState<string | null>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password, fullName);
    if (password !== confirmPassword) {
      setIsSuccess(false);
      setMessageError("Mật khẩu không khớp! Vui lòng kiểm tra lại");
      return;
    }
    try {
      const res = await register(fullName, email, password);
      console.log("Successfully", res);
      setIsSuccess(true);
      setMessageSuccess("Đăng ký thành công, vui lòng xác nhận Email!");
    } catch (err: any) {
      console.log("Error!", err);
      setIsSuccess(false);
      setMessageError(err.response.data.message);
    }
  };

  const handleLogin = (): void => {
    navigate("/login");
  };

  const handleCloseNotification = () => {
    setIsSuccess(null);
    setMessageError(null);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-lg w-[500px] h-[550px] max-w-full">
          <h2 className="font-bold mt-2 mb-8 text-primary">Sign up</h2>
          <div className="flex items-center mb-6 font-inter">
            <p className="font-inter text-gray-400 to-blue-950">
              You have account?
            </p>
            <p
              onClick={handleLogin}
              className="font-inter ml-1 underline cursor-pointer"
            >
              Login now
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                id="text"
                placeholder="Type your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                type="password"
                id="password"
                placeholder="*********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="*********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <button
              type="submit"
              className="mb-6 mt-3 w-full py-2 text-white rounded-lg hover:text-gray-200 transition duration-300"
              style={{ background: "#FF6A00" }}
            >
              Register
            </button>
          </form>
        </div>
        {isSuccess === true && (
          <ModelNotification
            type="success"
            message="Thành công!"
            description={messageSuccess || "Thực hiện thao tác thành công!"}
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

export default RegisterPage;
