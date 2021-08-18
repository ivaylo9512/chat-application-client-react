import Main from 'components/Main/Main';
import Menu from 'components/Menu/Menu'
import HeaderScroll from 'components/HeaderScroll/HeaderScroll';

const Logged = () => {
    return(
        <section className='content-container'>
            <HeaderScroll />
            <div className='content'>
                <Menu />
                <Main />
            </div>
        </section>
    )
} 
export default Logged