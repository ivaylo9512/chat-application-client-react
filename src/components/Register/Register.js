import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import useInput from 'hooks/useInput';
import usePasswordInput from 'hooks/usePasswordInput';
import { useSelector, useDispatch } from 'react-redux';
import InputWithError, { getContainerId } from 'components/InputWithError';
import { getRegisterRequest, registerRequest } from 'app/slices/authenticateSlice';
import useEffectInitial from 'hooks/useEffectInitial';

const Register = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [registerValues, { usernameInput, emailInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, ageInput, countryInput }] = useCreateInputs();
    const {isLoading, error} = useSelector(getRegisterRequest);
    const dispatch = useDispatch();

    const setPage = (e, page) => {
        e.preventDefault();
        setPageIndex(page);
    }
 
    const register = (e) => {
        e.preventDefault();
        const {repeatPassword, ...registerObject} = registerValues;

        dispatch(registerRequest(registerObject));
    }

    useEffectInitial(() => {
        const {username, password, email} = error || {};

        if(username || password || email){
            setPageIndex(0);
        }
    },[error])


    return (
        <section>
            {pageIndex == 0 ?
                <form onSubmit={(e) => setPage(e, 1)}>
                    <InputWithError data-testid={getContainerId(usernameInput)} input={usernameInput} error={error?.username}/>
                    <InputWithError data-testid={getContainerId(emailInput)} input={emailInput} error={error?.email}/>
                    <InputWithError data-testid={getContainerId(passwordInput)} input={passwordInput} error={error?.password}/>
                    <InputWithError data-testid={getContainerId(repeatPasswordInput)} input={repeatPasswordInput} error={error?.password}/>
                    <button data-testid='next' type='submit'>next</button>
                    <span data-testid='redirect'>Already have an account?<Link to='/login'> Sign in.</Link></span>
                </form> :
                <form onSubmit={register}>
                    <InputWithError data-testid={getContainerId(firstNameInput)} input={firstNameInput} error={error?.firstName}/>
                    <InputWithError data-testid={getContainerId(lastNameInput)} input={lastNameInput} error={error?.lastName}/>
                    <InputWithError data-testid={getContainerId(countryInput)} input={countryInput} error={error?.country}/>
                    <InputWithError data-testid={getContainerId(ageInput)} input={ageInput} error={error?.age}/>
                    <button data-testid='back' onClick={(e) => setPage(e, 0)} >back</button>
                    <button data-testid='register' type='submit'>register</button>
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
        testid: 'username',
        validationRules: {
            required: true, 
            minLength: 8, 
            maxLength: 20}
        },
    );

    const [email, emailInput] = useInput({
        type: 'email',
        placeholder: 'email',
        name: 'email',
        testid: 'email',
        autoComplete: 'email',
        validationRules: {
            required: true
        } 
    });

    const [password, passwordInput] = usePasswordInput({
        name: 'password',
        autoComplete: 'new-password',
        placeholder: 'password',
        testid: 'password',
        validationRules: {
            minLength: 10,
            maxLength: 22,
            required: true
        }
    });

    const [repeatPassword, repeatPasswordInput] = usePasswordInput({
        name: 'repeatPassword',
        autoComplete: 'new-password',
        placeholder: 'repeat',
        testid: 'repeatPassword',
        validationRules:{
            required: true
        },
        equalsValue: password,
        equalsName: 'Passwords'
    });

    const [firstName, firstNameInput] = useInput({
        placeholder: 'First name' , 
        name: 'firstName', 
        testid: 'firstName',
        validationRules: {
            required: true
        } 
    });

    const [lastName, lastNameInput] = useInput({
        placeholder: 'Last name' , 
        name: 'lastName', 
        testid: 'lastName',
        validationRules: {
            required: true
        } 
    });

    const [age, ageInput] = useInput({
        type: 'number',
        name: 'age', 
        testid: 'age',
        validationRules:{
            required: true,
        } 
    });

    const [country, countryInput] = useInput({
        placeholder: 'country',
        testid: 'country',
        name: 'country',
    });

    return [{username, email, password, repeatPassword, firstName, lastName, country, age}, {usernameInput, emailInput, passwordInput, repeatPasswordInput, firstNameInput, lastNameInput, countryInput, ageInput}]
}   

export default Register