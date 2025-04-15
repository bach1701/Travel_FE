import React, { useState } from 'react';
import { login } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

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
            localStorage.setItem("AccessToken", res.token);
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
            <div>
                <form onSubmit={handleLogin}>
                    <h2>Đăng Nhập</h2>
                    <input required
                        type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input required
                        type='password' placeholder='Password' value={password} onChange={(e) => setPassWord(e.target.value)}>
                    </input>
                    <button type='submit' >Đăng nhập</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage