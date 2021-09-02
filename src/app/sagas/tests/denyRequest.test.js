import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { denyRequest } from 'app/sagas/denyRequest';
import { BASE_URL } from 'appConstants';
import requestReducer, { onRequestComplete, onRequestError } from 'app/slices/requestsSlice';
import { onLogout } from 'app/slices/authenticateSlice';
import { wrapper } from 'app/sagas/index.js';

describe('deny request saga tests', () => {
    it('should update request on deny request', () => {
        const userId = 5;
        const id = 2;
        const requestState = 'send'; 

        return expectSaga(denyRequest, { payload: { userId, id} })
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/deny/2`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response('done', { status: 200 })]
            ])
            .put(onRequestComplete({
                id,
                chatWithUser: null,
                requestState,
                userId
            }))
            .hasFinalState({
                data: {
                    5: {
                        id,
                        isLoading: false,
                        chatWithUser: null,
                        state: requestState
                    }
                }
            })
            .run()
    })

    it('should set error on deny request error', () => {
        const userId = 5;
        const id = 2;
        const message = 'Request not found.';

        return expectSaga(denyRequest, { payload: { userId, id, requestState: 'pending' }})
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/deny/2`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response(message, { status: 404 } )]
            ])
            .put(onRequestError({ 
                id, 
                userId, 
                message, 
                requestState: 'pending', 
            }))
            .hasFinalState({
                data: {
                    5: {
                        id,
                        isLoading: false,
                        error: message,
                        state: 'pending',
                    }
                }
            })
            .run()
    })

    it('should call onLogout on deny request error with 401', () => {
        const userId = 5;
        const id = 2;

        return expectSaga(wrapper(denyRequest), { payload: { userId, id} })
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/deny/2`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response('Jwt token has expired.', { status: 401 })]
            ])
            .put(onLogout('Session has expired.'))
            .run()
    })
})