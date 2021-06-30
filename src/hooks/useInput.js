import React, { useState, useRef } from 'react';
import { useEffectInitial } from './useEffectInitial';

export const useInput = ({type, placeholder, name, validationRules, equalsValue, equalsName}) => {
    const [value, setValue] = useState('');
    const inputElement = useRef();

    const onChange = ({target, target: {value}}) => {
        setValue(value);
        validate(target, value);
    };

    const validate = (input, value) => {
        if(equalsValue){
            input.setCustomValidity(equalsValue != value 
                ? equalsName + ' must be equal.'
                : ''
            )
        }
    };

    useEffectInitial(() =>{
        if(equalsValue){
            validate(inputElement.current, value);    
        }
    },[equalsValue]);

    const input = <input value={value} ref={inputElement} name={name} onChange={onChange} {...validationRules} type={type} placeholder={placeholder} />
    
    return[
        value,
        input,
    ]
}