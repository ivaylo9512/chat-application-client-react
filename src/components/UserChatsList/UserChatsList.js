import { useSelector } from "react-redux"
import { getCurrentUserChats } from "app/slices/userChatsSlice"
import UserChat from "components/UserChat/UserChat";
import { Container } from './UserChatsListStyle';

const UserChatsList = () => {
    const userChats = useSelector(getCurrentUserChats);

    return(
        <Container>
            {userChats && (userChats.length == 0
                ? <span data-testid='info'><b>No chats found with this search.</b></span> 
                : userChats.map(userChat => 
                    <UserChat key={userChat.id} userChat={userChat} />)
            )}
        </Container>
    )

}
export default UserChatsList