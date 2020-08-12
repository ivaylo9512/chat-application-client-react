import React from 'react'
import { useInput } from '../hooks/useInput';

const Search = (callback, placeholder, searchClass) => {
    const [inputValue, input] = useInput({type:'text', placeholder})

    const submit = () => callback(input)

    return (
        <div className={searchClass}>
            <form onSubmit={submit}>
                {input}
                <button><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}
export default Search