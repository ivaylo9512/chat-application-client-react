import users from 'app/slices/usersSlice';
import usersWatcher from 'app/sagas/users';
import requestsWatcher from 'app/sagas/sendRequest';
import styles from 'app/slices/stylesSlice';
import requests from 'app/slices/requestsSlice';
import UsersView from 'components/UsersView/UsersView';
import { Provider } from 'react-redux';
import User from 'components/User/User';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Li } from 'components/Pagination/PaginationStyle';
import { createTestStore } from 'app/store';

const store = createTestStore({ 
    reducers: { users, styles, requests }, 
    watchers: [ usersWatcher, requestsWatcher ],
    preloadedState: {
        users: {
            dataInfo: {
                pages: 0,
                maxPages: 0,
                data: [],
                lastData: null,
                currentData: null,
                currentPage: 0
            },
            query: {
                take: 2,
            },
        },
        requests: {
            data: {
                0: { isLoading: false },
                1: { isLoading: false }
            }
        }
    }
});

global.fetch = jest.fn();

let createPairs = (length = 1) => Array.from({ length }).map((_, i) => {
    const firstId = i * 2 + 1;
    const secondId = i * 2 + 2;

    return [{ 
        id: firstId, 
        firstName: `${firstId}name`, 
        lastName: `${firstId}name`,
        requestState: 'send'
    }, { 
        id: secondId, 
        firstName: `${secondId}name`, 
        lastName: `${secondId}name`,
        requestState: 'pending'
    }]
})

describe('UsersView integration tests', () => {
    let wrapper;
    let data;
    let formSearch
    
    const createWrapper = async(pages) => {
        formSearch = createPairs()[0];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 10, data: formSearch }), { status: 200 }));

        if(pages){
            data = createPairs(pages);
            fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 14, data: data.flat() }), { status: 200 }));   
        }
        
        wrapper = mount(
            <Provider store={store}>
                <UsersView />
            </Provider>
        )

        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();
        
        if(pages){
            await act(async() => wrapper.findByTestid(pages + 1).at(0).props().onClick());
            wrapper.update();
        }
    }

    beforeEach(() => {
        store.dispatch({ type: 'reset' })
    })

    it('should update users on search submit', async() => {
        await createWrapper();

        const users =  wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(users.length).toBe(2);

        expect(users.at(0).prop('user')).toStrictEqual(formSearch[0]);
        expect(users.at(1).prop('user')).toStrictEqual(formSearch[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update users on pagination page click', async() => {
        await createWrapper(4);

        const users = wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(4);
        expect(users.length).toBe(2);

        expect(users.at(0).prop('user')).toStrictEqual(data[3][0]);
        expect(users.at(1).prop('user')).toStrictEqual(data[3][1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('5');
        expect(li.at(1).prop('data-testid')).toBe('6');
    })

    it('should update currentUsers when back button is clicked', async() => {
        await createWrapper(4);
       
        await act(async() => wrapper.findByTestid('back').props().onClick());
        wrapper.update();

        const users = wrapper.find(User)
        const li = wrapper.find(Li);
        const storeData = store.getState().users.dataInfo.data[3];

        expect(li.length).toBe(5);
        expect(users.length).toBe(2);


        expect(users.at(0).prop('user')).toStrictEqual(storeData[0]);
        expect(users.at(1).prop('user')).toStrictEqual(storeData[1]);
    
        expect(li.at(3).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update currentUsers when next button is clicked', async() => {
        await createWrapper(4);
       
        await act(async() => wrapper.findByTestid('back').props().onClick());
        wrapper.update();

        await act(async() => wrapper.findByTestid('next').props().onClick());
        wrapper.update();
        
        const users = wrapper.find(User)
        const li = wrapper.find(Li);
        const data = store.getState().users.dataInfo.data[4];

        expect(li.length).toBe(4);
        expect(users.length).toBe(2);


        expect(users.at(0).prop('user')).toStrictEqual(data[0]);
        expect(users.at(1).prop('user')).toStrictEqual(data[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('5');
        expect(li.at(1).prop('data-testid')).toBe('6');
    })

    it('should reset state when new search is submit', async() => {
        await createWrapper(4);
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 0, data: [] }), { status: 200 }));
      
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();

        const users = wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(0);
        expect(users.length).toBe(0);
    })

    it('should render error', async() => {
        await createWrapper();

        fetch.mockImplementationOnce(() => new Response('Unavailable', { status: 410 }));
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();
        
        expect(wrapper.findByTestid('error').text()).toBe('Unavailable');
    })

    it('should reset state on unmount', async() => {
        await createWrapper();

        const users =  wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(users.length).toBe(2);

        await act(async() => wrapper.unmount());

        const {pages, maxPages, data, lastData, currentData} = store.getState().users.dataInfo;
        expect(pages).toBe(0);
        expect(maxPages).toBe(0);
        expect(data).toStrictEqual([]);
        expect(currentData).toBe(null);
        expect(lastData).toBe(null);
    })

    it('should reset requests on currentData change', async () => {
        await createWrapper();

        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ requestState: 'pending', requestId: 3 }), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 10, data: formSearch }), { status: 200 }));
        
        const users =  wrapper.find(User)
        await act(async() => users.at(0).findByTestid('action').at(0).props().onClick());

        let requests = store.getState().requests.data;
        expect(requests[formSearch[0].id]).toStrictEqual({ isLoading: false, state: 'pending', chatWithUser: undefined, id: 3, error: null });

        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));

        requests = store.getState().requests.data;
        expect(requests[formSearch[0].id]).toBe(undefined)
    })
})