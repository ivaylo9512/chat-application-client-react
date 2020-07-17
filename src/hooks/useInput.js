import React, { useState, useEffect } from 'react';

export const useInput = ({type, placeholder, validationRules, setIsValid, equals }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(undefined)

    const onChange = (e) => setValue(e.target.value)

    const validate = () => {
        let errorMessage
        const max = validationRules.max
        const min = validationRules.min
        if(value.length > max || value.length < min){
            errorMessage = placeholder + ` must be between ${min} and ${max}.`
        }

        if(validationRules.equals != undefined && validationRules.equals != value){
        errorMessage = 'inputs must be equal.'
        }

        if(errorMessage){
            setError(errorMessage)
            setIsValid(false)
        }else{
            setError(undefined)
        }
    }

    useEffect(() => {
        let validateTimeOut;
        if(value != undefined && validationRules){
            validateTimeOut = setTimeout(() => {
                validate()
            }, 500);
        }
        return () => clearTimeout(validateTimeOut)
    }, [value])

    const input = 
        <div>
            <input value={value} onChange={onChange} type={type} placeholder={placeholder}/>
            <span>{error}</span>
        </div>
    
    return[
        value,
        setValue,
        input 
    ]
}