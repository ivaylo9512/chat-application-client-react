import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { useInput } from '../hooks/useInput'
import { useRequest } from '../hooks/useRequest'

const Login = ({setUser, setAuth, setAppType}) => {
    const [username, usernameInput] = useInput({type: 'text', placeholder:'username'})
    const [password, passwordInput] = useInput({type: 'password', placeholder:'password'})
    const [error, setError] = useState()
    
    const onSuccessfulLogin  = useCallback((data, headers) => {
        setUser(data)
        setAuth(headers.get('Authorization'))
    },[setAuth, setUser])

    const [userInfo, fetchChats, setUserData] = useRequest({initialUrl:'http://localhost:8080/api/users/login', callback: onSuccessfulLogin, fetchOnMount: false, method: 'post'})

    const login = (e) => {
        e.preventDefault();
        setUserData({username, password})
        fetchChats()
    }

    return (
        <section>
            <button onClick={() => setAppType(undefined)}>back</button>
            <form onSubmit={login}>
                {usernameInput}
                {passwordInput}
                <button type='submit'>login</button>
                <span>Don't have an account?<Link to='/register'> Sign up.</Link></span>
                <span>{error}</span>
            </form>
        </section>
    )
}

export default Login