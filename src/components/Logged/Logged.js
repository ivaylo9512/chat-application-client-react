import Main from 'components/Main/Main';
import Menu from 'components/Menu/Menu'
import HeaderScroll from 'components/HeaderScroll/HeaderScroll';
import { Container, Section } from 'components/Logged/LoggedStyle';
import Form from 'components/Form/Form';
import { resetUserChatsState, getUserChatsQuery, userChatsRequest } from 'app/slices/userChatsSlice';

const Logged = () => {
    return(
        <Section>
            <HeaderScroll />
            <Container>
                <Form action={userChatsRequest} resetState={resetUserChatsState} selector={getUserChatsQuery} placeholder={'Search chat'} />
                <Menu />
                <Main />
            </Container>
        </Section>
    )
} 
export default Logged