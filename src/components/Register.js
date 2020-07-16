import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks/useInput';

const Register = ({setUser}) => {
    const [username, setUsername, usernameInput] = useInput('text', 'username') 
    const [password, setPassword, passwordInput] = useInput('password', 'password') 
    const [repeat, setRepeat, repeatInput] = useInput('password', 'repeat') 
    const [userInfo, setUserInfo] = useState(undefined)
    const [setError]
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
    const setInfo = () => {
        e.preventDefault()
        setUserInfo({username, password, repeat})
    }

    useEffect(() => {
        let isCurrent = true;
        if(user){
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'post',
                body: JSON.stringify(userInfo)
            })
            const data = await response.text()
            if(response.ok){
                setUser(JSON.parse(data))
            }else{
                setError(data)
            }
            register()
        }
        return () => {
            isCurrent = false
        }
    }, [userInfo])

    return (
        <section>
            <form onSubmit={setInfo}>
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