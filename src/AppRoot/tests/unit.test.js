import App from 'AppRoot/App';
import Login from 'components/Login/Login';
import { mount } from 'enzyme';
import * as redux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Register from 'components/Register/Register';
import Logged from 'components/Logged/Logged';
import { onLogout } from 'app/slices/authenticateSlice';

jest.mock('components/Logged/Logged', () => () => <div></div>);
jest.mock('components/Register/Register', () =>  () => <div></div>);
jest.mock('components/Login/Login', () => () => <div></div>);

describe('App snapshot tests', () => {
    let dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    const createWrapper = (state, route) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
        return mount(
            <MemoryRouter initialEntries={[ route ]} initialIndex={0}>
                <App />
            </MemoryRouter>
        )
    }
    
    it('should render login ', () => {
        const wrapper = createWrapper(false, '/login');

        expect(wrapper.find(Login).length).toBe(1);
    })

    it('should redirect to login on wrong route', () => {
        const wrapper = createWrapper(false, '/nonexistent');

        expect(wrapper.find(Login).length).toBe(1);
    })

    it('should render register', () => {
        const wrapper = createWrapper(false, '/register');

        expect(wrapper.find(Register).length).toBe(1);
    })

    it('should render Logged', () => {
        const wrapper = createWrapper(true, '/');

        expect(wrapper.find(Logged).length).toBe(1);
    })

    it('should call dispatch with onLogout', () => {
        const wrapper = createWrapper(true, '/logout');

        expect(dispatchMock).toHaveBeenCalledWith(onLogout());
    })
})