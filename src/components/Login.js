import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { useInput } from '../hooks/useInput'
import { useRequest } from '../hooks/useRequest'

const Login = ({setUser, setAuth, resetAppType}) => {
    const [username, usernameInput] = useInput({type: 'text', placeholder:'username'})
    const [password, passwordInput] = useInput({type: 'password', placeholder:'password'})
    const [error] = useState()

    const onSuccessfulLogin  = useCallback((data, headers) => {
        setUser(data)
        setAuth(headers.get('Authorization'))
    },[setAuth, setUser])

    const [userInfo, fetchLogin] = useRequest({initialUrl:`http://${localStorage.getItem('BaseUrl')}/api/users/${localStorage.getItem('LongPolling')}login`, callback: onSuccessfulLogin, fetchOnMount: false, method: 'post', shouldThrow: false})

    const login = (e) => {
        e.preventDefault();
        fetchLogin({url:loginUrl.current, body:{username, password}})
    }

    return (
        <section>
            <button onClick={resetAppType}>back</button>
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

export default Login

export default Login

export default Login