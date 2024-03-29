import { useRef, useState } from 'react';
import useEffectInitial from './useEffectInitial';

const useInput = ({ name, placeholder, initialValue = '', type = '', testid, autoComplete, validationRules, equalsValue, equalsName}) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef();

    useEffectInitial(() => {
        validate(value);
    },[equalsValue])

    const validate = (value) => {
        if(equalsValue != undefined){
            inputRef.current.setCustomValidity(equalsValue != value 
                ? `${equalsName} are not equal` 
                : ''
            );
        }
    }

    const onChange = ({ target: { value } }) => {
        setValue(value);
        validate(value);
    }

    const input = <input onChange={onChange} placeholder={placeholder} ref={inputRef} data-testid={testid} autoComplete={autoComplete} name={name} type={type} {...validationRules} value={value}/>

    return [
        value, 
        input
    ]
}

export const getId = (input) => input.type === 'input'
    ? input.props['data-testid']
    : input.props.children[0].props['data-testid']

export default useInput;