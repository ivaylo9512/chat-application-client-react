import React, { useEffect, useState, useRef } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { useInput } from '../hooks/useInput';

const Register = ({setUser}) => {
    const isValid = useRef(new Set())
    const [userInfo, setUserInfo] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [pageIndex, setPageIndex] = useState(0)

    const [username, setUsername, usernameInput] = useInput({type: 'text', placeholder: 'username', validationRules: {
        minlength: 6,
        maxlength: 15,
        required: true
    }, isValid}) 
    const [password, setPassword, passwordInput] = useInput({type: 'password', placeholder: 'password', validationRules:{
        minlength: 7,
        maxlength: 25,
        required: true
    }, isValid}) 
    const [repeat, setRepeat, repeatInput] = useInput({type: 'password', placeholder: 'repeat', validationRules:{
        required: true
    }, equalsElement: password, equalsName: 'Passwords', isValid}) 
    const [firstName, setFirstName, firstNameInput] = useInput({type: 'text', placeholder: 'first name', validationRules: {
        required: true
    }}) 
    const [lastName, setLastName, lastNameInput] = useInput({type: 'text', placeholder: 'last name', validationRules: {
        required: true
    }}) 
    const [country, setCountry, countryInput] = useInput({type: 'text', placeholder: 'country', validationRules: {
        required: true
    }}) 
    const [age, setAge, ageInput] = useInput({type: 'number', placeholder: 'age', validationRules: {
        required: true
    }}) 


    const setInfo = (e) => {
        e.preventDefault()
        setUserInfo({username, password, repeat, firstName, lastName, country, age})
    }

    const setPage = (e, page) => {
        e.preventDefault()
        setPageIndex(page)
    }


    useEffect(() => {
        let isCurrent = true;
        if(userInfo && isValid.size == 0){
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
            {pageIndex == 0 ?
                <form onSubmit={(e) => setPage(e, 1)}>
                    {usernameInput}
                    {passwordInput}
                    {repeatInput}
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link to='/login'> Log in.</Link></span>
                    <span>{error}</span>
                </form> :
                <form onSubmit={setInfo}>
                    {firstNameInput}
                    {lastNameInput}
                    {countryInput}
                    {ageInput}
                    <button onClick={(e) => setPage(e, 0)} >back</button>
                    <button>register</button>
                </form>
            }
        </section>
    )
}

export default Register