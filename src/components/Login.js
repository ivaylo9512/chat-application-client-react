import React, {useState} from 'react';
import {useInput} from '../hooks/useInput'

const Login = ({setAuthenticated}) => {
    const [username, setUsername, usernameInput] = useInput({type: 'text', placeholder:'username'})
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder:'password'})

    const login = (e) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
        fetch('http://localhost:8080/api/users/login', {
            method: 'post',
            body: JSON.stringify({username, password})
          })
            .then(response =>{ 
                localStorage.setItem('Authorization', response.headers.get('Authorization'))
                return response.json()
            })
            .then(data => {
                setAuthenticated(data)
                setUsername('')
                setPassword('')
            })
    }
    return (
        <section>
            <form onSubmit={login}>
                {usernameInput}
                {passwordInput}
                <button type='submit'>login</button>
                <button>register</button>
            </form>
        </section>
    )
}

export default Login