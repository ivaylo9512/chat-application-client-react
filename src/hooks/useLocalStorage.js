import React, {useState} from 'react';

export const useLocalStorage = (key, initial) => {
    const [value, setValue] = useState(() => {
        let value = localStorage.getItem(key)
        console.log(value)
        return value ? value : initial;
    })

    const set = value => {
        setValue(value)
        localStorage.setItem(key, value)
    }
    
    return [value, set]
}