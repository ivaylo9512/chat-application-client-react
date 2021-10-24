import { Container } from './UsersViewStyle'
import UsersList from 'components/UsersList/UsersList';
import { getUsersQuery, usersRequest, resetUsersState, getUsersState, setCurrentUsers } from 'app/slices/usersSlice';
import Form from 'components/Form/Form';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'components/Pagination/Pagination';
import { resetRequests } from 'app/slices/requestsSlice';
import { useEffect } from 'react';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

const UsersView = () => {
    const dispatch = useDispatch();
    const { isLoading, error, dataInfo: { currentData } } = useSelector(getUsersState);

    useEffect(() => {
        if(!currentData){
            dispatch(resetRequests());
        }
    }, [currentData]);

    return(
        <>
            <Container>
                <UsersList />
                {error && <div data-testid='error'>{error}</div>}
                {isLoading 
                    ? <LoadingIndicator />
                    : <Pagination selector={getUsersState} setData={setCurrentUsers} getData={usersRequest} pagesPerSlide={5}/>
                }
            </Container>
            <Form action={usersRequest} resetState={resetUsersState} selector={getUsersQuery} placeholder={'search users'} />

        </>
    )
}
export default UsersView