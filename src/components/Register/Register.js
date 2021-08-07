import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput';
import usePasswordInput from '../../hooks/usePasswordInput';
import { useSelector, useDispatch } from 'react-redux';
import InputWithError from '../InputWithError';
import { getRegisterRequest, registerRequest } from '../../app/slices/authenticateSlice';

const Register = () => {
    const [pageIndex, setPageIndex] = useState(0)
    const [registerValues, { usernameInput, emailInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, ageInput, countryInput }] = useCreateInputs();
    const {isLoading, error} = useSelector(getRegisterRequest)
    const dispatch = useDispatch();

    const setPage = (e, page) => {
        e.preventDefault()
        setPageIndex(page)
    }
 
    const register = (e) => {
        e.preventDefault();
        const {repeatPassword, ...registerObject} = registerValues;

        dispatch(registerRequest(registerObject))
    }

    useEffect(() => {
        const {username, password, email} = error || {};

        if(username || password || email){
            setPageIndex(0);
        }
    },[error])

    return (
        <section>
            {pageIndex == 0 ?
                <form onSubmit={(e) => setPage(e, 1)}>
                    <InputWithError input={usernameInput} error={error?.username}/>
                    <InputWithError input={passwordInput} error={error?.password}/>
                    <InputWithError input={repeatPasswordInput} error={error?.password}/>
                    <InputWithError input={emailInput} error={error?.email}/>
                    <button type='submit'>next</button>
                    <span>Already have an account?<Link to='/login'> Sign in.</Link></span>
                    <span>{error}</span>
                </form> :
                <form onSubmit={register}>
                    <InputWithError input={firstNameInput} error={error?.firstName}/>
                    <InputWithError input={lastNameInput} error={error?.lastName}/>
                    <InputWithError input={countryInput} error={error?.country}/>
                    <InputWithError input={ageInput} error={error?.age}/>
                    <button onClick={(e) => setPage(e, 0)} >back</button>
                    <button>register</button>
                </form>
            }
        </section>
    )
}

const useCreateInputs = () => {
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

    const [email, emailInput] = useInput({
        type: 'email',
        placeholder: 'email',
        name: 'email',
        autoComplete: 'email',
        validationRules: {
            required: true
        } 
    })

    const [password, passwordInput] = usePasswordInput({
        name: 'password',
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

    return [{username, email, password, repeatPassword, firstName, lastName, country, age}, {usernameInput, emailInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, countryInput, ageInput}]
}   

export default Register