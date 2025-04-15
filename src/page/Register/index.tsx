import React, { useState } from "react";
import { register } from "../../services/userService";

const RegisterPage = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');

    const handleRegister = async(e : React.FormEvent) => {
        e.preventDefault();
        console.log(email, password, fullName);
        try {
            const res = await register(fullName, email, password);
            console.log('Successfully', res);
        }
        catch (err) {
            console.log('Error!', err)
        }
    }

    return(
        <>
            <form onSubmit={handleRegister}>
                <h2>Đăng ký</h2>
                <input type="text" placeholder="Fullname..." value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
                <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password..." value={password} onChange={(e) => setPassWord(e.target.value)}></input>
                <button type="submit">Đăng ký</button>
            </form>
        </>
    )
};

export default RegisterPage;