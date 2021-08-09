import React, { useEffect } from 'react'
import useInput from '../../hooks/useInput'
import './Form.css'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchVisibility } from '../../app/slices/stylesSlice'

const Form = ({action, resetState, selector,  placeholder, onUnmount}) => {
    const [inputValue, input] = useInput({type:'text', placeholder})
    const isSearchHidden = useSelector(getSearchVisibility);
    const dispatch = useDispatch();
    const query = useSelector(selector);

    const submit = (e) => {
        e.preventDefault()
        dispatch(resetState());
        dispatch(action({...query, name: inputValue, pages: 1}));
    }

    useEffect(() => {
        if(onUnmount){
            return () => dispatch(onUnmount())
        }
    }, [])

    return (
        <div className={`form-container${isSearchHidden ? ' hidden' : ''}`}>
            <form onSubmit={submit}>
                {input}
                <button><i className='fas fa-search'></i></button>
            </form>
        </div>
    )
}
export default Form