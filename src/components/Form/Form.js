import { useEffect } from 'react'
import useInput from 'hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchVisibility, toggleSearchVisibility } from 'app/slices/stylesSlice'
import { Container, FormNode, Button } from './FormStyle'

const Form = ({action, resetState, selector,  placeholder}) => {
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
        return () => dispatch(resetState())
    }, [])

    return (
        <Container isHidden={isSearchHidden}>
            <FormNode isHidden={isSearchHidden} onMouseEnter={() => dispatch(toggleSearchVisibility())} onMouseLeave={() => dispatch(toggleSearchVisibility())} onSubmit={submit}>
                {input}
                <Button isHidden={isSearchHidden}><i className='fas fa-search'></i></Button>
            </FormNode>
        </Container>
    )
}
export default Form