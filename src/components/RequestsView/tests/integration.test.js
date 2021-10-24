import RequestsView from 'components/RequestsView/RequestsView';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Li } from 'components/Pagination/PaginationStyle';
import Request from "components/Request/Request";
import allRequestsWatcher from 'app/sagas/allRequests';
import allRequests from 'app/slices/allRequestsSlice';
import requests from 'app/slices/requestsSlice';
import { createTestStore } from 'app/store';

const store = createTestStore({ 
    reducers: { allRequests, requests }, 
    watchers: [ allRequestsWatcher ],
    preloadedState: {
        allRequests: {
            dataInfo: {
                pages: 0,
                maxPages: 0,
                data: [],
                lastData: null,
                currentData: null,
                currentPage: 1
            },
            query: {
                take: 2,
                direction: 'ASC',
            },
            isLoading: false,
            error: null,
        }
    }
});

global.fetch = jest.fn();

let createPairs = (length = 1) => Array.from({ length }).map((_, i) => {
    const firstId = i * 2 + 1;
    const secondId = i * 2 + 2;  
    return [{ 
        id: firstId, 
        createdAt: '2021-08-23', 
        sender: { 
            firstName: `firstname${firstId}`, 
            lastName: `lastName${firstId}`, 
            profileImage: `image${firstId}.png` 
        }
    }, { 
        id: secondId, 
        createdAt: '2021-08-23', 
        sender: { 
            firstName: `firstname${secondId}`, 
            lastName: `lastName${secondId}`, 
            profileImage: `image${secondId}.png` 
        }
    }]
})

describe('RequestsView integration tests', () => {
    let wrapper;
    const createWrapper = async() => await act(async() => wrapper = mount(
        <Provider store={store}>
            <RequestsView />
        </Provider>
    ))

    beforeEach(() => {
        store.dispatch(({ type: 'reset' }));
    })

    it('should update requests on mount', async() => {
        const data = createPairs()[0];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data}), { status: 200 }));
        
        await createWrapper();  
        wrapper.update();

        const requests =  wrapper.find(Request)
        const li = wrapper.find(Li);
       
        expect(li.length).toBe(5);
        expect(requests.length).toBe(2);

        expect(requests.at(0).prop('request')).toStrictEqual(data[0]);
        expect(requests.at(1).prop('request')).toStrictEqual(data[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
   })

    it('should update requests on pagination page click', async() => {
        const initialData = createPairs()[0];
        const data = createPairs(4);

        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 10, data: initialData }), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 14, data: data.flat() }), { status: 200 }));
        
        await createWrapper();  
        wrapper.update();

        await act(async() => wrapper.findByTestid(5).at(0).props().onClick());
        wrapper.update();

        const requests = wrapper.find(Request)
        const li = wrapper.find(Li);

        expect(li.length).toBe(4);
        expect(requests.length).toBe(2);

        expect(requests.at(0).prop('request')).toStrictEqual(data[3][0]);
        expect(requests.at(1).prop('request')).toStrictEqual(data[3][1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('5');
        expect(li.at(1).prop('data-testid')).toBe('6');
    })

    it('should update requests when back button is clicked', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 10, data: createPairs()[0] }), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 14, data: createPairs(4).flat() }), { status: 200 }));
        
        await createWrapper();
        wrapper.update();
      
        await act(async() => wrapper.findByTestid(5).at(0).props().onClick());
        wrapper.update();
       
        await act(async() => wrapper.findByTestid('back').props().onClick());
        wrapper.update();

        const requests = wrapper.find(Request)
        const li = wrapper.find(Li);
        const requestsData = store.getState().allRequests.dataInfo.data[3];

        expect(li.length).toBe(5);
        expect(requests.length).toBe(2);

        expect(requests.at(0).prop('request')).toStrictEqual(requestsData[0]);
        expect(requests.at(1).prop('request')).toStrictEqual(requestsData[1]);
    
        expect(li.at(3).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update requests when next button is clicked', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 4, data: createPairs()[0] }), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ count: 2, data: createPairs().flat() }), {status: 200}));

        await createWrapper();
        wrapper.update();

        await act(async() => wrapper.findByTestid('next').props().onClick());
        wrapper.update();

        const requests = wrapper.find(Request)
        const li = wrapper.find(Li);
        const requestsData = store.getState().allRequests.dataInfo.data[1];

        expect(li.length).toBe(2);
        expect(requests.length).toBe(2);


        expect(requests.at(0).prop('request')).toStrictEqual(requestsData[0]);
        expect(requests.at(1).prop('request')).toStrictEqual(requestsData[1]);
    
        expect(li.at(1).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should render error', async() => {
        fetch.mockImplementationOnce(() => new Response('Unavailable', { status: 410 }));

        await createWrapper();
        wrapper.update();
        
        expect(wrapper.findByTestid('error').text()).toBe('Unavailable');
    })

    it('should reset state on unmount', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: createPairs()[0]}), { status: 200 }));
        
        await createWrapper();  
        wrapper.update();

        const requests =  wrapper.find(Request)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(requests.length).toBe(2);

        await act(async() => wrapper.unmount());

        const {pages, maxPages, data, lastData, currentData} = store.getState().allRequests.dataInfo;
        expect(pages).toBe(0);
        expect(maxPages).toBe(0);
        expect(data).toStrictEqual([]);
        expect(currentData).toBe(null);
        expect(lastData).toBe(null);
    })
})