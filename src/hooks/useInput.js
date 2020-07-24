import React, { useState, useEffect } from 'react';

export const useInput = ({type, placeholder, validationRules, equalsElement, equalsName}) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value)
        validate(e.target)
    }

    const validate = (input) => {
        if(equalsElement){
            input.setCustomValidity(equalsElement != value 
                ? equalsName + ' must be equal.'
                : ''
            )
        }
    }

    const input = <input value={value} onChange={onChange} {...validationRules} type={type} placeholder={placeholder} />
    
    return[
        value,
        input,
    ]
}