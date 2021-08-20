import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import users from 'app/slices/usersSlice';
import UsersList from 'components/UsersList/UsersList';
import { Provider } from 'react-redux';
import User from 'components/User/User';
import { mount } from 'enzyme';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const data = [{ id: 1, firstName: 'first', lastName: 'first' }, { id: 2, firstName: 'second', lastName: 'second' }];
const store = configureStore({
    reducer: {
        users
    },
    middleware,
    preloadedState: {
        users: {
            dataInfo: {
                pages: 0,
                maxPages: 0,
                data: data,
                lastData: data[0][1],
                currentData: data
            },
            query: {
                take: 2,
                direction: 'ASC',
                name: '',
            },
            isLoading: false,
            error: null,    
        }
    }
})

describe('UsersList integration tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <UsersList />
        </Provider>
    )

    it('should render users', () => {
        const wrapper = createWrapper();

        const users = wrapper.find(User);
        
        expect(users.length).toBe(2);
        expect(users.at(0).key()).toBe('1');
        expect(users.at(1).key()).toBe('2');
        expect(users.at(0).prop('user')).toBe(data[0]);
        expect(users.at(1).prop('user')).toBe(data[1]);
    })
})