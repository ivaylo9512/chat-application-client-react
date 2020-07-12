import React, {useState} from 'react';
import {useInput} from '../hooks/useInput'

const Login = ({setUser, setAuth}) => {
    const [username, setUsername, usernameInput] = useInput({type: 'text', placeholder:'username'})
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder:'password'})
    const [error, setError] = useState()

    const login = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/api/users/login', {
            method: 'post',
            body: JSON.stringify({username, password})
          })
            .then(response => { 
                if (response.ok) {
                    setAuth(response.headers.get('Authorization'))
                    return response.json();
                  } else {
                      console.log(response.status)
                  }
            })
            .then(data => {
                setUser(data)
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
                <p>{error}</p>
            </form>
        </section>
    )
}

export default Login