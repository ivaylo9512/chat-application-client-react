
import { onLogout } from 'app/slices/authenticateSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('user');
            dispatch(onLogout());
    }, [])

    return(
        <Redirect to="/" />
    )
}
export default Logout