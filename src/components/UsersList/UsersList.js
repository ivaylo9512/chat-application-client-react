import User from 'components/User/User'
import { useSelector } from 'react-redux';
import { getCurrentUsers, getCurrentPage } from 'app/slices/usersSlice';
import { Container } from './UsersListStyle';

const UsersList = () => {
    const users = useSelector(getCurrentUsers);
    const page = useSelector(getCurrentPage);

    return (
        <Container>
            {users && (users.length == 0 
                ? <span data-testid='info'><b>No users found with this search.</b></span>
                : users.map(user =>
                    <User user={user} key={user.id} page={page} />
            ))}
        </Container>
    )
}

export default UsersList