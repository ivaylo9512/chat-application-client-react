import React, { useState, useEffect } from 'react';

export const useInput = ({type, placeholder, validationRules, isValid, equalsElement, equalsName }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(undefined)
    const isMounted = React.useRef(false)

    const onChange = (e) => setValue(e.target.value)

    const validate = () => {
        let errorMessage = ''
        if(equalsElement != undefined && equalsElement != value){
            errorMessage = equalsName + ' must be equal.'
        }else if(validationRules){
            const max = validationRules.max
            const min = validationRules.min
            if(value.length > max || value.length < min){
                errorMessage = placeholder + ` must be between ${min} and ${max}.`
            }
        }
        if(errorMessage){
            isValid.current.add(errorMessage)
        }else{
            isValid.current.delete(error)
        }
        setError(errorMessage)
    }

    useEffect(() => {
        let validateTimeOut;
        if(!isMounted.current){
            isMounted.current = true
        }else if(isValid){
            validateTimeOut = setTimeout(() => {
                validate()
            }, 500);
        }
        return () => clearTimeout(validateTimeOut)
    }, [value, equalsElement])

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