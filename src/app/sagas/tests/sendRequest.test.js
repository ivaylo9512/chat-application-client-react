import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { sendRequest } from 'app/sagas/sendRequest';
import { BASE_URL } from 'appConstants';
import requestReducer, { onRequestComplete, onRequestError } from 'app/slices/requestsSlice';
import chatReducer, { addChat } from 'app/slices/chatsSlice';
import { wrapper } from 'app/sagas/index.js';
import { onLogout } from 'app/slices/authenticateSlice';

describe('send request saga tests', () => {
    it('should update request on send request', () => {
        const userId = 5;
        const response = { 
            chatWithUser: { 
                id: 1 
            }, 
            requestState: 'pending', 
            requestId: 2 
        }

        return expectSaga(sendRequest, { payload: userId })
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/add/5`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(response), { status: 200 })]
            ])
            .put(addChat(response.chatWithUser))
            .put(onRequestComplete({
                id: response.requestId,
                chatWithUser: response.chatWithUser,
                requestState: 'pending',
                userId
            }))
            .hasFinalState({
                data: {
                    5: {
                        id: response.requestId,
                        isLoading: false,
                        chatWithUser: response.chatWithUser,
                        state: response.requestState
                    }
                }
            })
            .run()
    })

    it('should set error on send request error', () => {
        const userId = 5;
        const message = 'User not found.';
        return expectSaga(sendRequest, { payload: userId })
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/add/5`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response(message, { status: 404 } )]
            ])
            .put(onRequestError({ userId, message, requestState: 'send' }))
            .hasFinalState({
                data: {
                    5: {
                        isLoading: false,
                        error: message,
                        state: 'send',
                        id: undefined,
                    }
                }
            })
            .run()
    })

    it('should update request on send request without chatWithUser', () => {
        const userId = 5;
        const response = { 
            requestState: 'pending', 
            requestId: 2 
        }

        return expectSaga(sendRequest, { payload: userId })
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/add/5`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(response), { status: 200 })]
            ])
            .put(onRequestComplete({
                id: response.requestId,
                requestState: 'pending',
                userId,
                chatWithUser: undefined
            }))
            .hasFinalState({
                data: {
                    5: {
                        id: response.requestId,
                        isLoading: false,
                        chatWithUser: undefined,
                        state: response.requestState
                    }
                }
            })
            .run()
    })

    it('should add chat', () => {
        const userId = 5;
        const response = { 
            chatWithUser: { 
                id: 2 
            }, 
            requestState: 'pending', 
            requestId: 2 
        }

        return expectSaga(sendRequest, { payload: userId })
            .withReducer(chatReducer)
            .withState({
                data: {
                    chats: [{ id: 1 }]
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/add/5`, {
                    method: 'POST',
                    headers:{
                        Authorization: null
                    }
                }), new Response(JSON.stringify(response), { status: 200 })]
            ])
            .put(addChat(response.chatWithUser))
            .hasFinalState({
                data: {
                    chats: [response.chatWithUser, { id: 1 }]
                }
            })
            .run()
    })
    
    it('should call onLogout error with 401', () => {
        return expectSaga(wrapper(sendRequest), { payload: 5 })
            .withReducer(requestReducer)
            .withState({
                data: {
                    5: {
                        isLoading: true
                    }
                }
            })
            .provide([
                [call(fetch, `${BASE_URL}/api/requests/auth/add/5`, {
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