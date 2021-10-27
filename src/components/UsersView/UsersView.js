import { Container } from './UsersViewStyle'
import UsersList from 'components/UsersList/UsersList';
import { getUsersQuery, usersRequest, resetUsersState, getUsersState, setCurrentUsers } from 'app/slices/usersSlice';
import Form from 'components/Form/Form';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'components/Pagination/Pagination';
import { resetRequests } from 'app/slices/requestsSlice';
import { useEffect } from 'react';

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
                <Pagination selector={getUsersState} setData={setCurrentUsers} getData={usersRequest} pagesPerSlide={5}/>
                {error && <div data-testid='error'>{error}</div>}
            </Container>
            <Form action={usersRequest} resetState={resetUsersState} selector={getUsersQuery} placeholder={'Search users'} />

        </>
    )
}
export default UsersView