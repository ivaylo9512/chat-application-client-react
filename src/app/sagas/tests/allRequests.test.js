import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { BASE_URL } from 'appConstants';
import requestsReducer, { getAllRequestsData, onGetRequestsComplete, onGetRequestsError } from 'app/slices/allRequestsSlice';
import { getRequests } from 'app/sagas/allRequests';

describe('all requests saga tests', () => {
    it('should set state on chats request with split array chats on take count in state', () => {
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
                currentChat: null,
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
                    }}), 
                    new Response(JSON.stringify(pageable), { status: 200 })
                ],
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
                    currentChat: null
                },
                error: null,
                isLoading: false,
                query
            })
            .run();
    })

    it('should set error on chats request error', () => {
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
                    }), 
                    new Response(error, { status: 422 })
                ],
                [select(getAllRequestsData), { data: { lastData: null } }]])
            .put(onGetRequestsError(error))
            .hasFinalState({
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
                error,
            })
            .run()
    })

})