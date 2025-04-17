import React, { useState } from 'react';
import { login } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/image/auth/background-login.jpeg';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async(e : React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);
        try {
            const res = await login(email, password);
            localStorage.setItem("AccessToken", res.accessToken);
            localStorage.setItem("RefreshToken", res.refreshToken);
            dispatch(loginSuccess({ user: res.user, token: res.token }));
            navigate('/');
            console.log('Logged in!', res);
        }
        catch (err) {
            console.error('Login failed', err);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center" 
                style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-lg w-[500px] h-[650px] max-w-full">
                        <h2 className='font-bold mt-2 mb-8 text-primary'>Sign in</h2>
                        <div className='flex items-center mb-6 font-inter'>
                            <p className='font-inter text-gray-400 to-blue-950'>Don't have account? </p><p className='font-inter ml-1 underline cursor-pointer'> Create now</p>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-1">
                                Email
                                </label>
                                <input
                                value={email} onChange={(e) => setEmail(e.target.value)}
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
                                value={password} onChange={(e) => setPassWord(e.target.value)}
                                type="password"
                                id="password"
                                placeholder="*********"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-600 mb-8">
                                <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-blue-500 cursor-pointer" />
                                Remember me
                                </label>
                                <button type="button" className="hover:underline text-blue-600">
                                Forgot Password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="mb-6 w-full py-2 text-white rounded-lg hover:text-gray-200 transition duration-300"
                                style={{background: '#FF6A00'}}
                            >
                                Login
                            </button>

                            <div className="flex items-center mb-6">
                                <div className="flex-grow h-px bg-gray-300" />
                                    <span className="px-4 text-gray-500 text-sm">OR</span>
                                <div className="flex-grow h-px bg-gray-300" />
                            </div>


                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <FaGoogle className="text-primary" />
                                <span>Continue with Google</span>
                            </button>
                            <button
                                type="button"
                                className="w-full my-4 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <FaFacebook className="text-primary" />
                                <span>Continue with Facebook</span>
                            </button>
                            {/* <input required
                                type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                            </input>
                            <input required
                                type='password' placeholder='Password' value={password} onChange={(e) => setPassWord(e.target.value)}>
                            </input>
                            <button type='submit' >Đăng nhập</button> */}
                        </form>
                    </div>
            </div>
        </>
    )
}

export default LoginPage