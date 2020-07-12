import React, {useState} from 'react';

export const useLocalStorage = (key, initial) => {
    const [value, setValue] = useState(() => {
        let value = localStorage.getItem(key)
        
        return value ? value : initial
    })

    const set = value => {
        localStorage.setItem(key, value)
        setValue(value)
    }

    const remove = () => {
        localStorage.removeItem(key)
        setValue(initial)
    }
    
    return [value, set, remove]
}