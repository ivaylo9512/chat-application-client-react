import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { useInput } from '../hooks/useInput';

const Register = ({setUser}) => {
    const [isValid, setIsValid] = useState(undefined)
    const [userInfo, setUserInfo] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [page, setPage] = useState(undefined)

    const [username, setUsername, usernameInput] = useInput({type: 'text', placeholder: 'username', validationRules: {
        min: 6,
        max: 15,
    }, setIsValid}) 
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder: 'password', validationRules:{
        min: 7,
        max: 25,
    }, setIsValid}) 
    const [repeat, setRepeat, repeatInput] = useInput({type: 'password', placeholder: 'repeat', validationRules:{
        equals: password
    }, setIsValid}) 
    const [firstName, setFirstName, firstNameInput] = useInput({type: 'text', placeholder: 'first name'}) 
    const [lastName, setLastName, lastNameInput] = useInput({type: 'text', placeholder: 'last name'}) 
    const [country, setCountry, countryInput] = useInput({type: 'text', placeholder: 'country'}) 
    const [age, setAge, ageInput] = useInput({type: 'text', placeholder: 'age'}) 


    const setInfo = (e) => {
        e.preventDefault()
        setUserInfo({username, password, repeat})
    }

    useEffect(() => {
        let isCurrent = true;
        if(userInfo){
            async function register(){
                const response = await fetch('http://localhost:8080/api/users/register', {
                    method: 'post',
                    body: JSON.stringify(userInfo)
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        setUser(JSON.parse(data))
                    }else{
                        setError(data)
                    }    
                }
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
                <button>register</button>
                <button onClick={() => page--} >back</button>
                <span>Already have an account?<Link to='/login'> Log in.</Link></span>
                <span>{error}</span>
            </form>
            <form onSubmit={() => page++}>
                {firstName}
                {lastName}
                {country}
                {age}
                <button type='submit'>next</button>
            </form>
        </section>
    )
}

export default Register