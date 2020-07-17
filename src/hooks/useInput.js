import React, { useState, useEffect } from 'react';

export const useInput = ({type, placeholder, validationRules, equalsElement, equals}) => {
    const [value, setValue] = useState('');
    const [equalsError, setEqualsError] = useState('') 
    const isMounted = React.useRef(false)

    const onChange = (e) => setValue(e.target.value)

    useEffect(() => {
        let validateTimeOut;
        if(!isMounted.current){
            isMounted.current = true
        }else if(equalsElement != undefined){
            validateTimeOut = setTimeout(() => {
                if(equalsElement != value){
                    equals.setError(equals.name + ' must be equal.')
                }else if(equals.error){
                    equals.setError('')
                }
            }, 500);
        }
        return () => clearTimeout(validateTimeOut)
    }, [value, equalsElement])

    const input = 
        <div>
            <input value={value} onChange={onChange} {...validationRules} type={type} placeholder={placeholder} />
            <span>{equalsElement ? equals.error : equalsError}</span>
        </div>
    
    return[
        value,
        setValue,
        input,
        equalsError,
        setEqualsError
    ]
}