import React from 'react';
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginRequest, loginRequest } from '../../app/slices/authenticateSlice';
import usePasswordInput from '../../hooks/usePasswordInput';

const Login = () => {
    const [loginValues, {usernameInput, passwordInput}] = useCreateInputs();
    const {isLoading, error} = useSelector(getLoginRequest);
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault()
        dispatch(loginRequest(loginValues))
    }

    return (
        <section>
            <form onSubmit={login}>
                {usernameInput}
                {passwordInput}
                {error && <span>{error}</span>}
                <button type='submit'>login</button>
                <span>Don't have an account?<Link to='/register'> Sign up.</Link></span>
            </form>
        </section>
    )
}
export default Login

const useCreateInputs = () => {
    const [username, usernameInput] = useInput({
        type: 'text', 
        placeholder:'username', 
        name: 'username'
    });

    const [password, passwordInput] = usePasswordInput({
        placeholder:'password', 
        name: 'password'
    });

    return [{username, password}, {usernameInput, passwordInput}];
}