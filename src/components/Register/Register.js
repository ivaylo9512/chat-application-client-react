import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { useInput } from '../../hooks/useInput';
import useInput from '../../hooks/useInput';
import useInput from '../../hooks/usePasswordInput';
import { useRequest } from '../../hooks/useRequest';

const Register = ({setAuthUser}) => {
    const [pageIndex, setPageIndex] = useState(0)
    const [registeredUser, fetchRegister, error] = useRequest({
        initialUrl: `${localStorage.getItem('BaseUrl')}/api/users/${localStorage.getItem('LongPolling')}/register`, 
        shouldThrow: false, 
        callback: 
        setAuthUser, 
        method: 'POST'
    })
    const [registerValues, { usernameInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, ageInput, countryInput }] = createFields();

    const register = (e) => {
        e.preventDefault()
        fetchRegister({
            body:{username, password, repeat, firstName, lastName, country, age}})
    }

    const setPage = (e, page) => {
        e.preventDefault()
        setPageIndex(page)
    }

    return (
        <section>
            {pageIndex == 0 ?
                <form onSubmit={(e) => setPage(e, 1)}>
                    {usernameInput}
                    {passwordInput}
                    {repeatPasswordInput}
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link to='/login'> Sign in.</Link></span>
                    <span>{error}</span>
                </form> :
                <form onSubmit={register}>
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

const createInputs = () => {
    const [username, usernameInput] = useInput({
        name: 'username',
        placeholder: 'username',
        autoComplete: 'username',
        validationRules: {
            required: true, 
            minLength: 8, 
            maxLength: 20}
        },
    )

    const [password, passwordInput] = usePasswordInput({
        name: 'password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 22,
            required: true
        }
    })

    const [repeatPassword, repeatPasswordInput] = usePasswordInput({
        name: 'repeat-password',
        type: 'password',
        autoComplete: 'new-password',
        placeholder: 'repeat',
        validationRules:{
            required: true
        },
        equalValue: password,
        equalName: 'Passwords'
    })

    const [firstName, firstNameInput] = useInput({
        placeholder: 'First name' , 
        name: 'firstName', 
        validationRules: {
            required: true
        } 
    })

    const [lastName, lastNameInput] = useInput({
        placeholder: 'Last name' , 
        name: 'lastName', 
        validationRules: {
            required: true
        } 
    })

    const [age, ageInput] = useInput({
        type: 'number',
        name: 'age', 
        validationRules:{
            required: true,
        } 
    })

    const [country, countryInput] = useInput({
        placeholder: 'country',
        name: 'country',
    })

    return [{username, password, repeatPassword, firstName, lastName, country, age}, {usernameInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, countryInput, ageInput}]
}   

export default Register