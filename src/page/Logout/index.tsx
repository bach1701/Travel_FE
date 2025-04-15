import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Logout = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
    }

    return(
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout;