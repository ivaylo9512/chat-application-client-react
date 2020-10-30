import {useState, useEffect} from 'react';

export const useLocalStorage = (key, initial) => {
    const [value, setValue] = useState(() => {
        const value = localStorage.getItem(key) 
        if(value){
            return value
        }else if(initial){
            localStorage.setItem(key, initial)
            return initial
        }
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