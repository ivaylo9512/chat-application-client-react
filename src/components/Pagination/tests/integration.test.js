import userChatsWatcher from 'app/sagas/userChats';
import userChats, { userChatsRequest, getUserChatsState, setCurrentUserChats } from 'app/slices/userChatsSlice';
import { mount } from 'enzyme';
import Pagination from '../Pagination';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { BASE_URL } from 'appConstants';
import { createTestStore } from 'app/store';


let id = 0;
const getChatPairs = (length = 1) => Array.from({length}).map(_ => [{
    id: ++id, 
    secondUser: { 
        firstName: `${id}firstName`, 
        lastName: `${id}lastName`
    }
}, {
    id: ++id, 
    secondUser: { 
        firstName: `${id}firstName`, 
        lastName: `${id}lastName`
    }
}])

const initialData = getChatPairs();
const store = createTestStore({ 
    reducers: { userChats }, 
    watchers: [ userChatsWatcher ],
    preloadedState: {
        userChats: {
            dataInfo: { 
                pages: 1,
                maxPages: 5,
                data: [initialData],
                lastData: initialData[1],
                currentData: initialData,
                currentPage: 1
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

global.fetch = jest.fn();

const createWrapper = () => mount(
    <Provider store={store}>
        <Pagination selector={getUserChatsState} setData={setCurrentUserChats} getData={userChatsRequest} pagesPerSlide={5}/>
    </Provider>
)

describe('Pagination integration tests', () => {
    beforeEach(() => {
        fetch.mockClear();
        id = 2;
        store.dispatch({ type: 'reset' });
    })

    it('should should get page 2', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 8, data: getChatPairs()[0] }), { status: 200 }));
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(2).at(0).simulate('click'));
        const state = store.getState().userChats;
        wrapper.update();

        expect(state.dataInfo.currentData).toBe(state.dataInfo.data[1]);
        expect(state.dataInfo.maxPages).toBe(5);
        expect(state.dataInfo.pages).toBe(2);
        expect(state.dataInfo.lastData).toBe(state.dataInfo.data[1][1])
    })

    it('should call dispatch with setData when page is already fetched', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 8, data: getChatPairs(3).flat() }), { status: 200 }));
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(4).at(0).simulate('click'));

        await act(async() => wrapper.findByTestid(2).at(0).simulate('click'));
        const state = store.getState().userChats;

        expect(state.dataInfo.currentData).toBe(state.dataInfo.data[1]);
        expect(state.dataInfo.maxPages).toBe(5);
        expect(state.dataInfo.pages).toBe(4);
    })

    it('should should get pages from 2 to 5 and add 2 more to max pages', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 12, data: getChatPairs()[0] }), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 10, data: getChatPairs(3).flat() }), { status: 200 }));

        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(2).at(0).simulate('click'));
        wrapper.update();

        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();

        const state = store.getState().userChats;

        expect(state.dataInfo.currentData).toBe(state.dataInfo.data[4]);
        expect(state.dataInfo.maxPages).toBe(7);
        expect(state.dataInfo.pages).toBe(5);
        expect(wrapper.findByTestid(6).at(0).length).toBe(1);
        expect(wrapper.findByTestid(7).at(0).length).toBe(1);
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 14, data: getChatPairs(4).flat() }), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 6, data: getChatPairs()[0] }), { status: 200 }));
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();
        await act(async() => wrapper.findByTestid(6).at(0).simulate('click'));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/chats/auth/findChatsByName/2/10firstName 10lastName/10`, {
            headers: {
                Authorization: null
            },

        });
    })
})