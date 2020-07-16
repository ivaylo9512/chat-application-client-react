import React, {useState} from 'react';

export const useInput = ({type, placeholder, validationRules, setIsValid}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(undefined)
    const onChange = (e) => setValue(e.target.value)

    const validate = () => {
        const max = validationRules.max
        const min = validationRules.min
        if(value > max || value < min){
            setError(placeholder + `must be between ${max} and ${min}.`)
        }
        if(validationRules.equals && validationRules.equals != value){
            setError('inputs must be equal.')
        }

        if(error){
            setIsValid(false)
        }
    }
    const input = 
    <div>
        <input value={value} onChange={onChange} onBlur={validate} type={type} placeholder={placeholder}/>
        <span>{error}</span>
    </div>
    
    return[
        value,
        setValue,
        input
    ]
}