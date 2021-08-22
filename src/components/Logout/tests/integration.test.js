import Logout from 'components/Logout/Logout';
import { mount } from 'enzyme';
import { configureStore } from '@reduxjs/toolkit';
import authenticate from 'app/slices/authenticateSlice'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

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


describe('Logout integration tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <MemoryRouter>
                <Logout />
            </MemoryRouter>
        </Provider>
    )

    it('should logout on mount', () => {
        createWrapper();

        const state = store.getState().authenticate;
        expect(state.isAuth).toBe(false);
        expect(state.user).toBe(undefined);
    })

})