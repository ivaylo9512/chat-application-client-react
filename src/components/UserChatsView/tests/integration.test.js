import userChats from 'app/slices/userChatsSlice';
import userChatsWatcher from 'app/sagas/userChats';
import styles from 'app/slices/stylesSlice';
import UserChatsView from 'components/UserChatsView/UserChatsView';
import { Provider } from 'react-redux';
import UserChat from 'components/UserChat/UserChat';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Li } from 'components/Pagination/PaginationStyle';
import { createTestStore } from 'app/store';

const store = createTestStore({ 
    reducers: { userChats, styles }, 
    watchers: [ userChatsWatcher ],
    preloadedState: {
        userChats: {
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
        }
    }
});

global.fetch = jest.fn();

let createPairs = (length = 1) => Array.from({ length }).map((_, i) => {
    const firstId = i * 2 + 1;
    const secondId = i * 2 + 2;
    
    return [{ 
        id: firstId, 
        secondUser: {
            firstName: `${firstId}name`, 
            lastName: `${firstId}name`,
        }
    }, { 
        id: secondId, 
        secondUser: {
            firstName: `${secondId}name`, 
            lastName: `${secondId}name`,
        }
    }]
});

describe('UserChatsView integration tests', () => {
    let formChats;
    let wrapper;
    let chats;
    
    const createWrapper = async(pages) => {
        formChats = createPairs()[0];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 10, data: formChats }), { status: 200 }));

        if(pages){
            chats = createPairs(pages);
            fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 14, data: chats.flat() }), { status: 200 }));   
        }
        
        wrapper = mount(
            <Provider store={store}>
                <UserChatsView />
            </Provider>
        )

        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn() }));
        wrapper.update();
        
        if(pages){
            await act(async() => wrapper.findByTestid(pages + 1).at(0).simulate('click'));
            wrapper.update();
        }
    }

    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })

    it('should update chats on search submit', async() => {
        await createWrapper();

        const userChats =  wrapper.find(UserChat)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);

        expect(userChats.at(0).prop('userChat')).toStrictEqual(formChats[0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(formChats[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update chats on pagination page click', async() => {
        await createWrapper(4);

        const userChats = wrapper.find(UserChat)
        const li = wrapper.find(Li);

        expect(li.length).toBe(4);
        expect(userChats.length).toBe(2);

        expect(userChats.at(0).prop('userChat')).toStrictEqual(chats[3][0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(chats[3][1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('5');
        expect(li.at(1).prop('data-testid')).toBe('6');
    })

    it('should update currentChats when back button is clicked', async() => {
        await createWrapper(4);

        await act(async() => wrapper.findByTestid('back').simulate('click'));
        wrapper.update();

        const userChats = wrapper.find(UserChat)
        const li = wrapper.find(Li);
        const chats = store.getState().userChats.dataInfo.data[3];

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);

        expect(userChats.at(0).prop('userChat')).toStrictEqual(chats[0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(chats[1]);
    
        expect(li.at(3).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update currentChats when next button is clicked', async() => {
        await createWrapper(4);
      
        wrapper.findByTestid('back').simulate('click');
        wrapper.update();

        await act(async() => wrapper.findByTestid('next').simulate('click'));
        wrapper.update();

        const userChats = wrapper.find(UserChat)
        const li = wrapper.find(Li);
        const chats = store.getState().userChats.dataInfo.data[4];

        expect(li.length).toBe(4);
        expect(userChats.length).toBe(2);

        expect(userChats.at(0).prop('userChat')).toStrictEqual(chats[0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(chats[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('5');
        expect(li.at(1).prop('data-testid')).toBe('6');
    })

    it('should reset state when new search is submit', async() => {
        await createWrapper();

        let userChats = wrapper.find(UserChat)
        let li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);

        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 0, data: [] }), { status: 200 }));
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn() }));
        wrapper.update();

        userChats = wrapper.find(UserChat)
        li = wrapper.find(Li);

        expect(li.length).toBe(0);
        expect(userChats.length).toBe(0);

    })

    it('should reset state on unmount', async() => {
        await createWrapper();

        const userChats =  wrapper.find(UserChat)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);

        await act(async() => wrapper.unmount());

        const {pages, maxPages, data, lastData, currentData} = store.getState().userChats.dataInfo;
        expect(pages).toBe(0);
        expect(maxPages).toBe(0);
        expect(data).toStrictEqual([]);
        expect(currentData).toBe(null);
        expect(lastData).toBe(null);
    })
})