import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import userChats from 'app/slices/userChatsSlice';
import userChatsWatcher from 'app/sagas/userChats';
import styles from 'app/slices/stylesSlice';
import RequestsView from 'components/RequestsView/RequestsView';
import { Provider } from 'react-redux';
import UserChat from 'components/UserChat/UserChat';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Li } from 'components/Pagination/PaginationStyle';
import Request from "components/Request/Request";
import allRequestsWatcher from 'app/sagas/allRequests';
import allRequests from 'app/slices/allRequestsSlice';
import requests from 'app/slices/requestsSlice';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const store = configureStore({
    reducer: {
        allRequests,
        requests,
    },
    middleware,
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
})

saga.run(function*(){
    yield allRequestsWatcher
})

global.fetch = jest.fn();

let id = 0;
let createPair = () => [{ id: id++, createdAt: '2021-08-23', sender: { firstName: `firstname${id}`, lastName: `lastName${id}`, profileImage: `image${id}.png` }}, 
    { id: id++, createdAt: '2021-08-23', sender: { firstName: `firstname${id}`, lastName: `lastName${id}`, profileImage: `image${id}.png` }}]
const initialData = createPair();

describe('RequestsView integration tests', () => {
    let wrapper;
    const createWrapper = async() => await act(async() => wrapper = mount(
        <Provider store={store}>
            <RequestsView />
        </Provider>
    ))

    it('should update requests on mount', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: initialData}), { status: 200 }));
        
        await createWrapper();  
        wrapper.update();

        const requests =  wrapper.find(Request)
        const li = wrapper.find(Li);
       
        expect(li.length).toBe(5);
        expect(requests.length).toBe(2);

        expect(requests.at(0).prop('request')).toStrictEqual(initialData[0]);
        expect(requests.at(1).prop('request')).toStrictEqual(initialData[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
        
        wrapper.unmount();
    })

    it('should update requests on pagination page click', async() => {
        const data = [createPair(), createPair(), createPair(), createPair()];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: initialData}), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 14, data: data.flat()}), {status: 200}));
        
        await createWrapper();  
        wrapper.update();

        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
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
    
        wrapper.unmount();
    })

    it('should update requests when back button is clicked', async() => {
        const data = [createPair(), createPair(), createPair(), createPair()];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: initialData}), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 14, data: data.flat()}), {status: 200}));
        
        await createWrapper();
        wrapper.update();
      
        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();
       
        await act(async() => wrapper.findByTestid('back').simulate('click'));
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
    
        wrapper.unmount();
    })

    it('should update requests when next button is clicked', async() => {
        const data = createPair();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 4, data: initialData}), { status: 200 }));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 2, data}), {status: 200}));

        await createWrapper();
        wrapper.update();

        await act(async() => wrapper.findByTestid('next').simulate('click'));
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

    it('should reset state on unmount', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: initialData}), { status: 200 }));
        
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