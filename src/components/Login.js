import React, {useState, useEffect} from 'react';
import {useInput} from '../hooks/useInput'

const Login = ({setUser, setAuth}) => {
    const [username, setUsername, usernameInput] = useInput({type: 'text', placeholder:'username'})
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder:'password'})
    const [userInfo, setUserInfo] = useState(undefined)
    const [error, setError] = useState()
    const abortController = new AbortController();

    const login = (e) => {
        e.preventDefault();
        setUserInfo({username, password})
    }

    useEffect(() => {
        let isCurrent = true;
        if(userInfo){
            async function fetchLogin() {
                const response = await fetch('http://localhost:8080/api/users/login', {
                    signal: abortController.signal,
                    method: 'post',
                    body: JSON.stringify(userInfo)
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        setUsername('')
                        setPassword('')
                        setUser(JSON.parse(data))
                        setAuth(response.headers.get('Authorization'))
                    }else{
                        setError(data)
                    }
                }
            }
            fetchLogin()
        }
        return () => {
            abortController.abort();
            isCurrent = false
        }

    },[userInfo])

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