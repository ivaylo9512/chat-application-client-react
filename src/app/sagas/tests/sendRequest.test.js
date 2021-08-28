import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { sendRequest } from 'app/sagas/sendRequest';
import { BASE_URL } from 'appConstants';
import requestReducer, { onRequestComplete, onRequestError } from 'app/slices/requestsSlice';
import { addChat } from 'app/slices/chatsSlice';

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
})