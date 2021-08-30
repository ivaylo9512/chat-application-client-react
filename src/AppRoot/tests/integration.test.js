import App from 'AppRoot/App';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';
import Logged from 'components/Logged/Logged';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authenticate from 'app/slices/authenticateSlice'
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: {
        authenticate
    },
    preloadedState: {
        authenticate: {
            isAuth: true,
            user: {
                id: 1
            },
            loginRequest: {
                error: null,
                isLoading: null
            },
            registerRequest: {
                error: null,
                isLoading: null
            }
        }
    }
})

jest.mock('components/Logged/Logged', () => () => <div></div>);
jest.mock('components/Register/Register', () =>  () => <div></div>);
jest.mock('components/Login/Login', () => () => <div></div>);


describe('App integration tests', () => {
    const createWrapper = (route) => mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ route ]} initialIndex={0}>
                <App />
            </MemoryRouter>
        </Provider>
    )
    
    it('should render Logged', () => {
        const wrapper = createWrapper('/');

        expect(wrapper.find(Logged).length).toBe(1);
    })

    it('should render Login on logout and reset state', async() => {
        let wrapper = createWrapper('/logout'); 

        const state = store.getState();
        expect(state.authenticate.isAuth).toBe(false);
        expect(state.authenticate.user).toBe(null);
        expect(wrapper.find(Login).length).toBe(1);
    })

    it('should render Login', async() => {
        let wrapper = createWrapper('/login'); 

        expect(wrapper.find(Login).length).toBe(1);
    })

    it('should render Register', async() => {
        let wrapper = createWrapper('/register'); 

        expect(wrapper.find(Register).length).toBe(1);
    })
})