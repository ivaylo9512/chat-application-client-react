import User from 'components/User/User'
import { useSelector } from 'react-redux';
import { getUsersState } from 'app/slices/usersSlice';
import { Container } from './UsersListStyle';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

const UsersList = () => {
    const {dataInfo: { currentData : users }, isLoading } = useSelector(getUsersState);

    return (
        <Container>
            {isLoading 
                ? <LoadingIndicator />
                : users && users.length != 0 
                    ? users.map(user =>
                        <User user={user} key={user.id} />)
                    : <span data-testid='info'><b>No users found with this search.</b></span>
            }
            
        </Container>
    )
}

export default UsersList