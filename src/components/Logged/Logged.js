import Main from 'components/Main/Main';
import Menu from 'components/Menu/Menu'
import HeaderScroll from 'components/HeaderScroll/HeaderScroll';
import { Container, Section } from 'components/Logged/LoggedStyle';

const Logged = () => {
    return(
        <Section>
            <HeaderScroll />
            <Container>
                <Menu />
                <Main />
            </Container>
        </Section>
    )
} 
export default Logged