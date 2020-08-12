import React, { useEffect } from 'react'
import { useInput } from '../hooks/useInput';

const Search = ({callback, placeholder, searchClass}) => {
    const [inputValue, input] = useInput({type:'text', placeholder})

    const submit = () => {
        e.preventDefault()
        callback(inputValue)
    }

    useEffect(() => {
        return () => callback('')
    }, [])

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