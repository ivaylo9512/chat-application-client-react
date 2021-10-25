import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { BASE_URL } from 'appConstants';
import requestsReducer, { getAllRequestsData, onGetRequestsComplete, onGetRequestsError } from 'app/slices/allRequestsSlice';
import { getRequests } from 'app/sagas/allRequests';
import { onLogout } from 'app/slices/authenticateSlice';
import { wrapper } from 'app/sagas/index.js';

describe('all requests saga tests', () => {
    it('should set state on chats request with split array on take count in state', () => {
        const lastData = {
            id: 3, 
            createdAt: '2021-09-07'
        }

        const currentData = [ { id: 1, createdAt: '2021-09-09' }, { id: 2, createdAt: '2021-09-08' }, lastData ];

        const state = {
            dataInfo: {
                pages: 1,
                maxPages: 2,
                data: [ currentData ],
                lastData,
                currentData,
                currentPage: 1
            },
            query: {
                take: 3,
                direction: 'ASC',
            },
            isLoading: true,
            error: null
        }

        const query = {
            take: 3,
            direction: 'ASC',
            pages: 2
        }

        const pageable = {
            data: [{ id: 4, createdAt: '2021-09-06' }, { id: 5, createdAt: '2021-09-05' }, { id: 6, createdAt: '2021-09-04' }, 
                { id: 7, createdAt: '2021-09-06' }, { id: 8, createdAt: '2021-09-05' }, { id: 9, createdAt: '2021-09-04' }],
            count: 12
        }

        const completePayload = {
            pageable: {
                data: [[ pageable.data[0], pageable.data[1], pageable.data[2] ], 
                    [ pageable.data[3], pageable.data[4], pageable.data[5] ]],
                lastRequest: pageable.data[5],
                pages: 4,
                count: 12
            },
            query
        }
        return expectSaga(getRequests, { payload: query })
            .withReducer(requestsReducer)
            .withState(state)
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/findAll/${query.take * query.pages}/${lastData.createdAt}/${lastData.id}`, {
                    headers:{
                        Authorization: null
                }}), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getAllRequestsData), state.dataInfo]
            ])
            .put(onGetRequestsComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 3,
                    maxPages: 5,
                    currentPage: 3,
                    data: [...state.dataInfo.data, ...completePayload.pageable.data],
                    currentData: completePayload.pageable.data[1],
                    lastData: completePayload.pageable.data[1][2],
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should set error on request error', () => {
        const error = '0 is not a valid take value';

        const query = {
            take: 0,
            direction: 'ASC',
            pages: 1
        }

        return expectSaga(getRequests, { payload: query })
            .withReducer(requestsReducer)
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/findAll/0`, {
                    headers:{
                        Authorization: null
                    }
                }), new Response(error, { status: 422 })],
                [select(getAllRequestsData), { data: { lastData: null } }]])
            .put(onGetRequestsError(error))
            .hasFinalState({
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
                    direction: 'ASC',
                },
                isLoading: false,
                error,
            })
            .run()
    })

    it('should set state on chats request with initial state', () => {
        const query = {
            take: 3,
            direction: 'ASC',
            pages: 2
        }

        const pageable = {
            data: [{ id: 4, createdAt: '2021-09-06' }, { id: 5, createdAt: '2021-09-05' }, { id: 6, createdAt: '2021-09-04' }, 
                { id: 7, createdAt: '2021-09-06' }, { id: 8, createdAt: '2021-09-05' }, { id: 9, createdAt: '2021-09-04' }],
            count: 12
        }

        const completePayload = {
            pageable: {
                data: [[ pageable.data[0], pageable.data[1], pageable.data[2] ], 
                    [ pageable.data[3], pageable.data[4], pageable.data[5] ]],
                lastRequest: pageable.data[5],
                pages: 4,
                count: 12
            },
            query
        }
        return expectSaga(getRequests, { payload: query })
            .withReducer(requestsReducer)
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/findAll/${query.take * query.pages}`, {
                    headers:{
                        Authorization: null
                }}), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getAllRequestsData), { lastData: null }]
            ])
            .put(onGetRequestsComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 2,
                    maxPages: 4,
                    currentPage: 2,
                    data: completePayload.pageable.data,
                    currentData: completePayload.pageable.data[1],
                    lastData: completePayload.pageable.data[1][2]
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should set state on chats request when response data is an empty array', () => {
        const lastData = {
            id: 3, 
            createdAt: '2021-09-07'
        }

        const currentData = [ { id: 1, createdAt: '2021-09-09' }, { id: 2, createdAt: '2021-09-08' }, lastData ];

        const state = {
            dataInfo: {
                pages: 1,
                maxPages: 2,
                data: [ currentData ],
                lastData,
                currentData,
                currentPage: 1
            },
            query: {
                take: 3,
                direction: 'ASC',
            },
            isLoading: true,
            error: null
        }

        const query = {
            take: 3,
            direction: 'ASC',
            pages: 2
        }

        const pageable = {
            data: [],
            count: 0
        }

        const completePayload = {
            pageable: {
                data: [],
                lastRequest: lastData,
                pages: 0,
                count: 0
            },
            query
        }
        return expectSaga(getRequests, { payload: query })
            .withReducer(requestsReducer)
            .withState(state)
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/findAll/${query.take * query.pages}/${lastData.createdAt}/${lastData.id}`, {
                    headers:{
                        Authorization: null
                }}), new Response(JSON.stringify(pageable), { status: 200 })],
                [select(getAllRequestsData), state.dataInfo]
            ])
            .put(onGetRequestsComplete(completePayload))
            .hasFinalState({
                dataInfo: {
                    pages: 1,
                    maxPages: 1,
                    currentPage: 1,
                    data: [ currentData ],
                    currentData,
                    lastData,
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should call onLogout on get requests error with 401', () => {
        const query = {
            take: 2,
            direction: 'ASC',
            pages: 1
        }

        return expectSaga(wrapper(getRequests), { payload: query })
            .withReducer(requestsReducer)
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/findAll/2`, {
                    headers:{
                        Authorization: null
                    }
                }), new Response('Jwt token has expired.', { status: 401 })],
                [select(getAllRequestsData), { data: { lastData: null } }]])
            .put(onLogout('Session has expired.'))
            .run()
    })
})