import React from 'react';
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginRequest, loginRequest } from 'app/slices/authenticateSlice';
import usePasswordInput from '../../hooks/usePasswordInput';

const Login = () => {
    const [loginValues, {usernameInput, passwordInput}] = useCreateInputs();
    const {isLoading, error} = useSelector(getLoginRequest);
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        dispatch(loginRequest(loginValues));
    }

    return (
        <section>
            <form onSubmit={login}>
                {usernameInput}
                {passwordInput}
                {error && <span data-testid='error'>{error}</span>}
                <button data-testid='login' type='submit'>login</button>
                <span data-testid='redirect' >Don't have an account?<Link to='/register'> Sign up.</Link></span>
            </form>
        </section>
    )
}
export default Login

const useCreateInputs = () => {
    const [username, usernameInput] = useInput({
        type: 'text', 
        placeholder:'username', 
        name: 'username',
        testid: 'username'
    });

    const [password, passwordInput] = usePasswordInput({
        placeholder:'password', 
        name: 'password',
        testid: 'password'
    });

    return [{username, password}, {usernameInput, passwordInput}];
}