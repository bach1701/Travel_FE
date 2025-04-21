import { useState } from "react";

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    
    const handleResetPassword = () => {
        
    }

    return (
        <>
            <h2>Reset PassWord</h2>
            <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <button onClick={handleResetPassword}></button>
        </>
    )
}

export default ResetPassword;