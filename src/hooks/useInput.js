import React, {useState, useEffect} from "react";

export const useInput = ({type, placeholder}) => {
    const [value, setValue] = useState('');
    const onChange = (e) => setValue(e.target.value)

    useEffect(() => {
        console.log(type)
        console.log("hey");
    });
    const input = <input value={value} onChange={onChange} type={type} placeholder={placeholder}/>
    return[
        value,
        setValue,
        input
    ]
}