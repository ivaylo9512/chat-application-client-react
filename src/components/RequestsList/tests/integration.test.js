import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import allRequestsWatcher from 'app/sagas/allRequests';
import allRequests from 'app/slices/allRequestsSlice';
import requests from 'app/slices/requestsSlice';
import RequestsList from 'components/RequestsList/RequestsList';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BASE_URL } from 'appConstants';
import Request from "components/Request/Request";

const saga = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), saga];

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

const data = [{ id: 5, createdAt: '2021-08-23', sender: { firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}, 
    { id: 6, createdAt: '2021-08-23', sender: { firstName: 'firstname2', lastName: 'lastName2', profileImage: 'image2.png' }}]

describe('RequestsList integration tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <RequestsList />
        </Provider>
    )

    it('should call fetch with qu', () => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data}), { status: 200 }));

        createWrapper();

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/requests/auth/findAll/2/`, {
            headers: {
                Authorization: null
        }})
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data}), { status: 200 }));

        const wrapper = createWrapper();
        const state = store.getState().allRequests.dataInfo;

        expect(wrapper.find(Request).length).toBe(2);
        expect(state.pages).toBe(1);
        expect(state.maxPages).toBe(5);
        expect(state.lastData).toStrictEqual(data[1]);
        expect(state.currentData).toStrictEqual(data);
        expect(state.data).toStrictEqual([data]);
    })

    it('should resetState on unmount', () => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data}), { status: 200 }));

        const wrapper = createWrapper();
        wrapper.unmount();

        const state = store.getState().allRequests.dataInfo;
      
        expect(wrapper.find(Request).length).toBe(0);
        expect(state.pages).toBe(0);
        expect(state.maxPages).toBe(0);
        expect(state.lastData).toBe(null);
        expect(state.currentData).toStrictEqual(null);
        expect(state.data).toStrictEqual([]);
    })
})