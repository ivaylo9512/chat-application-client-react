import { Container } from './UsersViewStyle'
import UsersList from 'components/UsersList/UsersList';
import { getUsersQuery, usersRequest, resetUsersState, getUsersState, setCurrentUsers, getUsers } from 'app/slices/usersSlice';
import Form from 'components/Form/Form';
import { useSelector } from 'react-redux';
import Pagination from 'components/Pagination/Pagination';

const UsersView = () => {
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