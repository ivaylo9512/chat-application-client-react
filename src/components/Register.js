import React, {Component} from 'react';
import { useInput } from '../hooks/useInput';

const Register = ({setUser}) => {
    const [username, setUsername, usernameInput] = useInput('text', 'username') 
    const [password, setPassword, passwordInput] = useInput('password', 'password') 
    const [repeat, setRepeat, repeatInput] = useInput('password', 'repeat') 

    register = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/api/users/register', {
            method: 'post',
            body: JSON.stringify({username, password, repeat})
        })
          .then(data =>  data.json())
          .then(data => {
              setUser(data)
          }
        )
    }
    return (
        <section>
            <form onSubmit={register}>
                {usernameInput}
                {passwordInput}
                {repeatInput}
                <button>login</button>
                <button>register</button>
            </form>
        </section>
    )
}

export default Register