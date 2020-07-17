import React, { useState, useEffect } from 'react';

export const useInput = ({type, placeholder, validationRules, setIsValid, equalsElement, equalsName }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(undefined)
    const isMounted = React.useRef(false)

    const onChange = (e) => setValue(e.target.value)

    const validate = () => {
        let errorMessage
        const max = validationRules.max
        const min = validationRules.min
        if(value.length > max || value.length < min){
            errorMessage = placeholder + ` must be between ${min} and ${max}.`
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
        if(!isMounted.current){
            isMounted.current = true
        }else{
            validateTimeOut = setTimeout(() => {
                if(equalsElement != undefined && equalsElement != value){
                    setError(equalsName + ' must be equal.')
                }else if(validationRules){
                        validate()
                }else{
                    setError('')
                }
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