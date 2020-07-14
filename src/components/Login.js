import React, {useState, useEffect, useCallback} from 'react';
import {useInput} from '../hooks/useInput'

const Login = ({setUser, setAuth}) => {
    const [username, setUsername, usernameInput] = useInput({type: 'text', placeholder:'username'})
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder:'password'})
    const [userInfo, setUserInfo] = useState(undefined)
    const [error, setError] = useState()

    const login = (e) => {
        e.preventDefault();
        setUserInfo({username, password})
    }

    const onSuccessfulLogin  = useCallback((data, token) => {
        setUsername('')
        setPassword('')
        setUser(data)
        setAuth(token)
    },[setUsername, setPassword, setAuth, setUser])

    useEffect(() => {
        let isCurrent = true;
        if(userInfo){
            async function fetchLogin() {
                const response = await fetch('http://localhost:8080/api/users/login', {
                    method: 'post',
                    body: JSON.stringify(userInfo)
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        onSuccessfulLogin(JSON.parse(data), response.headers.get('Authorization'));                        
                    }else{
                        setError(data)
                    }
                }
            }
            fetchLogin()
        }
        return () => {
            isCurrent = false
        }

    },[userInfo, onSuccessfulLogin])

    return (
        <section>
            <form onSubmit={login}>
                {usernameInput}
                {passwordInput}
                <button type='submit'>login</button>
                <button>register</button>
                <span>{error}</span>
            </form>
        </section>
    )
}

export default Login