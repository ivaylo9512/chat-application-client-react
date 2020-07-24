import {useState} from 'react';

export const useLocalStorage = (key, initial) => {
    const [value, setValue] = useState(() => localStorage.getItem(key) 
        ? localStorage.getItem(key) 
        : initial
    )

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