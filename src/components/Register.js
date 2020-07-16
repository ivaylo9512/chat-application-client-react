import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks/useInput';

const Register = ({setUser}) => {
    const [username, setUsername, usernameInput] = useInput({type: 'text', placeholder: 'username', validationRules: {
        min: 6,
        max: 15,
    }, setIsValid}) 
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder: 'password', validationRules:{
        min: 7,
        max: 25,
    }}, setIsValid) 
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder: 'repeat', validationRules:{
        equals: password
    }, setIsValid}) 

    const [userInfo, setUserInfo] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [isValid, setIsValid] = useState(undefined)

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
                <span>{error}</span>
            </form>
        </section>
    )
}

export default Register