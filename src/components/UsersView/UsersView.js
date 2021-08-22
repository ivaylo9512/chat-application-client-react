import { Container } from './UsersViewStyle'
import UsersList from 'components/UsersList/UsersList';
import { getUsersQuery, usersRequest, resetUsersState, getUsersState, setCurrentUsers, getUsersData } from 'app/slices/usersSlice';
import Form from 'components/Form/Form';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'components/Pagination/Pagination';
import { resetRequests } from 'app/slices/requestsSlice';
import { useEffect } from 'react';

const UsersView = () => {
    const dispatch = useDispatch();
    const { currentData } = useSelector(getUsersData);

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
            </Container>
            <Form action={usersRequest} resetState={resetUsersState} selector={getUsersQuery} placeholder={'search users'} />

        </>
    )
}
export default UsersView