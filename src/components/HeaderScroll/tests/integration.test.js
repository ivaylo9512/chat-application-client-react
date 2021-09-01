import HeaderScroll from 'components/HeaderScroll/HeaderScroll';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import chatsWatcher from 'app/sagas/chats';
import chats from 'app/slices/chatsSlice';
import styles from 'app/slices/stylesSlice';
import { Container } from 'components/HeaderScroll/HeaderScrollStyle';
import { BASE_URL } from 'appConstants';
import { act } from 'react-dom/test-utils';
import Chat from 'components/Chat/Chat';
import { createTestStore } from 'app/store';

const store = createTestStore({ 
    reducers: { chats, styles }, 
    watchers: [ chatsWatcher ],
    preloadedState: {
        chats:{
            data: {
                chats: [],
                isLastPage: false
            },
            query: {
                take: 2,
                direction: 'ASC',
            },
            isLoading: false
        }
    }
})

global.fetch = jest.fn();

let id = 5;
const createData = () => [{ 
    id: ++id, 
    secondUser: { 
        firstName: 
        `${id}firstName`, 
        lastName: `${id}lastName` 
    }
}, { 
    id: ++id, 
    secondUser: { 
        firstName: `${id}firstName`, 
        lastName: `${id}lastName` 
    }
}];

describe('HeaderScroll integration tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <HeaderScroll />
        </Provider>
    )

    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 4,  data: createData()}), { status: 200 }));
        const wrapper = createWrapper();

        await act(async() => wrapper.find(Container).props()
            .onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10}));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/chats/auth/findChats/2`, {
            headers: {
                Authorization: null
            }
        })

        await act(async() => wrapper.unmount());
    })

    it('should update store on getChats', async() => {
        const data = createData();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 4,  data}), { status: 200 }));
        const wrapper = createWrapper();

        await act(async() => wrapper.find(Container).props()
            .onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10}));
        wrapper.update();

        expect(wrapper.find(Chat).length).toBe(2);
        expect(store.getState().chats.data.chats).toStrictEqual(data);
    })

})